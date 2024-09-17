/// <reference types="Cypress" />

describe ('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')

  })
  it('Verifica o titulo da aplicação', function(){
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios e envia o formulário', function(){

    const longText = 'Almost finished... Almost finished... Almost finished... Almost finished... Almost finished... Almost finished... '

    cy.get('#firstName').type('Luhan').should('have.value', 'Luhan')
    cy.get('#lastName').type('Farah').should('have.value', 'Farah')
    cy.get('#email').type('luhan@teste.com').should('have.value', 'luhan@teste.com')

    cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText)

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function (){
    const longText = 'Almost finished... Almost finished... Almost finished... Almost finished... Almost finished... Almost finished... '

    cy.get('#firstName').type('Luhan')
    cy.get('#lastName').type('Farah')
    // cy.get('#email').type('luhan@teste.com')

    cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText)

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })  
  
  it('Valor não numérico digitado no campo do telefone', function (){
    
    cy.get('#phone').type('lkajsldajskd').should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

    cy.get('#firstName').type('Luhan')
    cy.get('#lastName').type('Farah')
    cy.get('#email').type('luhan@teste.com')
    cy.get('#phone-checkbox').click()

    cy.get('#open-text-area').type('teste')

    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){

    cy.get('#firstName').type('Luhan').should('have.value','Luhan')
      .clear().should('have.value', '')
    cy.get('#lastName').type('Farah').should('have.value','Farah')
      .clear().should('have.value', '')
    cy.get('#email').type('luhan@teste.com').should('have.value','luhan@teste.com')
      .clear().should('have.value', '') 
    cy.get('#phone').type('123456789').should('have.value', '123456789')
      .clear().should('have.value', '') 
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('Envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
    
  it('Seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#firstName').type('Luhan')
    cy.get('#lastName').type('Farah')
    cy.get('#email').type('luhan@teste.com')
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
    cy.get('#open-text-area').type('teste')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (Mentoria) por seu valor', function(){
    cy.get('#firstName').type('Luhan')
    cy.get('#lastName').type('Farah')
    cy.get('#email').type('luhan@teste.com')
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    cy.get('#open-text-area').type('teste')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })  

  it('Seleciona um produto (Blog) por seu índice', function(){
    cy.get('#firstName').type('Luhan')
    cy.get('#lastName').type('Farah')
    cy.get('#email').type('luhan@teste.com')
    cy.get('#product').select(1).should('have.value', 'blog')
    cy.get('#open-text-area').type('teste')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })  

  it('Marca o tipo de atendimento "Feedback"', function(){
    cy.get('#firstName').type('Luhan')
    cy.get('#lastName').type('Farah')
    cy.get('#email').type('luhan@teste.com')
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    cy.get('#open-text-area').type('teste')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })  

  it("Marca cada tipo de atendimento e valida", function(){
    
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })  

  it.only('Marca ambos checkboxes, depois desmarca o último', function(){

    //cy.get('input[type="checkbox"][value="email"]').check().should('have.value','feedback')
    cy.get('input[type="checkbox"]')
      .should('have.length', 2)
      .each(function($checkbox){
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')
      })
  })
  

})