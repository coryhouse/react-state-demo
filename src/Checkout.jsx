import React from "react";
import { saveShippingAddress } from "./services/shippingService";

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

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: newAddress,
      touched: {},
      status: STATUS.IDLE,
    };
  }

  // Derived state
  errors = () => this.getErrors(this.state.address);
  isValid = () => Object.keys(this.errors()).length === 0;

  // Show controlled vs uncontrolled form.
  handleChange = (e) => {
    e.persist();
    // Using callback form of setter here since we need the existing state
    this.setState((curState) => {
      // Note that we're storing the new data here and passing to validate. Otherwise, validate would use stale data since setting state is async.
      const address = {
        ...curState.address,
        [e.target.id]: e.target.value,
      };
      return { address };
    });
  };

  getErrors(address) {
    const errors = {};
    if (!address.city) errors.city = "City is required.";
    if (!address.country) errors.country = "Country is required.";
    return errors;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ status: STATUS.SUBMITTING });
      await saveShippingAddress(this.state.address);
      this.props.emptyCart();
      this.props.history.push("/confirmation");
    } else {
      this.setState({ status: STATUS.SUBMITTED });
    }
  };

  handleBlur = (event) => {
    event.persist();
    this.setState((curState) => {
      return {
        touched: {
          ...curState.touched,
          [event.target.id]: true,
        },
      };
    });
  };

  render() {
    const errors = this.errors();
    const { address, touched, status } = this.state;

    return (
      <>
        <h1>Shipping Info</h1>
        {!this.isValid() && this.state.status === STATUS.SUBMITTED && (
          <div role="alert">
            <p>Please fix the following errors:</p>
            <ul>
              {Object.keys(errors).map((key) => (
                <li key={key}>{errors[key]}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="city">City</label>
            <br />
            <input
              id="city"
              type="text"
              onBlur={this.handleBlur}
              value={address.city}
              onChange={this.handleChange}
            />

            <p role="alert">
              {(touched.city || status === STATUS.SUBMITTED) && errors.city}
            </p>
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <br />
            <select
              onBlur={this.handleBlur}
              id="country"
              value={address.country}
              onChange={this.handleChange}
            >
              <option>Select Country</option>
              <option value="China">China</option>
              <option value="India">India</option>
              <option value="United Kingodom">United Kingdom</option>
              <option value="USA">USA</option>
            </select>

            <p role="alert">
              {(touched.country || status === STATUS.SUBMITTED) &&
                errors.country}
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
}
