# Daily Diet (backend)

## ⌨️ Sobre o Projeto

Este projeto consiste em uma API criada utilizando [Node.js](https://nodejs.org/) com a utilização do [Fastify](https://fastify.dev/), e com a utilização do banco de dados [Postgres](https://www.postgresql.org/).

## Requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## 🛠️ Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## 🚀 Rodar o Projeto

Primeiramente, é necessário ter o Node.js instalado. Caso não tenha, faça a instalação [aqui](https://nodejs.org/en/download/).

Após instalar as dependências, e as variáveis de ambientes, no arquivo .env  execute o comando abaixo para rodar o projeto em modo de desenvolvimento:

```bash
docker compose up -d
npm run knex -- migrate:latest
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para acessar o servidor.

## 📚 Endpoints da API

- **POST** `/users` - Cria um novo usuário
- **PUT** `/users/{id}` - Edita um usuário
- **DELETE** `/users/{id}` - Exclui um usuário
- **GET** `/meals` - Retorna todas as Meals
- **POST** `/tasks` - Cria uma nova Meal
- **GET** `/meals/{mealId}` - Retorna a Meal do id correspondente
- **PUT** `/meals/{mealId}` - Edita uma Meal existente
- **DELETE** `/meals/{id}` - Exclui uma Meal
- **GET** `/meals/metrics` - Retorna todas as metricas de um usuário

## 🧑‍💻 Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Zod](https://zod.dev/)
- [Knex](https://knexjs.org/guide/#configuration-options)
- [Vitest](https://vitest.dev/)

