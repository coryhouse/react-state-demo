import React from "react";
import { Link, NavLink } from "react-router-dom";

const activeStyle = {
  color: "purple",
};

export default function Header({ cart }) {
  return (
    <header>
      <nav>
        <Link to="/">
          <img alt="Carved Rock Fitness" src="/images/logo.png" />
        </Link>
        <ul>
          <li>
            <NavLink activeStyle={activeStyle} to="/shoes">
              Shoes
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/kayaks">Kayaks</NavLink>
          </li> */}
          <li>
            <Link to="/cart">View Cart ({cart.length})</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
