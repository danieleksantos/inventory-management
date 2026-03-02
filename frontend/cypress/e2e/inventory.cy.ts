/// <reference types="cypress" />

describe('Smart Inventory - Homologação de Sistema', () => {
  beforeEach(() => {
    // Mock de Insumos
    cy.intercept('GET', '**/raw-materials', { fixture: 'materials.json' }).as(
      'getMaterials',
    );

    // Mock de Produtos
    cy.intercept('GET', '**/products', {
      body: [{ id: 1, name: 'PRODUTO TESTE', price: 1500.0 }],
    }).as('getProducts');

    // Mock de Inteligência de Produção (Dashboard)
    cy.intercept('GET', '**/production-suggestions', {
      body: { suggestions: [], remainders: [] },
    }).as('getSuggestions');

    cy.viewport(1280, 720);

    // Visita inicial com verificação de redirecionamento
    cy.visit('http://localhost:80');
    cy.url().should('include', '/dashboard');

    // Garante que o App "hidratou" (Sidebar visível)
    cy.get('[role="navigation"]', { timeout: 10000 }).should('be.visible');
  });

  describe('Fluxos de Cadastro e Edição', () => {
    it('navega para materiais e permite fechar o modal de criação', () => {
      cy.get('[role="navigation"]')
        .contains('a', /Matéria Prima/i)
        .click();
      cy.contains('button', /Novo Insumo/i).click();

      cy.get('h3')
        .contains(/Novo Insumo/i)
        .should('be.visible');
      cy.get('button[aria-label="Fechar"]').click();
      cy.get('h3').should('not.exist');
    });

    it('exibe os dados do produto corretamente ao abrir o formulário de edição', () => {
      cy.get('[role="navigation"]')
        .contains('a', /Produtos/i)
        .click();
      cy.wait('@getProducts');

      cy.get('table tbody tr')
        .first()
        .within(() => {
          cy.contains('button', /Editar/i).click();
        });

      // Valida o preenchimento automático do formulário
      cy.get('input[name="productName"]').should('have.value', 'PRODUTO TESTE');
    });

    it('valida campos obrigatórios e impede o envio de formulários vazios', () => {
      cy.get('[role="navigation"]')
        .contains('a', /Matéria Prima/i)
        .click();
      cy.contains('button', /Novo Insumo/i).click();

      cy.get('input[name="name"]').clear();
      cy.get('form').submit();

      // Verifica estado de erro (A11y)
      cy.get('input[name="name"]').should('have.attr', 'aria-invalid', 'true');
      cy.contains(/Campo obrigatório/i).should('be.visible');
    });
  });

  describe('Interface e Resiliência', () => {
    it('exibe skeletons de carregamento durante a espera pela resposta da API', () => {
      cy.intercept('GET', '**/products', {
        body: [{ id: 1, name: 'PRODUTO LENTO', price: 100.0 }],
        delay: 1000,
      }).as('slowResponse');

      cy.get('[role="navigation"]')
        .contains('a', /Produtos/i)
        .click();
      cy.get('[data-testid="skeleton-loader"]').should('be.visible');
      cy.wait('@slowResponse');
      cy.get('[data-testid="skeleton-loader"]').should('not.exist');
      cy.contains('td', 'PRODUTO LENTO').should('be.visible');
    });

    it('alerta o usuário em caso de falha crítica na comunicação com o backend', () => {
      cy.intercept('GET', '**/production-suggestions', { statusCode: 500 }).as(
        'apiError',
      );

      cy.visit('http://localhost:80');
      cy.wait('@apiError');
      cy.get('body').should('contain', 'ERRO AO CARREGAR DADOS');
    });
  });

  describe('Navegação e Roteamento', () => {
    it('abre a Sidebar corretamente em visualização mobile', () => {
      cy.viewport('iphone-xr');
      cy.get('button[aria-label="Abrir menu"]').click();

      // Valida posição física do menu na tela (Mobile Experience)
      cy.get('[role="navigation"]').should(($aside) => {
        expect($aside[0].getBoundingClientRect().left).to.equal(0);
      });
    });

    it('renderiza página 404 customizada ao acessar rotas inexistentes', () => {
      cy.visit('/rota-que-nao-existe', { failOnStatusCode: false });
      cy.contains(/Caminho Não Encontrado/i, { timeout: 15000 }).should(
        'be.visible',
      );

      cy.contains('button', /Ir para Dashboard/i).click();
      cy.url().should('include', '/dashboard');
    });
  });

  describe('Regras de Negócio', () => {
    it('calcula e formata corretamente a Receita Estimada no Dashboard', () => {
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

      // Verifica formatação R$ 2.000,00 (Brasil)
      cy.contains('p', /2\.000,00/).should('be.visible');
    });
  });
});
