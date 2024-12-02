import { createSlice } from "@reduxjs/toolkit";

export const vehicle = createSlice({
  name: "vehicle",
  initialState: {
    data: null,
    updatedTime: new Date().getTime(),
  },
  reducers: {
    initVehicles: (state, action) => {
      state.data = action.payload;
    },
    setUpdatedTime: (state) => {
      state.updatedTime = new Date().getTime();
    },
  },
});

// Action creators are generated for each case reducer function
export const { initVehicles, setUpdatedTime } = vehicle.actions;

export default vehicle.reducer;
