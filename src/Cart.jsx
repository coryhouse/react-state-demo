import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";

export default function Cart({ cart, updateQuantity, numItemsInCart }) {
  const uniqueIdsInCart = [...new Set(cart.map((i) => i.id))];
  const urls = uniqueIdsInCart.map((id) => `products/${id}`);
  const [products, loading, error] = useFetchAll(urls);
  const navigate = useNavigate();

  function renderItem(item) {
    const { id, size, quantity } = item;
    const { price, name, image } = products.find((p) => p.id === parseInt(id));
    return (
      <li key={id + size} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) =>
                updateQuantity(id, size, parseInt(e.target.value))
              }
              value={quantity}
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
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  return (
    <section id="cart">
      <h1>
        {numItemsInCart === 0
          ? "Your cart is empty."
          : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
      </h1>
      <p>
        <Link to="/shoes">Continue Shopping</Link>
      </p>

      <ul>{cart.map(renderItem)}</ul>

      {cart.length > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
