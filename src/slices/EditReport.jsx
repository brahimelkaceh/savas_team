import { createSlice } from "@reduxjs/toolkit";

const EditRepportSlice = createSlice({
  name: "EditRepport ",
  initialState: {
    id: null,
  },
  reducers: {
    getRepportId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { getRepportId } = EditRepportSlice.actions;
export default EditRepportSlice.reducer;
