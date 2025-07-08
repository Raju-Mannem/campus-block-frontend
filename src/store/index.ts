import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import courseReducer from "@/features/courses/courseSlice";
import uploadReducer from "@/features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    upload: uploadReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
