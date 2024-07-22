/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados - GET', () => {
      cy.request({
          method: 'GET',
          url: 'usuarios'
      }).should((response) => {
          expect(response.status).equal(200)
          expect(response.body).to.have.property('usuarios')
      })
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    let nome = 'Usuário EBAC ' + Math.floor(Math.random() * 1000)
    let email = 'user' + Math.floor(Math.random() * 1000) + '@ebac.com'
    cy.cadastrarUsuario(nome, email, 'teste123', 'true')
    .should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
  })
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    let nome = 'Usuário EBAC ' + Math.floor(Math.random() * 1000)
    cy.cadastrarUsuario(nome, 'fulano@qa.com', 'teste123', 'true')
    .should((response) => {
      expect(response.status).equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
  });
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
      let nome = 'Teste Gustavo ' + Math.floor(Math.random() * 1000)
      let email = 'gustavo.qa' + Math.floor(Math.random() * 1000) + '@ebac.com'
      let senha = 'teste' + Math.floor(Math.random() * 1000)
      cy.cadastrarUsuario(nome, email, senha, 'true')
      .then(response => {
          let id = response.body._id
          cy.request({
            method: 'PUT',
            url: `usuarios/${id}`,
            body: {
                   "nome": nome,
                   "email": email,
                   "password": 'EDITsuccess',
                   "administrador": 'true'
                   }   
           }).should(response => {
           expect(response.body.message).to.equal('Registro alterado com sucesso')
           expect(response.status).to.equal(200)
       })      
    });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let nome = 'Teste Gustavo ' + Math.floor(Math.random() * 1000)
    let email = 'gustavo.qa' + Math.floor(Math.random() * 1000) + '@ebac.com'
    let senha = 'teste' + Math.floor(Math.random() * 1000)
    cy.cadastrarUsuario(nome, email, senha, 'true')
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`
         }).should(response => {
         expect(response.body.message).to.equal('Registro excluído com sucesso')
         expect(response.status).to.equal(200)
      })
  })
});

});