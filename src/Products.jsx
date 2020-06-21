import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import SelectSize from "./SelectSize";
import useProductService from "./services/useProductService";

export default function Products() {
  const { params } = useRouteMatch();
  const { category } = params;
  const { products, loading } = useProductService(category);
  const [size, setSize] = useState(localStorage.getItem("shoe-size") || "");

  const filteredProducts = size
    ? products.filter((p) => p.sizes.some((s) => s === parseInt(size)))
    : products;

  if (loading) return "Loading...";

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
          defaultOptionLabel="All sizes"
        />
        {size && <h2>Found {filteredProducts.length} shoes</h2>}
      </section>
      <section id="shoes">
        {filteredProducts.length === 0 && "No items found."}
        {filteredProducts.map((p) => (
          <div key={p.id} className="shoe">
            <Link to={`/${category}/${p.id}`}>
              <img src={`/images/${p.image}`} alt="shoe" />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
