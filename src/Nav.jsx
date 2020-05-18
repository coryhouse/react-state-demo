import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Nav({ cart }) {
  return (
    <nav className="navbar navbar-expand flex-column flex-md-row header-nav--nav">
      <div className="container">
        <div className="d-md-flex justify-content-between">
          <div className="navbar-brand d-flex justify-content-between align-items-center">
            <Link to="/">
              <img
                alt="Carved Rock Fitness"
                src="https://www.pluralsight.com/content/dam/pluralsight2/teach/author-tools/carved-rock-fitness/logos/carved-rock-logo.png"
              />
            </Link>{" "}
            <button
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              className="navbar-toggle"
              data-target="#navbarNav"
              data-toggle="collapse"
              type="button"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center align-items-center"
            id="navbarNav"
          >
            <div className="header-nav--main">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Clothing
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Footwear
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Equipment
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Bags &amp; Travel
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="header-nav--utilities d-flex align-items-center justify-content-end flex-row-reverse flex-row flex-md-row">
              <Link to="/cart">View Cart ({cart.length})</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
