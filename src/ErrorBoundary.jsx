import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <h1>Oops! Something went wrong. Please try again.</h1>
    ) : (
      this.props.children
    );
  }
}
