import { randomUUID } from 'crypto'
import { FastifyRequest, FastifyReply} from 'fastify'
import { z } from 'zod'
import { userService } from '../services/userServices'

export class UserController {
    static async create(request: FastifyRequest, reply: FastifyReply) {
        const createUserBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
        })

        let sessionId = request.cookies.session_id

        if(!sessionId) {
            sessionId = randomUUID()
            reply.setCookie('sessionId', sessionId, { 
                path:'/',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
            })
        }

        const { name, email } = createUserBodySchema.parse(request.body)

        const existingUser = await userService.findByEmail(email)

        if(existingUser) {
            return reply.status(400).send({ message: 'Email already exists' })
        }


        await userService.create({
            id: randomUUID(),
            session_id: sessionId,
            name,
            email,
        })
        
        return reply.status(201).send({ message: 'User created successfully' })
    }

    static async update(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.string().uuid() 
        })

        const updateUserBodySchema = z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
        })

        const { id } = paramsSchema.parse(request.params)
        const { name, email } = updateUserBodySchema.parse(request.body)

        if(!email && !name) {
            return reply.status(400).send({ message: 'No update data provided' })  
        }



        const user = await userService.findById(id)

        if(!user) { 
            return reply.status(404).send({ message: 'User not found' })
        }

        if(email && await userService.findByEmail(email) && user.email!== email) {
            return reply.status(400).send({ message: 'Email already exists' })  
        }
        
        user.name = name || user.name
        user.email = email || user.email

        await userService.update(id, user)

        return reply.status(200).send({ message: 'User updated successfully' }) 
            
    }

    static async delete(request: FastifyRequest, reply: FastifyReply) { 
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const user = await userService.findById(id)

        if(!user) {
            return reply.status(404).send({ message: 'User not found' })
        } 

        await userService.delete(id)

        return reply.status(204).send({ message: 'User deleted' })
    }
}