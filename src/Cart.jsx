import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, shoes, removeFromCart }) {
  function setQuantity(event) {}

  return (
    <section id="cart">
      <h1>Cart</h1>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      <p>
        <Link to="/">Continue Shopping</Link>
      </p>
      {cart.length > 0 && (
        <table>
          <thead>
            <th></th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </thead>
          <tbody>
            {cart.map((id) => {
              const shoe = shoes.find((s) => s.id === id);
              return (
                <tr>
                  <td>
                    <button
                      className="btn btn-link"
                      onClick={() => removeFromCart(shoe.id)}
                    >
                      Remove
                    </button>
                    <img src={`/images/shoe${shoe.id}.jpg`} alt="shoe" />
                  </td>
                  <td>${shoe.price}</td>
                  <td>
                    <input type="number" onChange={setQuantity} />
                  </td>
                  <td>
                    <strong>${shoe.price * 1}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
