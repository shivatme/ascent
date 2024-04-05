import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { Routine, RoutineExercise } from "../types";
import DBRoutines from "../database/routines";
import { RootState } from "./store";

export interface RoutineExerciseState {
  routineExercise: RoutineExercise[];
  routineExerciseEdit: RoutineExercise[];
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
      const id = nanoid();
      const sets_data = `[
        {"reps": 8, "weight": 0},
        {"reps": 8, "weight": 0},
        {"reps": 8, "weight": 0}
      ]`;
      const routineExercise = {
        id,
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
        let setsArray = JSON.parse(existingExercise.sets_data);
        let newSetReps = 8;
        let newSet = { reps: newSetReps, weight: 0 };
        setsArray = [...setsArray, newSet];
        existingExercise.sets_data = JSON.stringify(setsArray);
      }
    },
    subtractExerciseSet(state: RoutineExerciseState, action) {
      const id = action.payload;
      const existingExercise = state.routineExerciseEdit.find(
        (exercise) => exercise.id === id
      );
      if (existingExercise) {
        const setsData = JSON.parse(existingExercise.sets_data);
        let setKeys = Object.keys(setsData);
        let lastSetName = setKeys[setKeys.length - 1];
        delete setsData[lastSetName];
        existingExercise.sets_data = JSON.stringify(setsData);
      }
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
        state.routineExerciseEdit = action.payload;
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

export const { addRoutineExercise, addExerciseSet, subtractExerciseSet } =
  routineExerciseSlice.actions;

export default routineExerciseSlice.reducer;

export const getRoutineExercise = createAsyncThunk(
  "routines/getRoutineExercise",
  async (routine_id: string) => {
    const result: RoutineExercise[] = await DBRoutines.getRoutineExercises(
      routine_id
    );
    return result;
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

  return item.routine_id, item.exercise_id, sets_data;
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
