import React from 'react';
import type { InputHTMLAttributes } from "react";

type SelectProps = {
  label?: string;
  options: ({ label: string; value: string })[];
  placeholder?: string;
} & InputHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  placeholder,
  name,
  ...rest
}, ref) => {
  return (
    <label className="block w-100">
      <span className="text-gray-700">{label}</span>
      <select
        className="block w-full mt-1"
        ref={ref}
        name={name}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option
            key={`${name}-${opt.label}`}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
});

Select.displayName = 'Select';
