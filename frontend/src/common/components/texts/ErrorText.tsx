import React from "react";

interface ErrorTextProps {
  error: string | null | undefined;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ error }) => {
  if (!error) return null;
  return <p className="text-red-500 text-sm mt-1">{error}</p>;
};