/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Bruno')
            .should('have.value', 'Bruno')
        cy.get('#lastName')
            .should('be.visible')
            .type('Trigueiro')
            .should('have.value', 'Trigueiro')
        cy.get('#email')
            .should('be.visible')
            .type('bruno@gmail.com')
            .should('have.value', 'bruno@gmail.com')
        cy.get('#phone')
            .should('be.visible')
            .type('85994070718')
            .should('have.value', '85994070718')
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Estou com diversas dúvidas sobre o conteúdo apresentado neste curso.')
            .should('have.value', 'Estou com diversas dúvidas sobre o conteúdo apresentado neste curso.')
        cy.get('.button[type="submit"]') //pegar o button que possui o type "submit"
            .should('be.visible')
            .click()
        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com e-mail inválido', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Bruno')
            .should('have.value', 'Bruno')
        cy.get('#lastName')
            .should('be.visible')
            .type('Trigueiro')
            .should('have.value', 'Trigueiro')
        cy.get('#email')
            .should('be.visible')
            .type('bruno.leo.ct@gmail,com')

        cy.get('#phone')
            .should('be.visible')
            .type('85994070718')
            .should('have.value', '85994070718')
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Estou com diversas dúvidas sobre o conteúdo apresentado neste curso.')
            .should('have.value', 'Estou com diversas dúvidas sobre o conteúdo apresentado neste curso.')
        cy.get('.button[type="submit"]') //pegar o button que possui o type "submit"
            .should('be.visible')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('verificar retorno vazio ao digitar um valor ñ numérico no campo "telefone"', function () {
        cy.get('#phone')
            .type('bruno')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName')
            .should('be.visible')
            .type('Bruno')
            .should('have.value', 'Bruno')
        cy.get('#lastName')
            .should('be.visible')
            .type('Trigueiro')
            .should('have.value', 'Trigueiro')
        cy.get('#email')
            .should('be.visible')
            .type('bruno@gmail.com')
            .should('have.value', 'bruno@gmail.com')
        cy.get('#phone-checkbox')
            .check()
            .should('be.checked')
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Estou com diversas dúvidas sobre o conteúdo apresentado neste curso.')
            .should('have.value', 'Estou com diversas dúvidas sobre o conteúdo apresentado neste curso.')
        cy.get('.button[type="submit"]') //pegar o button que possui o type "submit"
            .should('be.visible')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function () {
        cy.contains('button', 'Enviar') //pegar o button(botão) que possui o "Enviar"
            .should('be.visible')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubimt() //preencha os campos mandatórios e os submetes.
        cy.get('.success')
            .should('be.visible')
    })

    it('Selecionar o produto "Youtube" pelo seu texto', function () {

        cy.get('#product')
            .select('YouTube') //capturando o produto usando o select (texto).
            .should('have.value', 'youtube')
    })

    it('Selecione o produtos "mentoria" pelo seu valor', function () {

        cy.get('#product')
            .select('mentoria') //capturando o produto usando o select (value).
            .should('have.value', 'mentoria')
    })

    it('Selecione o produto "Blog" pelo seu índice', function () {
        cy.get('#product')
            .select(1) //capturando o produto usando o select (índice).
            .should('have.value', 'blog')

    })

    it('Marcar o tipo de atendimento como "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]') // usando os inputs do tipo "type e value"
            .check()
            .should('have.value', 'feedback')

    })

    it('Marcar cada tipo de atendimento', function () {
        cy.get('input[type="radio"][value="ajuda"]')
            .check()
        cy.get('input[type="radio"][value="elogio"]')
            .check()
        cy.get('input[type="radio"][value="feedback"]')
            .check()
        cy.should('be.checked')
    })

    it('Marcar cada tipo de atendimento', function () {
        cy.get('input[type="radio"]') // pega todos os "radio"
            .should('have.length', 3) // verifica a quantidade de "radio"
            .each(function ($radio) { //criando função para "each", onde vai pegar cada "radio".
                cy.wrap($radio).check() //dentro da função, o wrap vai "empacotar" os radio.
                cy.wrap($radio).should('be.checked') //vai verificar cada radio.
            })
    })

    it('Marcar ambos checkboxes e depois desmarcar o último', function () {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function () { //Este é um exemplo de como testar a funcionalidade de upload de arquivos em uma aplicação web usando Cypress.

        cy.get('input[id="file-upload"]') //Localiza um elemento de input do tipo file com o ID file-upload na página.
            .selectFile('./cypress/fixtures/example.json') //Seleciona um arquivo chamado example.json que está localizado no diretório ./cypress/fixtures/
            .should(function ($input) {
                console.log($input) //console.log($input): Este comando simplesmente imprime o elemento de input no console do navegador para fins de depuração.
                expect($input[0].files[0].name) //expect($input[0].files[0].name).to.equal('example.json'): Esta linha de código faz uma asserção usando expect para garantir que o nome do arquivo selecionado seja example.json.
                    .to.equal('example.json')
            })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {

        cy.get('input[id="file-upload"]')//Este comando usa o cy.get para localizar um elemento de input com o ID file-upload na página. Esse é o input onde o arquivo será carregado.
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })//O comando selectFile é usado para selecionar um arquivo específico (example.json) do diretório ./cypress/fixtures/. O parâmetro { action: 'drag-drop' } especifica que a ação de seleção do arquivo deve simular um arrastar e soltar (drag-and-drop).
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name)
                    .to.equal('example.json')
            })

    })

    it('Verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {

        cy.get('#privacy a').should('have.attr', 'target', '_blank') //pega o id e a div "a" e verifica com o should pegando o tipo e o seu valor.
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {

        cy.get('#privacy a')
            .invoke('removeAttr', 'target')//remove o atributo target para abrir o link na msm aba.
            .click()
        cy.contains('Talking About Testing')//verifica essa frase está contida na página.
            .should('be.visible')
    })

})
