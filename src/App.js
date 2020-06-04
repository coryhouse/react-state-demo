import React, { useEffect, useState } from "react";
import "./main.css";
import Footer from "./Footer";
import Header from "./Header";
import Shoes from "./Shoes";
import { Route, useHistory } from "react-router-dom";
import ShoeDetail from "./ShoeDetail";
import { getShoes } from "./services/shoeApi";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";

const STATUS = {
  LOADING: "LOADING",
  IDLE: "IDLE",
};

function App() {
  const history = useHistory();
  const [status, setStatus] = useState(STATUS.LOADING);
  const [shoes, setShoes] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );

  // Persist cart to localstorage when it changes
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  useEffect(() => {
    getShoes().then((shoes) => {
      setShoes(shoes);
      setStatus(STATUS.IDLE);
    });
  }, []);

  function addToCart(id, size) {
    if (!Number.isInteger(size)) throw new Error("Size must be a number");
    setCart((cart) => {
      const alreadyInCart = cart.find((s) => s.id === id && s.size === size);
      return alreadyInCart
        ? cart.map((c) =>
            c.id === id && c.size === size
              ? { ...c, quantity: c.quantity + 1 }
              : c
          )
        : [...cart, { id, size, quantity: 1 }];
    });
    history.push("/cart");
  }

  // TODO show using Immer
  function updateCart(id, size, quantity) {
    if (!Number.isInteger(size)) throw new Error("Size must be a number");
    if (!Number.isInteger(quantity))
      throw new Error("Quantity must be a number");
    setCart((cart) => {
      return quantity === 0
        ? cart.filter((c) => c.id !== id)
        : cart.map((c) =>
            c.id === id && c.size === size ? { ...c, quantity } : c
          );
    });
  }

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
            <ShoeDetail cart={cart} shoes={shoes} addToCart={addToCart} />
          </Route>

          <Route path="/cart">
            <Cart cart={cart} shoes={shoes} updateCart={updateCart} />
          </Route>

          <Route path="/checkout">
            <Checkout emptyCart={() => setCart([])} />
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
