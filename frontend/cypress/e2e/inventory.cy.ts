/// <reference types="cypress" />

describe('Smart Inventory - Homologação de Sistema', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/raw-materials', { fixture: 'materials.json' }).as(
      'getMaterials',
    );
    cy.intercept('GET', '**/products', {
      body: [{ id: 1, name: 'PRODUTO TESTE', price: 1500.0 }],
    }).as('getProducts');
    cy.intercept('GET', '**/production-suggestions', {
      body: { suggestions: [], remainders: [] },
    }).as('getDashboard');

    cy.viewport(1280, 720);
    cy.visit('http://localhost:80');
    cy.get('[role="navigation"]', { timeout: 10000 }).should('be.visible');
  });

  describe('Gerenciamento de Cadastros (Insumos e Produtos)', () => {
    it('deve permitir a navegação e o fechamento do modal de novos insumos', () => {
      cy.get('[role="navigation"]')
        .contains('button', /Matéria Prima/i)
        .click();
      cy.contains('button', /Novo Insumo/i).click();

      cy.get('h3')
        .contains(/Novo Insumo/i)
        .should('be.visible');
      cy.get('button[aria-label="Fechar"]').click();
      cy.get('h3').should('not.exist');
    });

    it('deve carregar os dados persistidos ao abrir a edição de um produto', () => {
      cy.get('[role="navigation"]')
        .contains('button', /Produtos/i)
        .click();
      cy.wait('@getProducts');

      cy.get('table tbody tr')
        .first()
        .within(() => {
          cy.contains('button', /Editar/i).click();
        });

      cy.get('input[name="productName"]').should('have.value', 'PRODUTO TESTE');
    });

    it('deve exibir mensagens de erro e bloquear o envio se campos obrigatórios estiverem vazios', () => {
      cy.get('[role="navigation"]')
        .contains('button', /Matéria Prima/i)
        .click();
      cy.contains('button', /Novo Insumo/i).click();

      cy.get('input[name="name"]').clear();
      cy.get('form').submit();

      // Validação de acessibilidade e feedback visual (UX)
      cy.get('input[name="name"]').should('have.attr', 'aria-invalid', 'true');
      cy.contains(/Campo obrigatório/i).should('be.visible');
    });
  });

  describe('Experiência do Usuário (UX)', () => {
    it('deve exibir o estado de carregamento (Skeleton) durante a busca de dados na API', () => {
      // atraso forçado para garantir que o componente de Loading seja renderizado e capturado
      cy.intercept('GET', '**/products', {
        body: [{ id: 1, name: 'PRODUTO LENTO', price: 100.0 }],
        delay: 1000,
      }).as('slowResponse');

      cy.get('[role="navigation"]')
        .contains('button', /Produtos/i)
        .click();

      cy.get('[data-testid="skeleton-loader"]').should('be.visible');
      cy.wait('@slowResponse');
      cy.get('[data-testid="skeleton-loader"]').should('not.exist');

      // Validação específica na tabela para evitar conflitos com layout mobile escondido
      cy.get('table').contains('td', 'PRODUTO LENTO').should('be.visible');
    });
  });

  describe('Resiliência e Layout Responsivo', () => {
    it('deve apresentar a barra de navegação corretamente em dispositivos móveis', () => {
      cy.viewport('iphone-xr');
      cy.get('button[aria-label="Abrir menu"]').click();

      cy.get('[role="navigation"]').should(($aside) => {
        expect($aside[0].getBoundingClientRect().left).to.equal(0);
      });
    });

    it('deve alertar o usuário quando houver falha de comunicação com o servidor', () => {
      cy.intercept('GET', '**/production-suggestions', { statusCode: 500 }).as(
        'apiError',
      );

      cy.visit('http://localhost:80');
      cy.wait('@apiError');

      cy.get('body').should('contain', 'ERRO AO CARREGAR DADOS');
    });
  });

  describe('Cálculos e Lógica de Negócio', () => {
    it('deve processar e exibir corretamente o cálculo de Receita Estimada no Dashboard', () => {
      cy.intercept('GET', '**/production-suggestions', {
        body: {
          suggestions: [
            { productName: 'PRODUTO A', quantity: 2, unitPrice: 1000.0 },
          ],
          remainders: [],
        },
      }).as('getSuggestions');

      cy.visit('http://localhost:80');
      cy.wait('@getSuggestions');

      // Valida se a regra de negócio (quantidade * preço) reflete o valor formatado em PT-BR
      cy.contains('p', /2\.000,00/).should('be.visible');
    });
  });
});
