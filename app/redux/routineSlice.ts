import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { Routine } from "../types";
import DBRoutines from "../database/routines";
import { RootState } from "./store";

export interface RoutineState {
  routines: Routine[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
const initialState: RoutineState = {
  routines: [],
  status: "idle",
  error: null,
};

export const routinesSlice = createSlice({
  name: "routines",
  initialState,
  reducers: {
    routineAdded(state: RoutineState, action) {
      state.routines.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoutines.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getRoutines.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.routines = state.routines.concat(action.payload);
      })
      .addCase(getRoutines.rejected, (state: RoutineState, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewRoutine.fulfilled, (state, action) => {
        state.routines.push(action.payload);
      })
      .addCase(deleteRoutine.fulfilled, (state, action) => {
        state.routines = state.routines.filter(
          (routine) => routine.id !== action.payload.id
        );
      });
  },
});

export const { routineAdded } = routinesSlice.actions;

export default routinesSlice.reducer;

export const getRoutines = createAsyncThunk(
  "routines/getRoutines",
  async () => {
    const result: Routine[] = await DBRoutines.getRoutines();
    return result;
  }
);

export const addNewRoutine = createAsyncThunk(
  "posts/addNewRoutine",
  async (routine: Routine) => {
    const routines = { id: routine.id, name: routine.name, day: routine.day };
    const result = await DBRoutines.addRoutine(
      routine.id,
      routine.name,
      routine.day
    );

    return routines;
  }
);

export const deleteRoutine = createAsyncThunk(
  "posts/deleteRoutine",
  async (routine: Routine) => {
    const result = await DBRoutines.deleteRoutine(routine);
    console.log(`Routine with ID ${routine.id} removed successfully`);
    return routine;
  }
);

export const selectAllRoutines = (state: RootState) => state.routines.routines;
export const routineStatus = (state: RootState) => state.routines.status;
