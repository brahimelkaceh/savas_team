import { createSlice } from "@reduxjs/toolkit";

const Login = createSlice({
  name: "login",
  initialState: {
    status: false,
  },
  reducers: {
    loginForm: (state, action) => {
      state.status = !state.status;
    },
  },
});

export const { loginForm } = Login.actions;
export default Login.reducer;
