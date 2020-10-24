/// <reference types="cypress" />

context('Case Test', () => {
    before(() => {
      //Visit site at start of testing
      cy.visit('54.253.214.197:8081')
    })

    it('Login', () => {

      //Enter Username
      cy.get('#username')
        .type('ubiquity').should('have.value', 'ubiquity')

      //Enter Password
      cy.get('#password')
        .type('P@ss123#UbiQuity')
      
      //Click Submit
      cy.get('.submit').click()
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })

      //Check if loging in takes user to the landing page
      cy.location().should((location) => {
        expect(location.href).to.eq('http://54.253.214.197:8081/landing?username=ubiquity&password=P%40ss123%23UbiQuity')
      })

    })

    it('Edit Profile', () => {
      //Check for Edit Profile and click if its there
      cy.contains('Edit Profile').click()

      //Check if Edit Profile button takes us to the edit profile page
      cy.location().should((location) => {
        expect(location.href).to.eq('http://54.253.214.197:8081/editprofile')
      })
      
      //Type in new email
      cy.get('.email').type('{selectall}Csabi1996@windowslive.com')
      
      //Type in new date of birth
      cy.get('.date').type('{selectall}22/12/1996')

      //Type in new password
      cy.get('[type=Password]').eq(0).type('newPassword')
      cy.get('[type=Password]').eq(1).type('newPassword')
        
      //Click Submit
      cy.get('.submit').click()

      //Check for Update is successful message
      cy.contains('Update is successful').should('be.visible')

      //Go back to landing page
      cy.contains('Home').click()
    })

    it('Check Profile for edits', () => {
        //Check for Edit Profile and click if its there
        cy.contains('Edit Profile').click()
        
        //Check if email contains new email
        cy.get('.email').should('Csabi1996@windowslive.com')

        //Check if date of birth contains new date of birth
        cy.get('.date').should('22/12/1996')
      })
});

context('New Password Test', () => {
  before(() => {
    //Visit site at start of testing
    cy.visit('54.253.214.197:8081')
  })

  it('Login', () => {

    //Enter Username
    cy.get('#username')
      .type('ubiquity').should('have.value', 'ubiquity')

    //Enter Password
    cy.get('#password')
      .type('newPassword')
    
    //Click Submit
    cy.get('.submit').click()
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

    //Check if loging in takes user to the landing page
    cy.location().should((location) => {
      expect(location.href).to.eq('http://54.253.214.197:8081/landing?username=ubiquity&password=P%40ss123%23UbiQuity')
    })
  })
});