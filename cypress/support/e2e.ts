// cypress/support/e2e.ts

// Import commands.js using ES2015 syntax:
// import './commands';

// Runs before each test file
beforeEach(() => {
    // Example: clear cookies or local storage before each test, if needed
    cy.clearCookies();
    cy.clearLocalStorage();
});

// Handle uncaught exceptions (optional, depending on your needs)
Cypress.on('uncaught:exception', (err) => {
    // returning false here prevents Cypress from failing the test
    return false;
});
