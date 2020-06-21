import { useState, useEffect } from "react";
import { getProduct } from "./productService";

export default function useProductDetailService(productIds) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all(productIds.map((id) => getProduct(id))).then((response) => {
      setProducts(response);
    });
  }, [productIds]);

  return [products];
}
