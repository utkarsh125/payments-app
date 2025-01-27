"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  children,
  className = "",
  disabled = false,
}: ButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-gray-900 focus:ring-gray-500"
      } ${className}`}
    >
      {children}
    </button>
  );
};