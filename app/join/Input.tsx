// components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  // NEW PROP for displaying validation messages
  error?: string; 
}

export default function Input({ label, id, error, ...props }: InputProps) {
    
  // Determine if the input should have an error state visual (red border)
  const borderClass = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : 'border-white/10 focus:border-[#F5E6B3] focus:ring-[#F5E6B3]';

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs uppercase font-oswald text-[#8C8C8C] block">
        {label}
      </label>
      <input
        id={id}
        name={id}
        // Apply dynamic border class
        className={`w-full p-3 bg-[#1F1F1F] rounded-md text-[#E6E6E6] font-roboto outline-none transition border ${borderClass}`}
        {...props}
      />
      
      {/* Display the error message */}
      {error && (
        <p className="text-xs text-red-400 font-roboto pt-1">
          {/* Cleans up the message string if it contains the field name prefix */}
          {error.includes(': ') ? error.split(': ').slice(-1)[0] : error}
        </p>
      )}
    </div>
  );
}