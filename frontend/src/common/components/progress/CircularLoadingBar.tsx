import React from "react";

interface CircularLoadingBarProps {
  size?: number;
  color?: string;
  className?: string;
}

export const CircularLoadingBar: React.FC<CircularLoadingBarProps> = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );
};
