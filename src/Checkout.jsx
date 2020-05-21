import React, { useState } from "react";

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
  ERROR: "ERROR",
};

export default function Checkout() {
  // Point: When to split vs unify.
  // Tradeoff: unifying makes it easier to send to server, but slightly more work to update.
  const [shippingAddress, setShippingAddress] = useState(newAddress);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);

  // Show controlled vs uncontrolled form.
  function handleChange(e) {
    e.persist();
    setStatus(STATUS.DIRTY);
    setShippingAddress((curAddress) => {
      return { ...curAddress, [e.target.id]: e.target.value };
    });
  }

  // Returns true if the form is valid
  function validate() {
    const _errors = {};
    if (!shippingAddress.city) _errors.city = "City is required.";
    if (!shippingAddress.country) _errors.country = "Country is required.";
    setErrors(_errors);
    // Note that if I read from state after calling this, it won't work because set state is async.
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setStatus(STATUS.SUBMITTING);
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
