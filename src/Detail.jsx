import React, { useState } from "react";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { getProduct } from "./services/productService";
import { useQuery, queryCache } from "react-query";
import SelectSize from "./SelectSize";
import Loader from "./Loader";

export default function Detail({ cart, addToCart }) {
  const history = useHistory();
  const [size, setSize] = useState("");
  const { params } = useRouteMatch();
  const productId = parseInt(params["id"]);

  const { status, data: product, error } = useQuery(
    ["product", productId],
    getProduct,
    {
      // If the user has already viewed the list of shoes, then the shoe should already be in cache, so use it as the initial data for this query to save a fetch.
      // Comment this out and note that if you go to /shoes, then click on a shoe, you have to wait for it to load the first time.
      // With this enabled, it loads instantly if you've already viewed the shoe page.
      initialData: () => {
        return queryCache
          .getQueryData("products")
          .find((p) => p.id === productId);
      },
    }
  );

  if (status === "loading") return <Loader />;
  if (status === "error") throw error;

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
            onClick={() => {
              addToCart(product.id, parseInt(size));
              history.push("/cart");
            }}
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
