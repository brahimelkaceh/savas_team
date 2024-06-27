import { createSlice } from "@reduxjs/toolkit";

const ShowFieldsSlice = createSlice({
  name: "fieldStatus",
  initialState: {
    status: true,
    inputV: false,
    lotId: 0,
  },
  reducers: {
    toggleFieldStatus: (state, action) => {
      state.status = action.payload;
    },
    inputStatus: (state, action) => {
      state.inputV = action.payload;
    },
    getLotCurrent: (state, action) => {
      state.lotId = action.payload;
    },
  },
});

export const { toggleFieldStatus, inputStatus, getLotCurrent } =
  ShowFieldsSlice.actions;
export default ShowFieldsSlice.reducer;
