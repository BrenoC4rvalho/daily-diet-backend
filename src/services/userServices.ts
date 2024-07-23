import { knex } from '../database/db'

type User = {
    id: string,
    name: string,
    email: string,
    session_id: string,
    created_at?: string,
    updated_at?: string,
}

export class userService {

    static async findById(id: string) {
        return await knex('users').where({ id }).first()
    }

    static async findByEmail(email: string) {
        return await knex('users').where({ email }).first()
    }

    static async findBySession(sessionId: string) {
        return await knex('users').where({ session_id: sessionId }).first()
    }
    static async create(user: User) {
       await knex('users').insert(user)
    }

    static async update(id: string, user: User) {
        await knex('users').where({ id }).update(user)
    }

    static async delete(id: string) {
        await knex('users').where({ id }).delete()
    }
}