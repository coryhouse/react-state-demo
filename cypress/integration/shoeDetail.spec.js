/// <reference types="cypress" />

function setQty(name, size, qty) {
  return cy
    .findByRole("combobox", {
      name: `Select quantity for ${name} size ${size}`,
    })
    .select(qty.toString());
}

function checkHead(name) {
  cy.findByRole("heading", { name });
}

context("ShoeDetail", () => {
  it("should support adding to cart after size is selected, then removing from cart", () => {
    cy.addToCart(1, 7);
    checkHead("1 Item in My Cart");

    // Now, change quantity
    setQty("Hiker", 7, 2);
    checkHead("2 Items in My Cart");

    // Now remove
    setQty("Hiker", 7, "Remove");
    checkHead("Your cart is empty.");
  });

  it("should increment the quantity in the cart when 'Add to cart' is clicked and the shoe is in the cart", () => {
    cy.addToCart(2, 8);
    checkHead("1 Item in My Cart");
    cy.findByText("Continue Shopping").click();
    cy.findByText("Climber").click();
    cy.addToCart(2, 8);
    checkHead("2 Items in My Cart");
    cy.findByRole("combobox", {
      name: "Select quantity for Climber size 8",
    }).should("have.value", "2");
  });

  it("should support adding the same shoe to the cart in different sizes, changing the quantity of each separately, and then support removing only one size of the same shoe", () => {
    cy.addToCart(3, 7);
    checkHead("1 Item in My Cart");
    cy.findByText("Continue Shopping").click();
    cy.findByText("Explorer").click();
    cy.addToCart(3, 8);
    checkHead("2 Items in My Cart");
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 7",
    }).should("have.value", "1");

    // Now change the quantity of each separately
    setQty("Explorer", 7, 3);
    setQty("Explorer", 7, 3);
    checkHead("4 Items in My Cart");
    setQty("Explorer", 8, 2);
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 8",
    }).should("have.value", "2");
    checkHead("5 Items in My Cart");

    // Now remove just the size 8 shoe
    setQty("Explorer", 8, "Remove");
    checkHead("3 Items in My Cart");

    // Assure the size 7 shoe's quantity hasn't been effected by removing the size 8 shoe.
    cy.findByRole("combobox", {
      name: "Select quantity for Explorer size 7",
    }).should("have.value", "3");
  });
});
