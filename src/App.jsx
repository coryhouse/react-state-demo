import React, { useEffect, useReducer } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

function App() {
  const [cart, dispatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart")) ?? []
  );

  // Persist cart in localStorage
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

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
                  dispatch={dispatch}
                  numItemsInCart={numItemsInCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout dispatch={dispatch} />}
            />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
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
