Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Luhan')
    cy.get('#lastName').type('Farah')
    cy.get('#email').type('luhan@teste.com')
    cy.get('#open-text-area').type('teste')

    cy.contains('button', 'Enviar').click()
    
})