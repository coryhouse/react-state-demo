import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "./services/shippingApi";

// Declare static data outside the component to avoid needless recreation on each render.
// Challenge: Finish building out the checkout with credit card, billing address, totals.
const newAddress = {
  city: "",
  country: "",
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
};

export default function Checkout({ emptyCart }) {
  const history = useHistory();
  // Point: When to split vs unify state.
  // Tradeoff: unifying makes it easier to send to server, but slightly more work to update.
  const [address, setAddress] = useState(newAddress);
  // Object with property for each field that has been touched.
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);

  // Derived state
  const dirty = address !== newAddress;
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  // Show controlled vs uncontrolled form.
  function handleChange(e) {
    e.persist();
    // Using callback form of setter here since we need the existing state
    setAddress((curAddress) => {
      // Note that we're storing the new data here and passing to validate. Otherwise, validate would use stale data since setting state is async.
      const updatedAddress = {
        ...curAddress,
        [e.target.id]: e.target.value,
      };
      return updatedAddress;
    });
  }

  function getErrors(address) {
    const errors = {};
    if (!address.city) errors.city = "City is required.";
    if (!address.country) errors.country = "Country is required.";
    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isValid) {
      setStatus(STATUS.SUBMITTING);
      await saveShippingAddress(address);
      emptyCart();
      history.push("/confirmation");
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function handleBlur(event) {
    setTouched((t) => ({ ...t, [event.target.id]: true }));
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
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
          <input
            id="city"
            type="text"
            onBlur={handleBlur}
            value={address.city}
            onChange={handleChange}
          />

          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            onBlur={handleBlur}
            id="country"
            value={address.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingodom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>

          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
          </p>
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
