import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SelectSize from "./SelectSize";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail({ cart, setCart }) {
  const navigate = useNavigate();
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [product, loading] = useFetch(`products/${id}`);

  function addToCart(id, size) {
    setCart((cart) => {
      const alreadyInCart = cart.find((i) => i.id === id && i.size === size);
      if (alreadyInCart) {
        return cart.map((i) => {
          const isMatchingItem = i.id === id && i.size === size;
          return isMatchingItem ? { ...i, quantity: i.quantity + 1 } : i;
        });
      } else {
        return [...cart, { id, size, quantity: 1 }];
      }
    });
  }

  if (loading) return <Spinner />;
  if (!loading && !product) return <PageNotFound />;

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
              navigate("/cart");
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
