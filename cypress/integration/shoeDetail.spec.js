/// <reference types="cypress" />

context("ShoeDetail", () => {
  it("should support adding to cart after size is selected, then removing from cart", () => {
    cy.visit("/shoe/1");
    cy.findByRole("button", { name: "Add to cart" }).should("be.disabled");
    cy.findByLabelText("Select size").select("7");
    cy.findByRole("button", { name: "Add to cart" }).click();
    cy.findByRole("heading", { name: "1 Item in My Cart" });

    // Now, change quantity
    cy.findByRole("combobox", {
      name: "Select quantity for Hiker size 7",
    }).select("2");
    cy.findByRole("heading", { name: /2 Item s in My Cart/ });

    // Now remove
    cy.findByRole("combobox", {
      name: "Select quantity for Hiker size 7",
    }).select("Remove");
    cy.findByRole("heading", { name: /Your cart is empty./ });
  });
});
