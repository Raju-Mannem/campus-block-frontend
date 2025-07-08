import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "@/types/course";

interface CoursesState {
  list: Course[];
  loading: boolean;
}

const initialState: CoursesState = {
  list: [],
  loading: false,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses(state, action: PayloadAction<Course[]>) {
      state.list = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setCourses, setLoading } = courseSlice.actions;
export default courseSlice.reducer;
