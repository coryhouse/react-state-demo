import React, { useEffect, useState } from "react";
import "./main.css";
import Footer from "./Footer";
import Nav from "./Nav";
import Home from "./Home";
import { Route, useHistory } from "react-router-dom";
import ShoeDetail from "./ShoeDetail";
import { getShoes } from "./services/shoeApi";
import Cart from "./Cart";

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

  useEffect(() => {
    getShoes().then((response) => {
      setShoes(response);
      setStatus(STATUS.IDLE);
    });
  }, []);

  function addToCart(id, size) {
    setCart((cart) => {
      const alreadyInCart = cart.find((s) => s.id === id && s.size === size);
      const newCart = alreadyInCart
        ? cart.map((c) =>
            c.id === id ? { ...c, quantity: c.quantity + 1 } : c
          )
        : [...cart, { id, size, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    history.push("/cart");
  }

  function handleCartQuantityChange(id, size, quantity) {
    setCart((cart) => {
      const newCart =
        quantity === 0
          ? cart.filter((c) => c.id !== id)
          : cart.map((c) => (c.id === id ? { ...c, quantity } : c));
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  }

  if (status === STATUS.LOADING) return "Loading...";

  return (
    <div className="crf">
      <Nav cart={cart} />

      <main>
        <Route path="/" exact>
          <Home shoes={shoes} />
        </Route>

        <Route path="/shoe/:id">
          <ShoeDetail cart={cart} shoes={shoes} addToCart={addToCart} />
        </Route>

        <Route path="/cart">
          <Cart
            cart={cart}
            shoes={shoes}
            onQuantityChange={handleCartQuantityChange}
          />
        </Route>
      </main>

      <Footer />
    </div>
  );
}

export default App;
