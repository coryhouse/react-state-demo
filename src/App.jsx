import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";

function App() {
  // Note, can call React.useState if you prefer
  // Build up state slowly. Start with const statusState = useState(); Then destructure just first element in array. Then 2nd.
  // Pass func so it's only called once. (even though the initial value is only used on the first render, the function which initializes it still gets called))
  //https://stackoverflow.com/questions/58539813/lazy-initial-state-where-to-use-it
  // and https://dmitripavlutin.com/react-usestate-hook-guide/#3-lazy-initialization-of-state
  // Or, can use https://www.npmjs.com/package/@rehooks/local-storage which syncs between tabs

  return (
    <>
      <div className="content">
        <Header />

        <main>
          <Switch>
            <Route path="/" exact>
              <h1>Welcome to Carved Rock Fitness</h1>
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route
              path="/checkout"
              render={(reactRouterProps) => <Checkout {...reactRouterProps} />}
            />

            <Route path="/confirmation">
              <Confirmation />
            </Route>

            <Route path="/:category" exact>
              <Products />
            </Route>

            <Route path="/:category/:id">
              <Detail />
            </Route>
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
