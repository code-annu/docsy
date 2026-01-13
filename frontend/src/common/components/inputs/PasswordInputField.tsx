import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  label,
  className = "",
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700 ml-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          className="
            w-full px-4 py-2 pr-10
            border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
            placeholder-gray-400
            transition-shadow duration-200
          "
          {...props}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
