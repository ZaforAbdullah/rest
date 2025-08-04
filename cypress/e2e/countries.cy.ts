/// <reference types="cypress" />

describe('Countries Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/independent*', { fixture: 'countries.json' }).as('getCountries')
    cy.visit('/')
  })

  it('should display skeletons while loading', () => {
    cy.get('[data-testid="skeleton-card"]').should('exist')
  })

  it('should load and display country list', () => {
    cy.wait('@getCountries')
    cy.contains('Bangladesh').should('exist')
    cy.contains('India').should('exist')
    cy.contains('Nepal').should('exist')
  })

  it('should navigate to country details page', () => {
    cy.wait('@getCountries')
    cy.contains('Bangladesh').click()
    cy.url().should('include', '/country/BGD')
    cy.contains("People's Republic of Bangladesh").should('exist')
  })

  it('should handle search input', () => {
    cy.wait('@getCountries')
    cy.get('input[aria-label="Search countries by name"]').type('India')

    cy.contains('India').should('exist')
    cy.contains('Bangladesh').should('not.exist')
    cy.contains('Nepal').should('not.exist')
  })
})
