import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import useFetchAll from "./services/useFetchAll";

export default function Cart({ cart, updateCart }) {
  // Using ref since not rendered, and need to avoid re-allocating on each render.
  const uniqueIdsInCart = [...new Set(cart.map((i) => i.id))];
  const requests = useRef(
    uniqueIdsInCart.map((id) => ({ url: `/products/${id}` }))
  );
  const [products] = useFetchAll(requests.current);
  const history = useHistory();

  function renderItem(itemInCart) {
    const { price, id, name, image } = products.find(
      (s) => s.id === itemInCart.id
    );
    return (
      <div key={id + itemInCart.size} className="cart-item">
        <img src={`/images/${image}`} alt="shoe" />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {itemInCart.size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${itemInCart.size}`}
              onChange={(e) =>
                updateCart(id, itemInCart.size, parseInt(e.target.value))
              }
              value={itemInCart.quantity}
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

  const totalQuantity = cart.reduce((total, item) => {
    total = total + item.quantity;
    return total;
  }, 0);

  if (products === null) return "Loading...";

  return (
    <section id="cart">
      <h1>
        {cart.length === 0
          ? "Your cart is empty."
          : `${totalQuantity} Item${totalQuantity > 1 ? "s" : ""} in My Cart`}
      </h1>
      <p>
        <Link to="/shoes">Continue Shopping</Link>
      </p>
      {cart.map(renderItem)}
      {cart.length > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => history.push("/checkout")}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
