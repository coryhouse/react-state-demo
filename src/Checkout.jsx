import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "./services/shippingService";

// Declare static data outside the component to avoid needless recreation on each render.
// Challenge: Finish building out the checkout with credit card, billing address, totals.

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
};

export default function Checkout({ emptyCart }) {
  const history = useHistory();
  const cityRef = useRef();
  const countryRef = useRef();

  // Point: When to split vs unify state.
  // Tradeoff: unifying makes it easier to send to server, but slightly more work to update.
  const [errors, setErrors] = useState({});
  // Object with property for each field that has been touched.
  const [status, setStatus] = useState(STATUS.IDLE);

  // Derived state
  const isValid = () => Object.keys(errors).length === 0;

  function getErrors(address) {
    const _errors = {};
    if (!address.city) _errors.city = "City is required.";
    if (!address.country) _errors.country = "Country is required.";
    setErrors(_errors);
    return _errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const address = {
      city: cityRef.current.value,
      country: countryRef.current.value,
    };
    const errors = getErrors(address);

    // Have to do this here because state updates are async, so can't rely on reading state here.
    if (Object.keys(errors).length === 0) {
      setStatus(STATUS.SUBMITTING);
      await saveShippingAddress(address);
      emptyCart();
      history.push("/confirmation");
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid() && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input ref={cityRef} id="city" type="text" />

          <p role="alert">{status === STATUS.SUBMITTED && errors.city}</p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select ref={countryRef} id="country" defaultValue="USA">
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingodom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>

          <p role="alert">{status === STATUS.SUBMITTED && errors.country}</p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
