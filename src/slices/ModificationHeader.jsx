import { createSlice } from "@reduxjs/toolkit";
const modificationHeaderSlice = createSlice({
  name: "lotSearch",
  initialState: {},
  reducers: {},
});
export const { getLotCurrent } = modificationHeaderSlice.actions;
export default modificationHeaderSlice.reducer;
