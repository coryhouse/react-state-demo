import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";

export default function Cart({ cart, updateQuantity }) {
  const uniqueIdsInCart = [...new Set(cart.map((i) => i.id))];
  const requests = uniqueIdsInCart.map((id) => ({ url: `products/${id}` }));
  const [products, loading, error] = useFetchAll(requests);
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

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) return <Spinner />;
  if (error) throw error;

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
