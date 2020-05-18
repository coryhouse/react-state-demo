import React from "react";

export default function Footer() {
  return (
    <footer className="d-flex justify-content-stretch">
      <div className="crf-footer--category">
        <div className="container">
          <div className="row row d-md-flex justify-content-between flex-sm-column flex-lg-row">
            <div className="crf-footer--links active">
              <div className="crf-footer--header text-primary">
                Customer Support
              </div>
              <ul>
                <li>
                  <a href="/">Contact Us</a>
                </li>
                <li>
                  <a href="/">Order Tracker</a>
                </li>
                <li>
                  <a href="/">Returns &amp; Refunds</a>
                </li>
                <li>
                  <a href="/">Size Guide</a>
                </li>
                <li>
                  <a href="/">Store Locator</a>
                </li>
                <li>
                  <a href="/">Site Map</a>
                </li>
              </ul>
            </div>
            <div className="crf-footer--links">
              <div className="crf-footer--header text-primary">
                Privacy &amp; Terms
              </div>
              <ul>
                <li>
                  <a href="/">Privacy &amp; Security</a>
                </li>
                <li>
                  <a href="/">Statement</a>
                </li>
                <li>
                  <a href="/">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="crf-footer--logo d-flex">
        <div className="container justify-content-start align-items-center d-flex flex-column">
          <img
            src="https://www.pluralsight.com/content/dam/pluralsight2/teach/author-tools/carved-rock-fitness/logos/pluralsight-white.png"
            alt="Pluralsight logo"
          />
          <div>
            This site is created for demonstrative purposes only and does not
            offer any real products or services.
          </div>
        </div>
      </div>
      <div className="crf-footer--copyright text-primary">
        @Pluralsight 2018
      </div>
    </footer>
  );
}
