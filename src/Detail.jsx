import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail({ addToCart }) {
  const navigate = useNavigate();
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [product, loading] = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <p>
        <select
          aria-label="Select size"
          onChange={(e) => setSize(e.target.value)}
          value={size}
        >
          <option value="">What size?</option>
          {product.sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </p>
      <p>
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
      </p>
      <p>
        <Link to="/">Go Back</Link>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
