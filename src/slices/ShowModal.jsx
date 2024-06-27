import { createSlice } from "@reduxjs/toolkit";

const ShowModalSlice = createSlice({
  name: "showModal",
  initialState: { modalState: false },
  reducers: {
    showModal: (state, action) => {
      state.modalState = action.payload;
    },
  },
});
export const { showModal } = ShowModalSlice.actions;
export default ShowModalSlice.reducer;
