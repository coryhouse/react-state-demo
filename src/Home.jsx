import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ shoes }) {
  const [size, setSize] = useState(localStorage.getItem("shoe-size"));

  const filteredShoes = size
    ? shoes.filter((shoe) => shoe.sizes.some((s) => s === size))
    : shoes;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
            localStorage.setItem("shoe-size", e.target.value);
          }}
        >
          <option>All Sizes</option>
          {[7, 8, 9].map((s) => (
            <option value={s}>{s}</option>
          ))}
        </select>
      </section>
      <section id="shoes">
        {filteredShoes.length === 0 && "No shoes found."}
        {filteredShoes.map((shoe) => (
          <div className="shoe">
            <Link to={`/shoe/${shoe.id}`}>
              <img src={`images/shoe${shoe.id}.jpg`} alt="shoe" />
              <h3>{shoe.name}</h3>
              <p>${shoe.price}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
