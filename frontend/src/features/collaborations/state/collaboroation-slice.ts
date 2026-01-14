import { createSlice } from "@reduxjs/toolkit";
import type { DocsyError } from "../../../util/error-handler-util";
import type { Collaboration } from "../data/types";
import {
  createCollaboration,
  deleteCollaboration,
  getCollaborations,
  updateCollaboration,
} from "./collaboration-thunk";

export interface CollaborationState {
  documentCollaborations: Collaboration[];
  isLoading: boolean;
  error: DocsyError | null;

  create: { creating: boolean; error: DocsyError | null };
  update: { updating: boolean; error: DocsyError | null };
  delete: { deleting: boolean; error: DocsyError | null };
}

export const initialCollaborationState: CollaborationState = {
  documentCollaborations: [],
  isLoading: false,
  error: null,

  create: { creating: false, error: null },
  update: { updating: false, error: null },
  delete: { deleting: false, error: null },
};

const collaborationSlice = createSlice({
  name: "collaboration",
  initialState: initialCollaborationState,
  reducers: {
    resetCollaborationState: (state) => {
      state.documentCollaborations = [];
      state.isLoading = false;
      state.error = null;
      state.create = { creating: false, error: null };
      state.update = { updating: false, error: null };
      state.delete = { deleting: false, error: null };
    },
    resetCreateState: (state) => {
      state.create = { creating: false, error: null };
    },
    resetUpdateState: (state) => {
      state.update = { updating: false, error: null };
    },
    resetDeleteState: (state) => {
      state.delete = { deleting: false, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get Collaborations
    builder
      .addCase(getCollaborations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCollaborations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentCollaborations = action.payload;
        state.error = null;
      })
      .addCase(getCollaborations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as DocsyError;
      });

    // Create Collaboration
    builder
      .addCase(createCollaboration.pending, (state) => {
        state.create.creating = true;
        state.create.error = null;
      })
      .addCase(createCollaboration.fulfilled, (state, action) => {
        state.create.creating = false;
        state.create.error = null;
        state.documentCollaborations.push(action.payload);
      })
      .addCase(createCollaboration.rejected, (state, action) => {
        state.create.creating = false;
        state.create.error = action.payload as DocsyError;
      });

    // Update Collaboration
    builder
      .addCase(updateCollaboration.pending, (state) => {
        state.update.updating = true;
        state.update.error = null;
      })
      .addCase(updateCollaboration.fulfilled, (state, action) => {
        state.update.updating = false;
        state.update.error = null;
        const index = state.documentCollaborations.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.documentCollaborations[index] = action.payload;
        }
      })
      .addCase(updateCollaboration.rejected, (state, action) => {
        state.update.updating = false;
        state.update.error = action.payload as DocsyError;
      });

    // Delete Collaboration
    builder
      .addCase(deleteCollaboration.pending, (state) => {
        state.delete.deleting = true;
        state.delete.error = null;
      })
      .addCase(deleteCollaboration.fulfilled, (state, action) => {
        state.delete.deleting = false;
        state.delete.error = null;
        state.documentCollaborations = state.documentCollaborations.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteCollaboration.rejected, (state, action) => {
        state.delete.deleting = false;
        state.delete.error = action.payload as DocsyError;
      });
  },
});

export default collaborationSlice.reducer;

export const {
  resetCollaborationState,
  resetCreateState,
  resetUpdateState,
  resetDeleteState,
} = collaborationSlice.actions;
