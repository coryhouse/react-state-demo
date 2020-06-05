/// <reference types="cypress" />

function addShoeToCart(id, size) {
  cy.visit("/shoe/" + id);
  cy.findByRole("button", { name: "Add to cart" }).should("be.disabled");
  cy.findByLabelText("Select size").select(size);
  cy.findByRole("button", { name: "Add to cart" }).click();
}

context("ShoeDetail", () => {
  it("should support adding to cart after size is selected, then removing from cart", () => {
    addShoeToCart(1, "7");
    cy.findByRole("heading", { name: "1 Item in My Cart" });

    // Now, change quantity
    cy.findByRole("combobox", {
      name: "Select quantity for Hiker size 7",
    }).select("2");
    cy.findByRole("heading", { name: /2 Items in My Cart/ });

    // Now remove
    cy.findByRole("combobox", {
      name: "Select quantity for Hiker size 7",
    }).select("Remove");
    cy.findByRole("heading", { name: /Your cart is empty./ });
  });

  it("should increment the quantity in the cart when 'Add to cart' is clicked and the shoe is in the cart", () => {
    addShoeToCart(2, "8");
    cy.findByRole("heading", { name: "1 Item in My Cart" });
    cy.findByText("Continue Shopping").click();
    cy.findByText("Climber").click();
    addShoeToCart(2, "8");
    cy.findByRole("heading", { name: "2 Items in My Cart" });
    cy.findByRole("combobox", {
      name: "Select quantity for Climber size 8",
    }).should("have.value", "2");
  });

  it("should support adding the same shoe to the cart in different sizes, changing the quantity of each separately, and then support removing only one size of the same shoe", () => {
    addShoeToCart(3, "7");
    cy.findByRole("heading", { name: "1 Item in My Cart" });
    cy.findByText("Continue Shopping").click();
    cy.findByText("Explorer").click();
    addShoeToCart(3, "8");
    cy.findByRole("heading", { name: "2 Items in My Cart" });
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 7",
    }).should("have.value", "1");

    // Now change the quantity of each separately
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 7",
    }).select("3");
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 7",
    }).should("have.value", "3");
    cy.findByRole("heading", { name: "4 Items in My Cart" });
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 8",
    }).select("2");
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 8",
    }).should("have.value", "2");
    cy.findByRole("heading", { name: "5 Items in My Cart" });

    // Now remove just the size 8 shoe
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 8",
    }).select("Remove");
    cy.findByRole("heading", { name: "3 Items in My Cart" });

    // Assure the size 7 shoe's quantity hasn't been effected by removing the size 8 shoe.
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 7",
    }).should("have.value", "3");
  });
});
