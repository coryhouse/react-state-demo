import React from "react";

export default function SelectSize({
  value,
  onChange,
  defaultOptionLabel = "",
}) {
  return (
    <select
      id="size"
      aria-label="Select size"
      value={value}
      onChange={onChange}
    >
      <option value="">{defaultOptionLabel}</option>
      {[7, 8, 9].map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
}
