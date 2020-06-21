import React, { useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import SelectSize from "./SelectSize";
import useFetch from "./services/useFetch";
import Loader from "./Loader";

export default function Detail({ cart, addToCart }) {
  const [size, setSize] = useState("");
  const { params } = useRouteMatch();
  const [product] = useFetch(`/products/${params.id}`);

  if (!product) return <Loader />;

  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>${product.price}</h2>
      <p>
        <SelectSize
          onChange={(e) => setSize(e.target.value)}
          value={size}
          defaultOptionLabel="What size?"
        />
      </p>
      <p>
        {cart.find((c) => c === product.id) ? (
          <Link to="/cart">In Cart</Link>
        ) : (
          <button
            className="btn btn-primary"
            disabled={!size}
            onClick={() => addToCart(product.id, parseInt(size))}
          >
            Add to cart
          </button>
        )}
      </p>
      <p>
        <Link to="/">Go Back</Link>
      </p>
      <img
        style={{ maxHeight: 400 }}
        src={`/images/${product.image}`}
        alt={product.category}
      />
    </>
  );
}
