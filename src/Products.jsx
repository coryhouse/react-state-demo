import React from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "./services/productService";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Wrapper(props) {
  return <Products params={useParams} {...props} />;
}

class Products extends React.Component {
  state = {
    size: localStorage.getItem("shoe-size") ?? "",
    loading: true,
    error: null,
  };

  componentDidMount() {
    getProducts(this.props.params.category)
      .then((products) => this.setState({ products }))
      .finally(() => this.setState({ loading: false }));
  }

  getFilteredProducts() {
    const { products, size } = this.state;
    if (!products) return [];
    return size
      ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
      : products;
  }

  render() {
    const { error, loading, products, size } = this.state;

    if (error) throw error;
    if (loading) return <Spinner />;
    if (products.length === 0) return <PageNotFound />;

    const filteredProducts = this.getFilteredProducts();

    return (
      <>
        <section id="filters">
          <label htmlFor="size">Filter by Size:</label>{" "}
          <select
            id="size"
            onChange={(e) => {
              this.setState({ size: e.target.value });
              localStorage.setItem("shoe-size", e.target.value);
            }}
            value={size}
          >
            <option value="">All sizes</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          {size && <h2>Found {filteredProducts.length} items</h2>}
        </section>
        <section id="products">
          {filteredProducts.length === 0 && "No items found."}
          {filteredProducts.map((p) => (
            <div key={p.id} className="product">
              <Link to={`/${this.props.params.category}/${p.id}`}>
                <img src={`/images/${p.image}`} alt={p.name} />
                <h3>{p.name}</h3>
                <p>${p.price}</p>
              </Link>
            </div>
          ))}
        </section>
      </>
    );
  }
}
