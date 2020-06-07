/// <reference types="cypress" />

context("Shoes", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should support filtering and clearing filter", () => {
    cy.findByLabelText("Filter by Size:").select("7");
    cy.findByText("Found 2 shoes");

    // Now clear filter
    cy.findByLabelText("Filter by Size:").select("All sizes");
    cy.findByRole("heading", { name: "Found" }).should("not.exist");
  });

  it("should find 3 shoes when filtering for size 8", () => {
    cy.findByLabelText("Filter by Size:").select("8");
    cy.findByText("Found 3 shoes");
  });
});
