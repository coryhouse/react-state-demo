import { useState, useEffect } from "react";
import { getProducts } from "./productService";

export default function useProductService(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts(category).then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, [category]);

  return { products, loading };
}
