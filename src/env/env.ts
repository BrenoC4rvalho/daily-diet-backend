import { config } from 'dotenv'
import { z } from 'zod'

if(process.env.NODE_ENV === 'test') {
    config({ path: '.env.test' })
} else {
    config()
}

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
    DB_CLIENT: z.enum(['sqlite3', 'pg','mysql2']).default('sqlite3'),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string().default('root'),
    DB_PASSWORD: z.string().default('root'),
    DB_NAME: z.string().default('diet'),
    PORT: z.coerce.number().default(3000),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error('Invalid environment variables', _env.error.format())
    throw new Error('Invalid environment variables')
}

export const env = _env.data