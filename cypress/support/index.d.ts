/// <reference types="cypress" />
// As mentioned here: https://docs.cypress.io/api/cypress-api/custom-commands.html#5-Write-TypeScript-definitions
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
