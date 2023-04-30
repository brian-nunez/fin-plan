import React from 'react';
import type { InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  ...rest
}, ref) => {
  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <input
        type="text"
        className="mt-1 block w-full"
        ref={ref}
        {...rest}
      />
    </label>
  );
});

Input.displayName = 'Input';
