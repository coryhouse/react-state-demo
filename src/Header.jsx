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
            <NavLink to="/">Bags &amp; Travel</NavLink>
          </li>
        </ul>
        <Link to="/cart">View Cart ({cart.length})</Link>
      </nav>
    </header>
  );
}
