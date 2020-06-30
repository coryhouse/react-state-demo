import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import SelectSize from "./SelectSize";
import { getProducts } from "./services/productService";
import { useQuery } from "react-query";
import Loader from "./Loader";

export default function Products() {
  const { params } = useRouteMatch();
  const { category } = params;
  const { data: products } = useQuery(["products", category], getProducts);
  const [size, setSize] = useState(localStorage.getItem("shoe-size") || "");
  function getFilteredProducts() {
    if (!products) return [];
    return size
      ? products.filter((p) => p.sizes.find((s) => s === parseInt(size)))
      : products;
  }

  if (!products) return <Loader />;

  const filteredProducts = getFilteredProducts();

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <SelectSize
          id="size"
          onChange={(e) => {
            setSize(e.target.value);
            localStorage.setItem("shoe-size", e.target.value);
          }}
          value={size}
          defaultOptionLabel="All sizes"
        />
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">
        {filteredProducts.length === 0 && "No items found."}
        {filteredProducts.map((p) => (
          <div key={p.id} className="product">
            <Link to={`/${category}/${p.id}`}>
              <img src={`/images/${p.image}`} alt={p.name} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
