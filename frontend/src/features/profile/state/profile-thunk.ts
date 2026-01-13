import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileApi } from "../data/ProfileApi";
import type { ProfileUpdateRequest } from "../data/types";
import { mapToCustomError } from "../../../util/error-handler-util";
import type { DocsyError } from "../../../util/error-handler-util";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProfileApi.getProfile();
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profile: ProfileUpdateRequest, { rejectWithValue }) => {
    try {
      const response = await ProfileApi.updateProfile(profile);
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      await ProfileApi.deleteProfile();
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);
