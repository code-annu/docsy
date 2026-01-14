import { createAsyncThunk } from "@reduxjs/toolkit";
import { CollaborationApi } from "../data/CollaborationApi";
import type {
  CollaborationCreateRequest,
  CollaborationUpdateRequest,
} from "../data/types";
import { mapToCustomError } from "../../../util/error-handler-util";
import type { DocsyError } from "../../../util/error-handler-util";

export const getCollaborations = createAsyncThunk(
  "collaboration/getCollaborations",
  async (documentId: string, { rejectWithValue }) => {
    try {
      const response = await CollaborationApi.getCollaborations(documentId);
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const createCollaboration = createAsyncThunk(
  "collaboration/createCollaboration",
  async (
    payload: { documentId: string; data: CollaborationCreateRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await CollaborationApi.createCollaboration(
        payload.documentId,
        payload.data
      );
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const updateCollaboration = createAsyncThunk(
  "collaboration/updateCollaboration",
  async (collaboration: CollaborationUpdateRequest, { rejectWithValue }) => {
    try {
      const response = await CollaborationApi.updateCollaboration(
        collaboration
      );
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const deleteCollaboration = createAsyncThunk(
  "collaboration/deleteCollaboration",
  async (collaborationId: string, { rejectWithValue }) => {
    try {
      await CollaborationApi.deleteCollaboration(collaborationId);
      return collaborationId;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);
