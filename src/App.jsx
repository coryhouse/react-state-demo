import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App() {
  // Note, can call React.useState if you prefer
  // Build up state slowly. Start with const statusState = useState(); Then destructure just first element in array. Then 2nd.
  // Pass func so it's only called once. (even though the initial value is only used on the first render, the function which initializes it still gets called))
  //https://stackoverflow.com/questions/58539813/lazy-initial-state-where-to-use-it
  // and https://dmitripavlutin.com/react-usestate-hook-guide/#3-lazy-initialization-of-state
  // Or, can use https://www.npmjs.com/package/@rehooks/local-storage which syncs between tabs
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error(
        "The localStorage cart could not be parsed into JSON. Resetting to an empty array."
      );
      return [];
    }
  });

  // Persist cart in localStorage
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const alreadyInCart = items.find((i) => i.sku === sku);
      if (alreadyInCart) {
        // Return new array with matching item replaced
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Return new array with new item appended
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return quantity === 0
        ? items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  }

  const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="content">
        <Header numItemsInCart={numItemsInCart} />

        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                  numItemsInCart={numItemsInCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout emptyCart={() => setCart([])} />}
            />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route path="/page-not-found" />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
