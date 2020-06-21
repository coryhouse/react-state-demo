import { useState, useEffect } from "react";
import { getProduct } from "./productService";

export default function useProductDetailService(productIds) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(productIds.map((id) => getProduct(id))).then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, [productIds]);

  return { products, loading };
}
