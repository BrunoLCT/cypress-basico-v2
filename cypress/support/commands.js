Cypress.Commands.add('fillMandatoryFieldsAndSubimt', function () {
    cy.get('#firstName')
        .type('Bruno')
    cy.get('#lastName')
        .type('Trigueiro')
    cy.get('#email')
        .type('bruno.leo.ct@gmail.com')
    cy.get('#open-text-area')
        .type('Estou com diversas dúvidas sobre o conteúdo apresentado neste curso.')
    cy.get('.button[type="submit"]') //pegar o button que possui o type "submit"
        .click()
})