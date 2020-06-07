/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add a shoe to the cart
     * @example
     * cy.addToCart(id, size)
     */
    addToCart(id: number, size: number): Chainable<any>;
  }
}
