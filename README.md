# neon-schema-gen

## Description

This project is a work in progress. The goal is to generate React Query hooks and TypeScript types from a Neon schema. The generated hooks should be enough to all the CRUD operations and the types should be enough to cover all the fields in the schema.

## Development

1. Install the dependencies:

```bash
bun install
```

2. Create a `.env` file by copying the `.env.example` file and filling the the variables with your Neon connection string details.


3. Generate the TypeScript type definitions and React Query hooks based on your schema:

```bash
bun run generate:full
```

## Design

This project is divided into two main parts:

1. Generating types from the Postgres schema
2. Generating hooks + fetchers + react-query dedicated types

We can only do the first part if we have access to the Postgres schema. The second part can be done without access to the schema, but it will be limited to the types that are already generated.

## TODO

- [ ] Generate separate fetchers for each operation, so they can be used in both client and server side
- [ ] Integrate the @neon/serverless package with the JWT token so we can safely query in the frontend
- [ ] Key management for the generated hooks
- [ ] CLI setup
- [ ] ...







