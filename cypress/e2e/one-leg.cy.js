/// <reference types="cypress" />


describe('One leg tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/')
    })
  
    it('Starts empty', () => {
      
      cy.get('[data-cy="principal-0"]').find('input').should('be.empty')
      cy.get('[data-cy="annual-addition-0"]').find('input').should('be.empty')
      cy.get('[data-cy="years-0"]').find('input').should('be.empty')
      cy.get('[data-cy="interest-rate-0"]').find('input').should('be.empty')
      cy.get('[data-cy="result-0"]').contains('Result:')
    })

    it('Simple calculation', () => {
        cy.get('[data-cy="chart"]').should('not.exist')
        cy.get('[data-cy="principal-0"]').type("100")
        cy.get('[data-cy="annual-addition-0"]').type("100")
        cy.get('[data-cy="years-0"]').type("5")
        cy.get('[data-cy="interest-rate-0"]').type("0")
        cy.get('[data-cy="result-0"]').contains('Result: $600.00')
        cy.get('[data-cy="chart"]').should('exist')
      })

      it('With Interest calculation', () => {
        cy.get('[data-cy="principal-0"]').type("100")
        cy.get('[data-cy="annual-addition-0"]').type("100")
        cy.get('[data-cy="years-0"]').type("5")
        cy.get('[data-cy="interest-rate-0"]').type("10")
        cy.get('[data-cy="result-0"]').contains('Result: $771.56')
      })

      it('Another Interest calculation', () => {
        cy.get('[data-cy="principal-0"]').type("10000")
        cy.get('[data-cy="annual-addition-0"]').type("7345")
        cy.get('[data-cy="years-0"]').type("20")
        cy.get('[data-cy="interest-rate-0"]').type("10")
        cy.get('[data-cy="result-0"]').contains('Result: $487,959.87')
      })
  })
  