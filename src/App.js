import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Shoes from "./Shoes";
import { Route } from "react-router-dom";
import ShoeDetail from "./ShoeDetail";
import { getShoes } from "./services/shoeApi";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import cartReducer from "./cartReducer";

const STATUS = {
  LOADING: "LOADING",
  IDLE: "IDLE",
};

function App() {
  const [status, setStatus] = useState(STATUS.LOADING);
  const [shoes, setShoes] = useState([]);
  const [cart, dispatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart")) ?? []
  );

  // Persist cart to localstorage
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  useEffect(() => {
    getShoes().then((shoes) => {
      setShoes(shoes);
      setStatus(STATUS.IDLE);
    });
  }, []);

  if (status === STATUS.LOADING) return "Loading...";

  return (
    <>
      <div className="content">
        <Header cart={cart} />

        <main>
          <Route path="/" exact>
            <Shoes shoes={shoes} />
          </Route>

          <Route path="/shoe/:id">
            <ShoeDetail cart={cart} shoes={shoes} dispatch={dispatch} />
          </Route>

          <Route path="/cart">
            <Cart cart={cart} shoes={shoes} dispatch={dispatch} />
          </Route>

          <Route path="/checkout">
            <Checkout dispatch={dispatch} />
          </Route>

          <Route path="/confirmation">
            <Confirmation />
          </Route>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
