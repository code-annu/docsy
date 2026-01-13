import { createSlice } from "@reduxjs/toolkit";
import type { DocsyError } from "../../../util/error-handler-util";
import { loginUser, refreshToken, signupUser } from "./auth-thunk";
import { StorageUtil } from "../../../util/StorageUtil";

export interface AuthState {
  session: {
    accessToken: string;
    refreshToken: string;
  } | null;
  isSignupLoading: boolean;
  isLoginLoading: boolean;
  signupError: DocsyError | null;
  loginError: DocsyError | null;
}

const initialState: AuthState = {
  session: null,
  isSignupLoading: false,
  isLoginLoading: false,
  signupError: null,
  loginError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.session = null;
      state.loginError = null;
      state.isLoginLoading = false;
      StorageUtil.clearTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.session = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload as DocsyError;
      })
      .addCase(signupUser.pending, (state) => {
        state.isSignupLoading = true;
        state.signupError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isSignupLoading = false;
        state.session = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isSignupLoading = false;
        state.signupError = action.payload as DocsyError;
      });

    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.session = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.session = null;
      state.loginError = null;
      state.isLoginLoading = false;
      StorageUtil.clearTokens();
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
