/// <reference types="cypress" />

context('Edit Profile', () => {
    before(() => {
      cy.visit('54.253.214.197:8081')
    })

    it('Login', () => {
      cy.get('#username')
        .type('ubiquity').should('have.value', 'ubiquity')
      cy.get('#password')
        .type("P@ss123#UbiQuity")
      cy.get('.submit').click()
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
    })

    it('Edit Profile', () => {
      cy.contains('Edit Profile').click()
      cy.location().should((location) => {
        expect(location.href).to.eq('http://54.253.214.197:8081/editprofile')
      })
      

      cy.get('.email').type('{selectall}Csabi1996@windowslive.com')
      
      cy.get('.date').type('{selectall}22/12/1996')

      cy.get('[type=Password]').eq(0).type('newPassword')
        cy.get('[type=Password]').eq(1).type('newPassword')
        
      cy.get('.submit').click()
      cy.contains('Update is successful').should('be.visible')
      cy.contains('Home').click()
    })

    it('Check Profile for edits', () => {
        cy.contains('Edit Profile').click()
        
        cy.get('.email').should('Csabi1996@windowslive.com')
        cy.get('.mobilenumber').should('02102643641')
        cy.get('.date').should('22/12/1996')
      })
});