import React, { useEffect, useReducer } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import cartReducer from "./cartReducer";

function App() {
  const [cart, dispatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart")) ?? []
  );

  // Persist cart in localStorage
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    <>
      <div className="content">
        <Header cart={cart} />

        <main>
          <Switch>
            <Route path="/" exact>
              <h1>Welcome to Carved Rock Fitness</h1>
            </Route>

            <Route path="/cart">
              <Cart cart={cart} dispatch={dispatch} />
            </Route>

            <Route path="/checkout">
              <Checkout dispatch={dispatch} />
            </Route>

            <Route path="/confirmation">
              <Confirmation />
            </Route>

            <Route path="/:category" exact>
              <Products />
            </Route>

            <Route path="/:category/:id">
              <Detail cart={cart} dispatch={dispatch} />
            </Route>
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
