<div align="center">
  <img src="https://github.com/user-attachments/assets/dc3043f3-26ea-4240-ba01-62c6a5a85ed0" alt="Smart Inventory Logo" width="100"/>

  # Smart Inventory Management - Gestão Inteligente de Produção

  <p>
    <strong>Controle de insumos, produtos e otimização de produção com foco em lógica de negócio, responsividade e Clean Code.</strong>
  </p>

<p>
    <img src="https://img.shields.io/badge/React.js-blue?style=for-the-badge" alt="React">
    <img src="https://img.shields.io/badge/Quarkus_Java-red?style=for-the-badge&logo=quarkus" alt="Quarkus">
    <img src="https://img.shields.io/badge/Neon_PostgreSQL-00e599?style=for-the-badge&logo=postgresql&logoColor=white" alt="Neon">
    <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress" alt="Cypress">
    <img src="https://img.shields.io/badge/Docker-lightblue?style=for-the-badge&logo=docker" alt="Docker">
</p>
</div>

---
## 🚀 Deploy 

O projeto está publicado e pode ser testado em tempo real:

- **Frontend (Vercel):** [https://inventory-management-lac-rho.vercel.app/](https://inventory-management-lac-rho.vercel.app/)
- **Backend API (Render):** [https://inventory-management-5vev.onrender.com](https://inventory-management-5vev.onrender.com)
- **Documentação Swagger:** [https://inventory-management-5vev.onrender.com/q/swagger-ui/](https://inventory-management-5vev.onrender.com/q/swagger-ui/)
- **Banco de Dados:** PostgreSQL Gerenciado (Neon Cloud).


---

## Sobre o Projeto

O Smart Inventory é uma plataforma robusta desenvolvida para indústrias que necessitam controlar estoques de insumos e otimizar a fabricação de produtos.

- **Inteligência de Produção:** Algoritmo que sugere a produção baseando-se no estoque atual e priorizando produtos de **maior valor agregado**.
- **Arquitetura Híbrida:** Configuração preparada para rodar 100% em containers Docker localmente ou em infraestrutura Cloud escalável.
- **Mobile-First:** Design totalmente responsivo para consulta de inventário e sugestões de produção em qualquer dispositivo.
- **Segurança:** Política de CORS dinâmica configurada para proteção da API em produção.

## Arquitetura de Software
O projeto foi construído seguindo os princípios SOLID e Clean Code, garantindo que a aplicação seja escalável e de fácil manutenção.

### Back-end (Quarkus)
- Padrão de Camadas: Organizado em Resources (Controladores), Services (Regras de Negócio), Models (Entidades/JPA) e DTOs (Data Transfer Objects) para garantir o desacoplamento.
- Business Logic: O core da aplicação reside no ProductionService, onde foi implementado um Greedy Algorithm (Algoritmo Guloso) para otimização de produção.
  - Performance & Escalabilidade: O algoritmo foi desenhado para ser altamente eficiente, operando com complexidade de tempo $O(P  \log  P + M + C)$ (onde $P$ = Produtos, $M$ = Materiais e $C$ = Composições). Isso garante que o cálculo de sugestões e sobras seja praticamente instantâneo, mesmo em cenários de inventários volumosos.
- Persistência: Uso de Hibernate com Panache para uma escrita de código mais fluida e produtiva.

#### Documentação da API (Swagger)
Para facilitar o consumo da API e os testes de integração, o projeto conta com documentação automatizada via Swagger/OpenAPI.
- Interface Interativa: Através do Swagger UI, é possível testar todos os endpoints (GET, POST, PUT, DELETE) em tempo real, visualizando os schemas de entrada e saída.
- Acesso: [https://inventory-management-5vev.onrender.com/q/swagger-ui/](https://inventory-management-5vev.onrender.com/q/swagger-ui/)

### Front-end (React)
- Gerenciamento de Estado: Redux Toolkit para um fluxo de dados previsível e centralizado.
- Componentização: UI modularizada para reaproveitamento, utilizando Tailwind CSS para garantir um design system consistente e responsivo.
- Type Safety: Uso rigoroso de TypeScript para interfaces e tipos, minimizando erros em tempo de execução.

## Modelagem de Dados e Regras de Negócio
O sistema utiliza um banco de dados relacional para gerenciar a complexidade da manufatura, garantindo integridade entre o que está em estoque e o que pode ser vendido, otimizando a produção e o lucro.

### Entidades do Sistema (ERD)
```mermaid
erDiagram
    Product {
        int id PK
        string name
        float price
    }
    RawMaterial {
        int id PK
        string name
        float stockQuantity
    }
    ProductComposition {
        int id PK
        int product_id FK
        int rawMaterial_id FK
        float quantityNeeded
    }

    Product ||--o{ ProductComposition : "has_composition"
    RawMaterial ||--o{ ProductComposition : "used_in"
 ```
    
- Raw Material (RawMaterial): Representa os insumos básicos.
  - Exemplo: Industrial Steel, Microprocessors, Lithium Battery Cells.
  - Atributos principais: name, stockQuantity.
    
- Product (Product): Itens finais produzidos pela indústria.
  - Exemplo: Luxury Sedan ($85k), Professional Drone ($12k).
  - Atributos principais: name, price.

- Composition (ProductComposition): A "receita" do produto. Define a relação N:N entre produtos e insumos.
  - Atributos principais: quantityNeeded, product_id, rawMaterial_id.
 
### Inteligência de Otimização
O projeto atende a demanda principal que é o Algoritmo de Priorização de Produção demonstrando no dashboard a sugestão de fabricação otimizada:

1. O sistema mapeia todos os produtos e suas composições.
2. Analisa o estoque atual de cada RawMaterial.
3. Priorização por Valor: O sistema prioriza a produção de itens com maior price (Valor Agregado), garantindo que a indústria utilize seus insumos limitados para maximizar o faturamento.
4. Além da sugestão otimizada o sistema também faz um rastreamento de sobras de insumos para gerar insights de criação de novos produtos para utilizar sobras ou investimentos mais precisos para aumento de faturamento da fábrica.
  
## Tecnologias Utilizadas

- **Frontend:** React.js, TypeScript, Tailwind CSS, Redux Toolkit, Axios.
- **Backend:** Java 21, Quarkus (RESTEasy Reactive), Hibernate Panache.
- **Banco de Dados:** PostgreSQL 15 (Neon Cloud em produção / Docker local).
- **QA & Testes:** Cypress (E2E), JUnit 5 (Unitários e Integração).
- **DevOps:** Docker, Docker Compose, CI/CD via Render e Vercel.

---

## Como rodar o projeto 
### Opção 1: Docker (Recomendado)

Esta opção sobe o ecossistema completo (Frontend, Backend e Banco de Dados Local).
#### 1. Suba os containers
```bash
docker-compose up --build
```

- Dashboard: http://localhost
- API Swagger: http://localhost:8080/q/swagger-ui/

### Opção 2: Localmente (Manual)
#### 1. Backend (Java/Quarkus):

```bash
cd backend
./mvnw quarkus:dev
```

#### 2. Frontend (Vite/React):
```bash
cd frontend
npm install
npm run dev
```

## Homologação e Testes
O projeto conta com uma cobertura completa de testes para garantir que a aplicação seja resiliente a falhas e inclusiva para todos os usuários.

### 1. Back-end (JUnit 5, RestAssured & PanacheMock)
A camada de serviços e os endpoints da API são validados por testes que garantem a resiliência do sistema:

- Testes de Integração: Validam o ciclo completo de vida (CRUD) e o contrato JSON dos endpoints, garantindo que a API responda conforme o esperado.
- Testes de Unidade: Focam na inteligência do ProductionService, simulando cenários reais como:
  - Priorização de Valor: Garante que itens caros tenham precedência sobre itens baratos na disputa por insumos.
  - Cálculo de Gargalo (Bottleneck): Valida se o sistema identifica corretamente qual insumo limita a produção máxima.
  - Tratamento de Exceções: Verifica o comportamento do sistema com estoques zerados ou composições ausentes.
    
#### Como testar    
```bash
cd backend
./mvnw test
```

### 2. Front-end (Cypress E2E)
Os testes de ponta a ponta validam a jornada do usuário e a robustez da interface:

- Acessibilidade (A11y): Validação de estados de erro via aria-invalid, uso de aria-labels em elementos interativos e navegação semântica por roles.
- Experiência do Usuário (UX): Teste de perceived performance garantindo que os Skeleton Loaders sejam exibidos corretamente durante respostas lentas da API.
- Resiliência: Simulação de falhas críticas no servidor (Status 500) para garantir que o usuário receba feedbacks de erro claros em vez de uma tela em branco.
- Layout Responsivo: Testes automatizados mudando o viewport para dispositivos móveis (ex: iPhone XR), garantindo que a barra de navegação e o menu lateral funcionem perfeitamente no toque.
- Lógica de Negócio Visual: Verificação da formatação de moeda em PT-BR e do cálculo de Receita Estimada no Dashboard.

#### Como testar    
```bash
cd frontend

# Rodar testes contra a Produção (Vercel/Render)
npm run test:prod

# Rodar testes contra o ambiente Local (Docker)
npm run test:local
```

## Interface e Experiência do Usuário (UX)
A interface foi projetada para ser intuitiva, focando na eficiência operacional da indústria.

### Demonstração
<p align="center"> 
<img src="https://github.com/user-attachments/assets/49b515e9-fbef-429b-a987-f9ce5ec81150" alt="Dashboard e Sugestão de Matéria Prima" width="800px" />
</p>

### Acessibilidade e Design Responsivo
- Mobile-First: A aplicação foi desenvolvida com Tailwind CSS garantindo que o controle de estoque possa ser feito de um tablet ou smartphone no chão de fábrica.
- Navegação Semântica: Uso de tags HTML5 semânticas (main, section, nav, header) para melhor leitura por tecnologias assistivas.
- Contraste e Feedback: Cores validadas para alto contraste e feedbacks visuais claros (toasts de sucesso/erro) após cada operação CRUD.
- Aria-labels: Elementos interativos possuem rótulos descritivos para leitores de tela.

<p align="center">
  <img src="https://github.com/user-attachments/assets/4db92abf-886d-4e03-a016-b97481299721" alt="Mobile Menu" width="200" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/62cda03e-21d9-4051-8805-69b35f5a6517" alt="Mobile Hotels" width="200" />
</p>

<br />

<div align="center">
<p>Desenvolvido por <strong>Daniele K. Santos</strong></p>
</div>

