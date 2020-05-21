import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Declare static data outside the component to avoid needless recreation on each render.
// Challenge: Finish building out the checkout with credit card, billing address, totals.
const newAddress = {
  city: "",
  country: "",
};

const STATUS = {
  IDLE: "IDLE",
  DIRTY: "DIRTY",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
};

export default function Checkout() {
  const history = useHistory();
  // Point: When to split vs unify.
  // Tradeoff: unifying makes it easier to send to server, but slightly more work to update.
  const [shippingAddress, setShippingAddress] = useState(newAddress);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);

  // Show controlled vs uncontrolled form.
  function handleChange(e) {
    e.persist();
    if (status === STATUS.IDLE) setStatus(STATUS.DIRTY);
    // Using callback form of setter here since we need the existing state
    setShippingAddress((curAddress) => {
      // Note that we're storing the new data here and passing to validate. Otherwise, validate would use stale data since setting state is async.
      const updatedAddress = { ...curAddress, [e.target.id]: e.target.value };
      if (status === STATUS.SUBMITTED) validate(updatedAddress);
      return updatedAddress;
    });
  }

  // Returns true if the form is valid
  function validate(address) {
    const _errors = {};
    if (!address.city) _errors.city = "City is required.";
    if (!address.country) _errors.country = "Country is required.";
    setErrors(_errors);
    // Note that if I read from state after calling this, it won't work because set state is async.
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate(shippingAddress);
    if (isValid) {
      setStatus(STATUS.SUBMITTING);
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  const errorsExist = Object.keys(errors).length > 0;

  return (
    <>
      <h1>Shipping Info</h1>
      {errorsExist && (
        <ul>
          {Object.keys(errors).map((key) => {
            return <li>{errors[key]}</li>;
          })}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={shippingAddress.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={shippingAddress.country}
            onChange={handleChange}
          >
            <option>Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingodom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={errorsExist}
          />
        </div>
      </form>
    </>
  );
}
