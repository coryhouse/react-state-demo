import React, { useState, useContext, useEffect } from "react";

const CartContext = React.createContext();

export function CartProvider(props) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      return [];
    }
  });

  // Persist cart in localStorage
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart(id, size) {
    setCart((cart) => {
      const alreadyInCart = cart.find((i) => i.id === id && i.size === size);
      if (alreadyInCart) {
        return cart.map((i) => {
          const isMatchingItem = i.id === id && i.size === size;
          return isMatchingItem
            ? {
                ...i,
                quantity: i.quantity + 1,
              }
            : i;
        });
      } else {
        return [...cart, { id, size, quantity: 1 }];
      }
    });
  }

  function updateCart(id, size, quantity) {
    setCart((cart) => {
      return quantity === 0
        ? cart.filter((i) => i.id !== id || (i.id === id && i.size !== size))
        : cart.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          );
    });
  }

  function emptyCart() {
    setCart([]);
  }

  const contextValue = {
    cart,
    addToCart,
    updateCart,
    emptyCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error."
    );
  }
  return context;
}
