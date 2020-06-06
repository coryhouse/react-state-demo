import React, { useEffect, useState } from "react";
import "./App.css";
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
  // Note, can call React.useState if you prefer
  // Build up state slowly. Start with const statusState = useState(); Then destructure just first element in array. Then 2nd.
  const [status, setStatus] = useState(STATUS.LOADING);
  const [shoes, setShoes] = useState([]);
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

  useEffect(() => {
    getShoes().then((shoes) => {
      setShoes(shoes);
      setStatus(STATUS.IDLE);
    });
  }, []);

  function addToCart(id, size) {
    if (!Number.isInteger(size)) throw new Error("Size must be a number");

    // Other callback form examples:

    // Toggle a boolean
    // const [toggled, setToggled] = useState(false);
    // setToggled((toggled) => !toggled);

    // Increase a counter
    // const [count, setCount] = useState(0);
    // setCount((count) => count + 1);

    setCart((cart) => {
      const alreadyInCart = cart.find((i) => i.id === id && i.size === size);
      if (alreadyInCart)
        return cart.map((i) => {
          const isMatchingItem = i.id === id && i.size === size;
          return isMatchingItem ? { ...i, quantity: i.quantity + 1 } : i;
        });
      return [...cart, { id, size, quantity: 1 }];
    });
    history.push("/cart");
  }

  // TODO show using Immer
  function updateCart(id, size, quantity) {
    if (!Number.isInteger(size)) throw new Error("Size must be a number");
    if (!Number.isInteger(quantity))
      throw new Error("Quantity must be a number");
    setCart((cart) => {
      if (quantity === 0) {
        // Keep items that have a different id, or have the same id, but a different size
        return cart.filter(
          (i) => i.id !== id || (i.id === id && i.size !== size)
        );
      }
      return cart.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
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
