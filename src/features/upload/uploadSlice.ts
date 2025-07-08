import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadState {
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
}

const initialState: UploadState = {
  progress: 0,
  status: "idle",
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    setStatus(state, action: PayloadAction<UploadState["status"]>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
});

export const { setProgress, setStatus, setError } = uploadSlice.actions;
export default uploadSlice.reducer;
