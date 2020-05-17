import React, { useState } from "react";

export default function Filters() {
  const [size, setSize] = useState(localStorage.getItem("size"));

  return (
    <section>
      <label htmlFor="size">Size:</label>{" "}
      <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
        <option></option>
        {[7, 8, 9].map((s) => (
          <option value={s}>{s}</option>
        ))}
      </select>
    </section>
  );
}
