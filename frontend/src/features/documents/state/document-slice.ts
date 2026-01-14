import { createSlice } from "@reduxjs/toolkit";
import type { DocsyError } from "../../../util/error-handler-util";
import type { Document, DocumentSummary } from "../data/types";
import {
  createDocument,
  deleteDocument,
  getDocument,
  getDocuments,
  updateDocument,
} from "./document-thunk";

export interface DocumentState {
  documents: DocumentSummary[];
  currentDocument: Document | null;
  isLoading: boolean;
  fetchingError: DocsyError | null;
  create: { creating: boolean; error: DocsyError | null };
  update: { updating: boolean; error: DocsyError | null };
  delete: { deleting: boolean; error: DocsyError | null };
}

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  isLoading: false,
  fetchingError: null,
  create: { creating: false, error: null },
  update: { updating: false, error: null },
  delete: { deleting: false, error: null },
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    resetDocumentState: (state) => {
      state.documents = [];
      state.currentDocument = null;
      state.isLoading = false;
      state.fetchingError = null;
      state.create = { creating: false, error: null };
      state.update = { updating: false, error: null };
      state.delete = { deleting: false, error: null };
    },
    clearCurrentDocument: (state) => {
      state.currentDocument = null;
    },
    resetDeleteState: (state) => {
      state.delete = { deleting: false, error: null };
    },
    resetUpdateState: (state) => {
      state.update = { updating: false, error: null };
    },
    resetCreateState: (state) => {
      state.create = { creating: false, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get Documents
    builder
      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true;
        state.fetchingError = null;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
        state.fetchingError = null;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchingError = action.payload as DocsyError;
      });

    // Create Document
    builder
      .addCase(createDocument.pending, (state) => {
        state.create.creating = true;
        state.create.error = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.create.creating = false;
        state.create.error = null;
        state.documents.push(action.payload as DocumentSummary);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.create.creating = false;
        state.create.error = action.payload as DocsyError;
      });

    // Update Document
    builder
      .addCase(updateDocument.pending, (state) => {
        state.update.updating = true;
        state.update.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.update.updating = false;
        state.update.error = null;
        // Also update the item in the list if it exists
        const index = state.documents.findIndex(
          (doc) => doc.id === action.payload.id
        );
        if (index !== -1) {
          // We can update the summary with common fields
          state.documents[index] = {
            ...state.documents[index],
            title: action.payload.title,
            updatedAt: action.payload.updatedAt,
            lastViewedAt: action.payload.lastViewedAt,
          } as DocumentSummary;
          state.documents[index].title = action.payload.title;
          state.documents[index].isPrivate = action.payload.isPrivate;
          state.documents[index].lastViewedAt = action.payload.lastViewedAt;
          state.documents[index].currentVersion = action.payload.currentVersion;
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.update.updating = false;
        state.update.error = action.payload as DocsyError;
      });

    // Delete Document
    builder
      .addCase(deleteDocument.pending, (state) => {
        state.delete.deleting = true;
        state.delete.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.delete.deleting = false;
        // Remove from list
        state.documents = state.documents.filter(
          (doc) => doc.id !== action.payload
        );
        if (state.currentDocument?.id === action.payload) {
          state.currentDocument = null;
        }
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.delete.deleting = false;
        state.delete.error = action.payload as DocsyError;
      });

    // Get Single Document
    builder
      .addCase(getDocument.pending, (state) => {
        state.isLoading = true;
        state.fetchingError = null;
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDocument = action.payload;
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchingError = action.payload as DocsyError;
      });
  },
});

export default documentSlice.reducer;

export const {
  resetDocumentState,
  clearCurrentDocument,
  resetCreateState,
  resetUpdateState,
  resetDeleteState,
} = documentSlice.actions;
