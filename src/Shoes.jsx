import React, { useState } from "react";
import { Link } from "react-router-dom";
import SelectSize from "./SelectSize";

export default function Home({ shoes }) {
  const [size, setSize] = useState(localStorage.getItem("shoe-size") || "");

  const filteredShoes = size
    ? shoes.filter((shoe) => shoe.sizes.some((s) => s === parseInt(size)))
    : shoes;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <SelectSize
          onChange={(e) => {
            setSize(e.target.value);
            localStorage.setItem("shoe-size", e.target.value);
          }}
          value={size}
          defaultOptionLabel="All Sizes"
        />
        {size && <h2>Found {filteredShoes.length} shoes</h2>}
      </section>
      <section id="shoes">
        {filteredShoes.length === 0 && "No shoes found."}
        {filteredShoes.map((shoe) => (
          <div key={shoe.id} className="shoe">
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
