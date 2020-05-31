import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header({ cart }) {
  return (
    <header>
      <nav>
        <Link to="/">
          <img alt="Carved Rock Fitness" src="/images/logo.png" />
        </Link>
        <ul>
          <li>
            <NavLink to="/">Footwear</NavLink>
          </li>
          <li>
            <NavLink to="/bags">Bags</NavLink>
          </li>
          <li>
            <Link to="/cart">View Cart ({cart.length})</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
