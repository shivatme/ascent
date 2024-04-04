import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { Routine, RoutineExercise } from "../types";
import DBRoutines from "../database/routines";
import { RootState } from "./store";

export interface RoutineExerciseState {
  routineExercise: RoutineExercise[];
  routineId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
const initialState: RoutineExerciseState = {
  routineExercise: [],
  routineId: null,
  status: "idle",
  error: null,
};

export const routineExerciseSlice = createSlice({
  name: "routineExercise",
  initialState,
  reducers: {
    addRoutineExercise(state: RoutineExerciseState, action) {
      const id = nanoid();
      const sets_data = '{"set1": 8, "set2": 8, "set3": 8}';
      const routineExercise = {
        id,
        routine_id: action.payload.routine_id,
        exercise_id: action.payload.exercise_id,
        name: action.payload.exercise_name,
        sets_data,
      };
      // console.log(routineExercise);
      state.routineExercise.push(routineExercise);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoutineExercise.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getRoutineExercise.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.routineExercise = action.payload;
      })
      .addCase(
        getRoutineExercise.rejected,
        (state: RoutineExerciseState, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
    //   .addCase(addNewRoutine.fulfilled, (state, action) => {
    //     state.routines.push(action.payload);
    //   })
    //   .addCase(deleteRoutine.fulfilled, (state, action) => {
    //     state.routines = state.routines.filter(
    //       (routine) => routine.id !== action.payload.id
    //     );
    //   });
  },
});

export const { addRoutineExercise } = routineExerciseSlice.actions;

export default routineExerciseSlice.reducer;

export const getRoutineExercise = createAsyncThunk(
  "routines/getRoutineExercise",
  async (routine_id: string) => {
    console.log("called 1");
    const result: RoutineExercise[] = await DBRoutines.getRoutineExercises(
      routine_id
    );
    return result;
  }
);

// export const addRoutineExercise = createAsyncThunk(
//   "posts/addRoutineExercise",
//   async (item: { routine_id: string; exercise_id: string }) => {
//     // console.log(item);
//     const sets_data = '{"set1": 8, "set2": 8, "set3": 8}';
//     // const result = await DBRoutines.addRoutineExercise(
//     //   item.routine_id,
//     //   item.exercise_id,
//     //   sets_data
//     // );
//     // const routines = { id: routine.id, name: routine.name, day: routine.day };
//     // const result = await DBRoutines.addRoutine(
//     //   routine.id,
//     //   routine.name,
//     //   routine.day
//     // );

//     return item.routine_id, item.exercise_id, sets_data;
//   }
// );
// async function addExercise(routine_id: string, exercise_id: string) {
//   const result = await DBRoutines.addRoutineExercise(routine_id, exercise_id);
// }

// export const deleteRoutine = createAsyncThunk(
//   "posts/deleteRoutine",
//   async (routine: Routine) => {
//     const result = await DBRoutines.deleteRoutine(routine);
//     console.log(`Routine with ID ${routine.id} removed successfully`);
//     return routine;
//   }
// );

export const selectRoutineExercise = (state: RootState) =>
  state.routineExercises.routineExercise;
// export const routineStatus = (state: RootState) => state.routines.status;
