import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { EditRoutineExercise, Routine, RoutineExercise } from "../types";
import DBRoutines from "../database/routines";
import { RootState } from "./store";

export interface RoutineExerciseState {
  routineExercise: RoutineExercise[];
  routineExerciseEdit: EditRoutineExercise[];
  routineId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
const initialState: RoutineExerciseState = {
  routineExercise: [],
  routineExerciseEdit: [],
  routineId: null,
  status: "idle",
  error: null,
};

export const routineExerciseSlice = createSlice({
  name: "routineExercise",
  initialState,
  reducers: {
    addRoutineExercise(state: RoutineExerciseState, action) {
      // const id = nanoid();
      const sets_data = [
        { reps: 8, weight: 0 },
        { reps: 8, weight: 0 },
        { reps: 8, weight: 0 },
      ];

      const routineExercise: EditRoutineExercise = {
        id: action.payload.id,
        routine_id: action.payload.routine_id,
        exercise_id: action.payload.exercise_id,
        name: action.payload.exercise_name,
        sets_data,
      };
      // console.log(routineExercise);
      state.routineExerciseEdit.push(routineExercise);
    },
    addExerciseSet(state: RoutineExerciseState, action) {
      const id = action.payload;
      const existingExercise = state.routineExerciseEdit.find(
        (exercise) => exercise.id === id
      );
      if (existingExercise) {
        let newSetReps = 8;
        let newSet = { reps: newSetReps, weight: 0 };
        existingExercise.sets_data = [...existingExercise.sets_data, newSet];
      }
    },
    subtractExerciseSet(state: RoutineExerciseState, action) {
      const id = action.payload;
      const existingExercise: EditRoutineExercise | undefined =
        state.routineExerciseEdit.find((exercise) => exercise.id === id);
      if (existingExercise) {
        existingExercise.sets_data.pop();
      }
    },
    setEditRoutineExercise(state) {
      state.routineExerciseEdit = state.routineExercise;
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
        // console.log(action.payload, "Asas");
        state.routineId = action.payload.routine_id;
        state.routineExercise = action.payload.result;
        state.routineExerciseEdit = action.payload.result;
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

export const {
  addRoutineExercise,
  addExerciseSet,
  subtractExerciseSet,
  setEditRoutineExercise,
} = routineExerciseSlice.actions;

export default routineExerciseSlice.reducer;

export const getRoutineExercise = createAsyncThunk(
  "routines/getRoutineExercise",
  async (routine_id: string) => {
    // console.log("abababa");
    const result: RoutineExercise[] = await DBRoutines.getRoutineExercises(
      routine_id
    );
    // console.log(result, "Asas");
    return { result, routine_id };
  }
);

export const saveRoutine = createAsyncThunk("posts/saveRoutine", async () => {
  // console.log(item);
  // const result = await DBRoutines.addRoutineExercise(
  //   item.routine_id,
  //   item.exercise_id,
  //   sets_data
  // );
  // const routines = { id: routine.id, name: routine.name, day: routine.day };
  // const result = await DBRoutines.addRoutine(
  //   routine.id,
  //   routine.name,
  //   routine.day
  // );
  // return item.routine_id, item.exercise_id, sets_data;
});
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

export const selectRoutineExerciseEdit = (state: RootState) =>
  state.routineExercises.routineExerciseEdit;
// export const routineStatus = (state: RootState) => state.routines.status;
