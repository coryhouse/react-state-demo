import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail({ addToCart }) {
  const navigate = useNavigate();
  const [sku, setSku] = useState("");
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
          onChange={(e) => setSku(e.target.value)}
          value={sku}
        >
          <option value="">What size?</option>
          {product.skus.map((s) => (
            <option key={s.sku} value={s.sku}>
              {s.size}
            </option>
          ))}
        </select>
      </p>
      <p>
        <button
          className="btn btn-primary"
          disabled={!sku}
          onClick={() => {
            addToCart(product.id, sku);
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
