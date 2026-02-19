import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isRegister: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  msg: null,
  mailSending: false,
  mailSent: false,
  mailSentRes: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.msg = action.payload.msg
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state) {
      state.loading = false;
      state.isRegister = true;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.isRegister = false;
      state.error = action.payload;
    },
    mailSending(state) {
      state.mailSending = true
    },
    mailSentSuccess(state, action) {
      state.mailSending = false
      state.mailSent = true
      state.mailSentRes = action.payload
    },
    mailSentFailure(state) {
      state.mailSending = false
      state.mailSent = false
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, mailSending, mailSentSuccess, mailSentFailure } = authSlice.actions;
export default authSlice.reducer;
