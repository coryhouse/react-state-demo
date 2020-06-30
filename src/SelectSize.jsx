import React from "react";

export default function SelectSize({
  id,
  value,
  onChange,
  defaultOptionLabel = "",
}) {
  return (
    <select id={id} aria-label="Select size" value={value} onChange={onChange}>
      <option value="">{defaultOptionLabel}</option>
      {[7, 8, 9].map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
}
