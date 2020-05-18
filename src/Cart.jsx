import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, shoes, onQuantityChange }) {
  function renderItem(shoeInCart) {
    const { price, id, name } = shoes.find((s) => s.id === shoeInCart.id);
    return (
      <div className="cart-item">
        <img src={`/images/shoe${id}.jpg`} alt="shoe" />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {shoeInCart.size}</p>
          <p>
            <select
              onChange={(e) =>
                onQuantityChange(id, shoeInCart.size, e.target.value)
              }
              value={shoeInCart.quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section id="cart">
      <h1>Cart</h1>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      <p>
        <Link to="/">Continue Shopping</Link>
      </p>
      {cart.map(renderItem)}
    </section>
  );
}
