import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/UserController'
import { checkSessionId } from '../middlewares/ckeck-session-id'

export async function usersRoutes(app: FastifyInstance) {
    app.post(
        '/', 
        UserController.create
    )
    app.put(
        '/:id', 
        { preHandler: [checkSessionId] },
        UserController.update
    )
    app.delete(
        '/:id', 
        { preHandler: [checkSessionId] },
        UserController.delete
    )
}