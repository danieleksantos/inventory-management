<div align="center">
  <img src="/logo.png" alt="Smart Inventory Logo" width="100"/>

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

##🧪 Homologação e Testes
O projeto conta com uma suíte de testes automatizados para garantir a confiabilidade das regras de negócio.

### Testes E2E (Cypress)
Você pode rodar os testes contra o ambiente local ou diretamente contra o deploy de produção:
```bash
cd frontend

# Rodar testes contra a Produção (Vercel/Render)
npm run test:prod

# Rodar testes contra o ambiente Local (Docker)
npm run test:local
```

## Arquitetura e Boas Práticas

- SOLID & Clean Code: Separação clara de responsabilidades entre Services, Resources e Repositories.
- Idioma: Toda a codificação, tabelas e colunas do banco de dados desenvolvidas em Inglês.
- Acessibilidade: Uso de ARIA labels e feedbacks visuais para garantir uma experiência inclusiva.
- Uso de Mocks: Testes E2E preparados para rodar com dados reais ou intercepts, garantindo resiliência.

<br />

<div align="center">
<p>Desenvolvido por <strong>Daniele K. Santos</strong></p>
</div>

