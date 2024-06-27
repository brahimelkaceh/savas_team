import { createSlice } from "@reduxjs/toolkit";

const ShowBatimentFormsSlice = createSlice({
  name: "BatimentFormsStatus",
  initialState: {
    formStatus: false,
    inputVal: true,
  },
  reducers: {
    toggleBatimentForm: (state) => {
      state.formStatus = true;
    },
    showInput: (state, action) => {
      state.inputVal = action.payload;
    },
  },
});

export const { toggleBatimentForm, showInput } = ShowBatimentFormsSlice.actions;
export default ShowBatimentFormsSlice.reducer;
