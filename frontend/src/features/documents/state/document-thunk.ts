import { createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentApi } from "../data/DocumentApi";
import type {
  DocumentCreateRequest,
  DocumentUpdateRequest,
} from "../data/types";
import { mapToCustomError } from "../../../util/error-handler-util";
import type { DocsyError } from "../../../util/error-handler-util";

export const getDocuments = createAsyncThunk(
  "document/getDocuments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await DocumentApi.getDocuments();
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const createDocument = createAsyncThunk(
  "document/createDocument",
  async (document: DocumentCreateRequest, { rejectWithValue }) => {
    try {
      const response = await DocumentApi.createDocument(document);
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const updateDocument = createAsyncThunk(
  "document/updateDocument",
  async (document: DocumentUpdateRequest, { rejectWithValue }) => {
    try {
      const response = await DocumentApi.updateDocument(document);
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "document/deleteDocument",
  async (id: string, { rejectWithValue }) => {
    try {
      await DocumentApi.deleteDocument(id);
      return id;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);

export const getDocument = createAsyncThunk(
  "document/getDocument",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await DocumentApi.getDocument(id);
      return response;
    } catch (err) {
      const error: DocsyError = mapToCustomError(err);
      return rejectWithValue(error);
    }
  }
);
