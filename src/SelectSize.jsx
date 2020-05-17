import React from "react";

export default function SelectSize({
  value,
  onChange,
  defaultOptionLabel = "",
}) {
  return (
    <select id="size" value={value} onChange={onChange}>
      <option value="">{defaultOptionLabel}</option>
      {[7, 8, 9].map((s) => (
        <option value={s}>{s}</option>
      ))}
    </select>
  );
}
