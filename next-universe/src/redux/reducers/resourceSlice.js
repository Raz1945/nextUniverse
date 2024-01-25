import { createSlice } from "@reduxjs/toolkit";

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    metalProduction: 0,
    crystalProduction: 0,
    deuteriumProduction: 0,
    // ... 
  },
  reducers: {
    setResourceValues: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setResourceValues } = resourceSlice.actions;
export default resourceSlice.reducer;
