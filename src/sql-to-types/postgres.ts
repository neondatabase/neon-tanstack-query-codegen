import { Client, type Config } from "@rmp135/sql-ts"

const config: Config = {
  "client": "pg",
  "connection": {
    "host": process.env.NEON_CONNECTION_HOST,
    "user": process.env.NEON_CONNECTION_USER,
    "password": process.env.NEON_CONNECTION_PASSWORD,
    "database": process.env.NEON_CONNECTION_DATABASE,
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "filename": "__generated__/pg-schema",
  "template": "src/sql-to-types/template.handlebars"
}

const definition = await Client
  .fromConfig(config)
  .fetchDatabase()
  .toTypescript()
