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
          return isMatchingItem ? { ...i, quantity: i.quantity + 1 } : i;
        });
      } else {
        return [...cart, { id, size, quantity: 1 }];
      }
    });
  }

  return (
    <>
      <div className="content">
        <Header cart={cart} />

        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />
            <Route
              path="/checkout"
              element={<Checkout emptyCart={() => setCart([])} />}
            />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail cart={cart} addToCart={addToCart} />}
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
