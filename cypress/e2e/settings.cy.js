/// <reference types="cypress" />


describe('Settings tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('About works', () => {
    cy.get('[data-cy="about-button"]').click()
    cy.get('[data-cy="about-modal"]').should('exist')
  })

  it('Add and reset simulation works', () => {
    cy.get('[data-cy="simulation-1"]').should('not.exist')
    cy.get('[data-cy="simulation-add"]').click()
    cy.get('[data-cy="simulation-1"]').should('exist')
    cy.get('[data-cy="simulation-reset"]').click()
    cy.get('[data-cy="simulation-1"]').should('not.exist')
  })
})
