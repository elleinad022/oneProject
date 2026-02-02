import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    updateWorkoutIndexes: (state, action) => {
      state.userInfo.workoutTrackingIndex = action.payload.workoutTrackingIndex;
      state.userInfo.workoutWeekIndex = action.payload.workoutWeekIndex;
    },
  },
});

export const { setCredentials, logout, updateWorkoutIndexes } =
  authSlice.actions;

export default authSlice.reducer;
