import React, { useState, useRef } from "react";
import { saveShippingAddress } from "./services/shippingService";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

export default function Checkout({ emptyCart }) {
  const cityRef = useRef();
  const countryRef = useRef();

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);

  // Derived state
  const isValid = Object.keys(errors).length === 0;

  function getErrors(address) {
    const result = {};
    if (!address.city) result.city = "City is required.";
    if (!address.country) result.country = "Country is required.";
    setErrors(result);
    return result;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const address = {
      city: cityRef.current.value,
      country: countryRef.current.value,
    };
    const result = getErrors(address);
    setStatus(STATUS.SUBMITTING);
    // Have to do this here because state updates are async, so can't rely on reading state here.
    if (Object.keys(result).length === 0) {
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
