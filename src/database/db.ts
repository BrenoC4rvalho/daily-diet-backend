import { env } from '../env/env'
import { Knex, knex as setupKnex } from 'knex'

export const config: Knex.Config = {
    client: env.DB_CLIENT,
    connection: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
    },
    migrations: {
        extension: 'ts',
        directory: './migrations',
    },
    useNullAsDefault: true,
}

export const knex = setupKnex(config)
