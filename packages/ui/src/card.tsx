import React from "react";

export function Card({
  title,
  children,
  className = "", // Add className as an optional prop with a default value
}: {
  title: string;
  children?: React.ReactNode;
  className?: string; // Declare className as an optional string
}): JSX.Element {
  return (
    <div
      className={`border p-6 bg-white rounded-xl bg-[#ededed] ${className}`} // Dynamically apply className
    >
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <div>{children}</div> {/* Changed <p> to <div> to allow nesting any content */}
    </div>
  );
}
