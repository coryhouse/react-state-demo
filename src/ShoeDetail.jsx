import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

export default function ShoeDetail({ shoes, cart, addToCart }) {
  const { params } = useRouteMatch();
  const shoe = shoes.find((shoe) => shoe.id === parseInt(params["id"]));

  return (
    <>
      <h1>{shoe.name}</h1>

      <p>
        {cart.find((c) => c === shoe.id) ? (
          <Link to="/cart">In Cart</Link>
        ) : (
          <button onClick={() => addToCart(shoe.id)}>Add to cart</button>
        )}
      </p>

      <p>
        <Link to="/">Go Back</Link>
      </p>

      <img src={`/images/shoe${shoe.id}.jpg`} alt="shoe" />
    </>
  );
}
