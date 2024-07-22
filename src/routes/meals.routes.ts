import { FastifyInstance } from 'fastify'
import { MealController } from '../controllers/MealController'
import { checkSessionId } from '../middlewares/ckeck-session-id'

export async function mealsRoutes(app: FastifyInstance) {
    app.get(
        '/',
        { preHandler: [checkSessionId] },
        MealController.index
    )

    app.post(
        '/', 
        { preHandler: [checkSessionId] },
        MealController.create
    )

    app.get(
        '/:id', 
        { preHandler: [checkSessionId] },
        MealController.show
    )

    app.put(
        '/:id', 
        { preHandler: [checkSessionId] },
        MealController.update
    )

    app.delete(
        '/:id',
        { preHandler: [checkSessionId] },
        MealController.delete
    )

    app.get(
        '/metrics', 
        { preHandler: [checkSessionId] },
        MealController.getMetrics

    )

}