import { createSlice } from "@reduxjs/toolkit";

const userDropSlice = createSlice({
  name: "userDrop",
  initialState: { dropState: false },
  reducers: {
    setUserDrop: (state, action) => {
      state.dropState = true;
    },
    closeDrop: (state) => {
      state.dropState = false;
    },
  },
});

export const { setUserDrop, closeDrop } = userDropSlice.actions;
export default userDropSlice.reducer;
