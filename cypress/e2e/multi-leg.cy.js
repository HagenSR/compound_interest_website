/// <reference types="cypress" />

describe('multi leg tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/')
    })
  
      it('Attempt with two legs', () => {
        cy.get('[data-cy="principal-0"]').type("100000")
        cy.get('[data-cy="annual-addition-0"]').type("15000")
        cy.get('[data-cy="years-0"]').type("10")
        cy.get('[data-cy="interest-rate-0"]').type("10")
        cy.get('[data-cy="result-0"]').contains('Result: $498,435.62')
        cy.get('[data-cy="leg-add-0"]').click()
        cy.get('[data-cy="principal-1"]').find('input').should('have.value', '$498,435.62')
        cy.get('[data-cy="annual-addition-1"]').type("5001")
        cy.get('[data-cy="years-1"]').type("15")
        cy.get('[data-cy="interest-rate-1"]').type("17")
        cy.get('[data-cy="result-1"]').contains('Result: $5,533,480.85')
      })
  })
  