/// <reference types="cypress" />

context("Checkout", () => {
  it("should validate and support checkout", () => {
    cy.addToCart(1, 7);
    cy.findByRole("button", { name: "Checkout" }).click();
    cy.findByLabelText("City").focus().blur();
    cy.findByText("City is required.");
    cy.findByLabelText("Country").focus().blur();
    cy.findByText("Country is required.");
    cy.findByRole("button", { name: "Submit" }).click();

    // Now error summary at top should display
    cy.findByText("Please fix the following errors:");

    // Now populate form and errors should disappear:
    cy.findByLabelText("City").type("a");
    cy.findByLabelText("Country").select("China");
    cy.findByText("City is required.").should("not.exist");
    cy.findByText("Country is required.").should("not.exist");

    // Now should submit successfully since form is completed.
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("heading", { name: "Thanks for shopping!" });
  });
});
