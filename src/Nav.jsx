import React from "react";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand flex-column flex-md-row header-nav--nav">
      <div className="container">
        <div className="d-md-flex justify-content-between">
          <div className="navbar-brand d-flex justify-content-between align-items-center">
            <a href="#">
              <img
                alt="Carved Rock Fitness"
                src="https://www.pluralsight.com/content/dam/pluralsight2/teach/author-tools/carved-rock-fitness/logos/carved-rock-logo.png"
              />
            </a>{" "}
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
                  <a className="nav-link" href="#">
                    Clothing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Footwear
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Equipment
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Bags &amp; Travel
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Trail Reviews
                  </a>
                </li>
              </ul>
            </div>
            <div className="header-nav--utilities d-flex align-items-center justify-content-end flex-row-reverse flex-row flex-md-row">
              <div className="account d-flex flex-column">
                John Doe <a href="#">Log Out</a>
              </div>
              <div className="image">
                <img
                  alt="John Doe"
                  src="https://www.pluralsight.com/content/dam/pluralsight2/teach/author-tools/carved-rock-fitness/profile-pic.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
