Cypress._.times(3, () => {// com o "Cypress._.times(3, () => {})" o teste dentro dessa função é executado 3 vezes, por exemplo.
    it('testa a página da política de privacidade de forma independente', function () {

        cy.visit('./src/privacy.html')
            .contains('Talking About Testing')
            .should('be.visible')
    })
})

