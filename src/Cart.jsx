import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Cart({ cart, shoes, onQuantityChange }) {
  const history = useHistory();

  function renderItem(shoeInCart) {
    const { price, id, name } = shoes.find((s) => s.id === shoeInCart.id);
    return (
      <div key={id + shoeInCart.size} className="cart-item">
        <img src={`/images/shoe${id}.jpg`} alt="shoe" />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {shoeInCart.size}</p>
          <p>
            <select
              onChange={(e) =>
                onQuantityChange(id, shoeInCart.size, parseInt(e.target.value))
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

  const totalQuantity = cart.reduce((total, shoe) => {
    total = total + shoe.quantity;
    return total;
  }, 0);

  return (
    <section id="cart">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <h1>
          {totalQuantity} Item{totalQuantity > 1 && "s"} in My Cart
        </h1>
      )}
      <p>
        <Link to="/">Continue Shopping</Link>
      </p>
      {cart.map(renderItem)}
      <button
        className="btn btn-primary"
        onClick={() => history.push("/checkout")}
      >
        Checkout
      </button>
    </section>
  );
}
