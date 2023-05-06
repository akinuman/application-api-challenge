# Pokemon REST API Adapter

This service is a REST API adapter that fetches data from an external Pokemon GraphQL API and serves it through a REST API instead. The service also stores the Pokemon details in a PostgreSQL database when a specific Pokemon is requested for the first time.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Approach](#approach)

## Requirements

- Node.js (v14 or higher)
- PostgreSQL (v13 or higher)
- Docker

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/akinuman/application-api-challenge.git
   ```

2. Install the dependencies:

   ```
   cd pokemon-rest-api-adapter
   npm install
   ```

3. Set up the PostgreSQL database and update the `.env` file with the correct credentials.

   ```
   DATABASE_URL=postgresql://app:app@localhost:5432/db
   SERVER_PORT=3000
   POKEMONS_TO_FETCH=151
   EXTERNAL_API_URL=https://graphql-pokemon2.vercel.app/
   ```

4. You need to run PostgreSQL database:

   ```
   docker compose up
   ```

5. Run the database migration:

```
npx prisma db push
```

## Usage

Start the server:

```
npm run dev
```

## API Documentation

### Get Pokemons

- URL: `/pokemons`
- Method: `GET`
- URL Params: `limit=[integer]&offset=[integer]`
- Success Response:
  - Code: 200
  - Content: List of Pokemons

### Get Pokemon by ID

- URL: `/pokemon/:id`
- Method: `GET`
- URL Params: `id=[string]`
- Success Response:
  - Code: 200
  - Content: Pokemon details

## Approach

We used a code-first approach, where we first implemented the backend service and then created the API endpoints. The service is built using Node.js and Fastify, with TypeScript for better type safety and readability. I used the `graphql-request` library to fetch data from the external GraphQL API and Prisma as the ORM for working with the PostgreSQL database. The API provides pagination support and error handling, and stores the fetched Pokemon details lazily in the database when a specific Pokemon is requested for the first time.

---

IF you face with any error on running a app please contact with me anytime ---

Discord: Mr. Beaver#3268
Email: akinuman26@gmail.com
WP: +905432809752
