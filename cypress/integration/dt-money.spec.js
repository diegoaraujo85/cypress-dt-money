/// <reference types="Cypress" />

import { format } from '../support/utils';

const baseUrl = Cypress.config('baseUrl');

describe('DT Money', () => {
  beforeEach(() => {
    cy.visit(baseUrl,{
      // onBeforeLoad(win) {
      //   prepareLocalStorage(win)
      // }
    });
    cy.get('table>tbody>tr').should('have.length', 2);
  })

  it('should be able to create a new entrance with income', () => {
    cy.get('button').click();
    cy.get('.ReactModal__Content').should('be.visible');

    cy.get('[placeholder="Título"]').type('Mesada');
    cy.get('[type="number"]').type(100);
    // cy.get('[alt="Entrada"]').click(); // usando o texto alt da imagem para clicar
    cy.get('.ReactModal__Content').contains('Entrada').click();

    cy.get('[placeholder="Categoria"]').type('Entrada de dinheiro');

    cy.get('[type="submit"]').click();

    cy.get('table>tbody>tr').should('have.length', 3);
  });

  it('should be able to create a new entrance with withdraw', () => {    
    cy.get('button').click();
    cy.get('.ReactModal__Content').should('be.visible');

    cy.get('[placeholder="Título"]').type('Jogo novo');
    cy.get('[type="number"]').type(100);
    cy.get('[alt="Saída"]').click(); // usando o texto alt da imagem para clicar
    cy.get('[placeholder="Categoria"]').type('Jogos');

    cy.get('[type="submit"]').click();

    cy.get('table>tbody>tr').should('have.length', 3);
  });

  it('should be able to create a new entrance with withdraw in mobile viewport', () => {   
    cy.viewport('iphone-6'); // or (320,480) 
    cy.get('button').click();
    cy.get('.ReactModal__Content').should('be.visible');

    cy.get('[placeholder="Título"]').type('Jogo novo');
    cy.get('[type="number"]').type(100);
    cy.get('[alt="Saída"]').click(); // usando o texto alt da imagem para clicar
    cy.get('[placeholder="Categoria"]').type('Jogos');

    cy.get('[type="submit"]').click();

    cy.get('table>tbody>tr').should('have.length', 3);
  });

  it.only('should be able to validate total values after transactions', () => {
    // cy.get('button').click();    
    // cy.get('[placeholder="Título"]').type('Pagamento');
    // cy.get('[type="number"]').type(1000);
    // cy.get('[alt="Entrada"]').click();
    // cy.get('[placeholder="Categoria"]').type('Salário');
    // cy.get('[type="submit"]').click().wait(500);

    // cy.get('button').click();
    // cy.get('[placeholder="Título"]').type('Churras');
    // cy.get('[type="number"]').type(100);
    // cy.get('[alt="Saída"]').click();
    // cy.get('[placeholder="Categoria"]').type('Alimentação');
    // cy.get('[type="submit"]').click().wait(500);

    cy.get('button').click();
    cy.get('[placeholder="Título"]').type('Jogo novo');
    cy.get('[type="number"]').type(125.55);
    cy.get('[alt="Saída"]').click();
    cy.get('[placeholder="Categoria"]').type('Diversos');
    cy.get('[type="submit"]').click().wait(500);

    let incomes = 0;
    let withdraws = 0;

    cy.get('table tbody tr')
    .each(($el, index, $list) => {
      cy.get($el).find(`.withdraw, .deposit`).then(($el) => {
        let value = format($el.text());
        if ($el.hasClass('deposit')) {
          incomes = incomes + value;
        } else {
          withdraws += value;
        }
      })
    });

    cy.get('.highlight-background').invoke('text').then((text) => {
      let formattedTotal = format(text);
      let expectedTotal = incomes - withdraws;

      expect(formattedTotal).to.equal(expectedTotal);
    })
  });
});