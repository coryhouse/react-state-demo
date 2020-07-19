import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { getProduct } from "./services/productService";

// Wrap class to provide React Router data functionality
export default function Wrapper(props) {
  return <Detail navigate={useNavigate()} params={useParams()} {...props} />;
}

class Detail extends React.Component {
  state = {
    sku: "",
    loading: true,
    product: null,
  };

  componentDidMount() {
    getProduct(this.props.params.id)
      .then((product) => this.setState({ product }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, product, sku } = this.state;

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
            onChange={(e) => this.setState({ sku: e.target.value })}
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
              this.props.addToCart(product.id, sku);
              this.props.navigate("/cart");
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
}
