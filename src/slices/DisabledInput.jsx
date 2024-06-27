import { createSlice } from "@reduxjs/toolkit";
const DisabledInputSlice = createSlice({
  name: "DisabledInput",
  initialState: {
    disabled: true,
  },
  reducers: {
    setDisabled: (state, action) => {
      state.disabled = false;
    },
  },
});
export const { setDisabled } = DisabledInputSlice.actions;
export default DisabledInputSlice.reducer;
