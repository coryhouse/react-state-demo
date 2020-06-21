import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, useHistory, Switch } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";

function App() {
  const history = useHistory();
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
    history.push("/cart");
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

  return (
    <>
      <div className="content">
        <Header cart={cart} />

        <main>
          <Switch>
            <Route path="/" exact>
              Home
            </Route>

            <Route path="/cart">
              <Cart cart={cart} updateCart={updateCart} />
            </Route>

            <Route
              path="/checkout"
              render={(reactRouterProps) => (
                <Checkout emptyCart={() => setCart([])} {...reactRouterProps} />
              )}
            />

            <Route path="/confirmation">
              <Confirmation />
            </Route>

            <Route path="/:category" exact>
              <Products />
            </Route>

            <Route path="/:category/:id">
              <Detail cart={cart} addToCart={addToCart} />
            </Route>
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
