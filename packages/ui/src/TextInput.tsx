"use client";

export const TextInput = ({
  placeholder,
  onChange,
  label,
  value,
  type = "text", // Default type
  disabled = false, // Add disabled prop
  className = "", // Allow custom className
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  value?: string; // Optional value
  type?: string; // Optional type
  disabled?: boolean; // Add disabled as optional
  className?: string; // Optional className
}) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        value={value} // Bind value to the input
        onChange={(e) => onChange(e.target.value)}
        type={type} // Use type prop
        disabled={disabled} // Bind disabled prop
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};
