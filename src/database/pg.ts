import { env } from '../env/env'
import { Knex, knex as setupKnex } from 'knex'

export const config: Knex.Config = {
    client: env.DB_CLIENT,
    connection: env.DB_URL,
    migrations: {
        extension: 'ts',
        directory: './migrations',
    },
    useNullAsDefault: true,
}

export const knex = setupKnex(config)
