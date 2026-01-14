import React, { useEffect } from "react";
import { getDocuments, createDocument } from "../../state/document-thunk";
import DocumentView from "../components/DocumentView";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hook";
import { PrimaryButton } from "../../../../common/components/buttons/PrimaryButton";

const DocumentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { documents, isLoading, fetchingError, create } = useAppSelector(
    (state) => state.document
  );

  useEffect(() => {
    if (documents.length == 0) {
      dispatch(getDocuments());
    }
  }, [dispatch]);

  const handleDocumentClick = (id: string) => {
    navigate(`/documents/${id}`);
  };

  const handleCreateDocument = async () => {
    try {
      const newDoc = await dispatch(
        createDocument({
          title: "Untitled Document",
          currentContent: "",
        })
      ).unwrap();
      navigate(`/documents/${newDoc.id}`);
    } catch (error) {
      console.error("Failed to create document:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
        <PrimaryButton
          onClick={handleCreateDocument}
          isLoading={create.creating}
        >
          Create New Document
        </PrimaryButton>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {fetchingError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>
            Error fetching documents:{" "}
            {fetchingError.error.message || "Unknown error"}
          </p>
        </div>
      )}

      {!isLoading && !fetchingError && documents.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No documents found.</p>
          <p>Create a new document to get started.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <DocumentView
            key={doc.id}
            document={doc}
            onClick={handleDocumentClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentPage;
