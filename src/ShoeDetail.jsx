import React, { useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { getShoe } from "./services/shoeApi";
import { useQuery, queryCache } from "react-query";
import SelectSize from "./SelectSize";

export default function ShoeDetail({ cart, addToCart }) {
  const [size, setSize] = useState("");
  const { params } = useRouteMatch();
  const shoeId = parseInt(params["id"]);
  const { status, data: shoe, error } = useQuery(["shoe", shoeId], getShoe, {
    // If the user has already viewed the list of shoes, then the shoe should already be in cache, so use it as the initial data for this query to save a fetch.
    // Comment this out and note that if you go to home, then click on a shoe, you have to wait for it to load the first time. With this enabled, it loads instantly if you've already viewed the shoe page.
    initialData: () => {
      return queryCache.getQueryData("shoes").find((s) => s.id === shoeId);
    },
  });

  if (status === "loading") return "Loading...";
  if (status === "error") throw error;

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
            onClick={() => addToCart(shoe.id, parseInt(size))}
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
        src={`/images/shoe${shoe.id}.jpg`}
        alt="shoe"
      />
    </>
  );
}
