import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";

// Declare static data outside the component to avoid needless recreation on each render.
const newAddress = {
  city: "",
  country: "",
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

export default function Checkout({ emptyCart }) {
  const [address, setAddress] = useState(newAddress);
  // Object with property for each field that has been touched.
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);

  // Derived state
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  function getErrors(address) {
    const errors = {};
    if (!address.city) errors.city = "City is required.";
    if (!address.country) errors.country = "Country is required.";
    return errors;
  }

  function handleChange(e) {
    e.persist();
    setAddress((curAddress) => {
      return {
        ...curAddress,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.id]: true });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      setStatus(STATUS.SUBMITTING);
      try {
        await saveShippingAddress(address);
        emptyCart();
        setStatus(STATUS.COMPLETED);
      } catch (err) {
        setSaveError(err);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) return <h1>Thanks for shopping!</h1>;

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
