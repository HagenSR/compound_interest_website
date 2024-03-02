/// <reference types="cypress" />

describe('multi sim multi leg tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/')
    })
  
      it('Attempt with two legs', () => {
        cy.get('[data-cy="principal-0"]').type("1")
        cy.get('[data-cy="annual-addition-0"]').type("1")
        cy.get('[data-cy="years-0"]').type("3")
        cy.get('[data-cy="interest-rate-0"]').type("1")
        cy.get('[data-cy="result-0"]').contains('Result: $4.06')
        cy.get('[data-cy="leg-add-0"]').click()

        cy.get('[data-cy="principal-1"]').find('input').should('have.value', '$4.06')
        cy.get('[data-cy="annual-addition-1"]').type("2")
        cy.get('[data-cy="years-1"]').type("2")
        cy.get('[data-cy="interest-rate-1"]').type("2")
        cy.get('[data-cy="result-1"]').contains('Result: $8.26')
        cy.get('[data-cy="leg-add-0"]').click()

        cy.get('[data-cy="principal-2"]').find('input').should('have.value', '$8.26')
        cy.get('[data-cy="annual-addition-2"]').type("7")
        cy.get('[data-cy="years-2"]').type("7")
        cy.get('[data-cy="interest-rate-2"]').type("7")
        cy.get('[data-cy="result-2"]').contains('Result: $73.84')

        cy.get('[data-cy="simulation-add"]').click()

        cy.get('[data-cy="principal-3"]').type("2")
        cy.get('[data-cy="annual-addition-3"]').type("2")
        cy.get('[data-cy="years-3"]').type("2")
        cy.get('[data-cy="interest-rate-3"]').type("2")
        cy.get('[data-cy="result-3"]').contains('Result: $6.12')
        cy.get('[data-cy="leg-add-1"]').click()

        cy.get('[data-cy="principal-4"]').find('input').should('have.value', '$6.12')
        cy.get('[data-cy="annual-addition-4"]').type("3")
        cy.get('[data-cy="years-4"]').type("3")
        cy.get('[data-cy="interest-rate-4"]').type("3")
        cy.get('[data-cy="result-4"]').contains('Result: $15.96')
      })
  })
  