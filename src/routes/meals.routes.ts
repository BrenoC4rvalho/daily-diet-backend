import { FastifyInstance } from 'fastify'
import { MealController } from '../controllers/MealController'

export async function mealsRoutes(app: FastifyInstance) {
    app.get(
        '/',
        MealController.index
    )

    app.post(
        '/', 
        MealController.create
    )

    app.get(
        '/:id', 
        MealController.show
    )

    app.put(
        '/:id', 
        MealController.update
    )

    app.delete(
        '/:id', 
        MealController.delete
    )

    app.get(
        '/metrics', 
        MealController.getMetrics
    )

}