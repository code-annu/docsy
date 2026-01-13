import { createSlice } from "@reduxjs/toolkit";
import type { DocsyError } from "../../../util/error-handler-util";
import type { Profile } from "../data/types";
import { deleteProfile, getProfile, updateProfile } from "./profile-thunk";

export interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  profileFetchingError: DocsyError | null;
  updating: boolean;
  updateError: DocsyError | null;
  deleting: boolean;
  deleteError: DocsyError | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  profileFetchingError: null,
  updating: false,
  updateError: null,
  deleting: false,
  deleteError: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.profileFetchingError = null;
      state.updating = false;
      state.updateError = null;
      state.deleting = false;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.profileFetchingError = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.profileFetchingError = action.payload as DocsyError;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload as DocsyError;
      });

    // Delete Profile
    builder
      .addCase(deleteProfile.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.deleting = false;
        state.profile = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload as DocsyError;
      });
  },
});

export default profileSlice.reducer;

export const { resetProfile } = profileSlice.actions;
