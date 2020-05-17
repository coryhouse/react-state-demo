import React, { useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import SelectSize from "./SelectSize";

export default function ShoeDetail({ shoes, cart, addToCart }) {
  const [size, setSize] = useState(null);
  const { params } = useRouteMatch();
  const shoe = shoes.find((shoe) => shoe.id === parseInt(params["id"]));

  return (
    <>
      <h1>{shoe.name}</h1>
      <p>{shoe.description}</p>
      <h2>${shoe.price}</h2>
      <p>
        <SelectSize
          onChange={(e) => setSize(e.target.value)}
          value={size}
          defaultOptionLabel="What size?"
        />
      </p>
      <p>
        {cart.find((c) => c === shoe.id) ? (
          <Link to="/cart">In Cart</Link>
        ) : (
          <button
            className="btn btn-primary"
            disabled={!size}
            onClick={() => addToCart(shoe.id)}
          >
            Add to cart
          </button>
        )}
      </p>
      <p>
        <Link to="/">Go Back</Link>
      </p>
      <img src={`/images/shoe${shoe.id}.jpg`} alt="shoe" />
    </>
  );
}
