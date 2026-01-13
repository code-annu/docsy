import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../data/AuthApi";
import type { LoginCredentials, SignupCredentials } from "../data/types";
import { mapToCustomError } from "../../../util/error-handler-util";
import type { DocsyError } from "../../../util/error-handler-util";
import { StorageUtil } from "../../../util/StorageUtil";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthApi.login(credentials);
      StorageUtil.saveAccessToken(response.accessToken);
      StorageUtil.saveRefreshToken(response.refreshToken);
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthApi.signup(credentials);
      StorageUtil.saveAccessToken(response.accessToken);
      StorageUtil.saveRefreshToken(response.refreshToken);
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await AuthApi.refreshToken(token);
      StorageUtil.saveAccessToken(response.accessToken);
      StorageUtil.saveRefreshToken(response.refreshToken);
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);
