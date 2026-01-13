import React from "react";

interface TextInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  className = "",
  id,
  ...props
}) => {
  // Generate a unique ID if one isn't provided, to link label and input
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700 ml-1"
      >
        {label}
      </label>
      <input
        id={inputId}
        className="
          w-full px-4 py-2
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          placeholder-gray-400
          transition-shadow duration-200
        "
        {...props}
      />
    </div>
  );
};
