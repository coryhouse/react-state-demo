import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, shoes, removeFromCart }) {
  return (
    <section id="cart">
      <h1>Cart</h1>
      <p>
        <Link to="/">Continue Shopping</Link>
      </p>
      <ul>
        {cart.map((id) => {
          const shoe = shoes.find((s) => s.id === id);
          return (
            <li>
              <button
                className="btn btn-primary"
                onClick={() => removeFromCart(shoe.id)}
              >
                Remove
              </button>
              <img src={`/images/shoe${shoe.id}.jpg`} alt="shoe" />
              {shoe.name}{" "}
            </li>
          );
        })}
      </ul>
      <p></p>
    </section>
  );
}
