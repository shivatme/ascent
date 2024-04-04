import { configureStore } from "@reduxjs/toolkit";

import routinesReducer from "./routineSlice";
import routinesExerciseReducer from "./routineExerciseSlice";

const store = configureStore({
  reducer: {
    routines: routinesReducer,
    routineExercises: routinesExerciseReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
