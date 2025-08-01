// cypress/support/e2e.ts

/// <reference types="cypress" />
// Import commands.js using ES2015 syntax:
// import './commands';

// Runs before each test file
beforeEach(() => {
  // Example: clear cookies or local storage before each test, if needed
  cy.clearCookies()
  cy.clearLocalStorage()
})

// Handle uncaught exceptions (optional, depending on your needs)
// @ts-expect-error - Cypress namespace used as value for event handling
Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from failing the test
  return false
})
