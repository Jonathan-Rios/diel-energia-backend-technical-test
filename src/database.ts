import path from 'node:path'

import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env not found')
}

const selectedConnection =
  env.DATABASE_CLIENT === 'sqlite'
    ? {
        filename: env.DATABASE_URL,
      }
    : env.DATABASE_URL

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: selectedConnection,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: path.resolve(__dirname, '..', 'db', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'db', 'seeds'),
  },
}

export const knex = setupKnex(config)
