/// <reference types="cypress" />

describe('Country Details Page', () => {
  beforeEach(() => {
    cy.visit('/')

    // Wait for country cards to render and click the first available one
    cy.get('[data-testid^="country-card-"]', { timeout: 10000 }).first().click()

    // Ensure the country details page has loaded (check for official name or flag image)
    cy.get('h1', { timeout: 10000 }).should('exist')
  })

  it('should display country details', () => {
    cy.get('h1').should('exist')
    cy.get('img').should('be.visible')
    cy.contains(/Region|Subregion|Capital|Population/).should('exist')
  })

  it('should display border countries if available', () => {
    cy.get('[data-testid="border-countries"]', { timeout: 10000 }).should('exist')
  })

  it('should handle missing borders gracefully', () => {
    cy.get('[data-testid="border-countries"]', { timeout: 10000 })
      .should('exist')
      .then(($container) => {
        const links = $container.find('a[data-testid^="border-country-"]')
        if (links.length === 0) {
          cy.log('No border countries — container is empty as expected.')
          expect($container).to.be.empty
        } else {
          cy.wrap(links).should('have.length.greaterThan', 0)
        }
      })
  })

  it('should navigate back using back button', () => {
    cy.get('[aria-label="Go back"]').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
