import { configureStore } from "@reduxjs/toolkit";

import routinesReducer from "./routineSlice";

const store = configureStore({
  reducer: {
    routines: routinesReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
