import { FastifyRequest, FastifyReply} from 'fastify'

export class UserController {
    static async create(request: FastifyRequest, reply: FastifyReply) {

    }

    static async update(request: FastifyRequest, reply: FastifyReply) {
        console.log('User updated:')
    }

    static async delete(request: FastifyRequest, reply: FastifyReply) { 
        console.log('User deleted:')
    }
}