import React from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "number" | "password";
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  label,
  error,
  disabled = false,
  fullWidth = true,
  autoFocus = false,
  onKeyDown,
}: InputProps) {
  const inputId = React.useId();

  const baseStyles =
    "block rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0";
  const normalStyles =
    "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  const errorStyles = "border-red-500 focus:border-red-500 focus:ring-red-500";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <div className={widthStyles}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        className={`${baseStyles} ${
          error ? errorStyles : normalStyles
        } ${widthStyles}`}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  rows = 3,
  fullWidth = true,
}: TextAreaProps) {
  const inputId = React.useId();

  const baseStyles =
    "block rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none";
  const normalStyles =
    "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  const errorStyles = "border-red-500 focus:border-red-500 focus:ring-red-500";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <div className={widthStyles}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`${baseStyles} ${
          error ? errorStyles : normalStyles
        } ${widthStyles}`}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
