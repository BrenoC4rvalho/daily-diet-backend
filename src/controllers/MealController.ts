import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { mealService } from '../services/mealsService'
import { randomUUID } from 'crypto'

export class MealController {
    static async index(request: FastifyRequest, reply: FastifyReply) {

        const userId = request.user?.id

        if(!userId) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }

        const meals = await mealService.getAll(userId)        

        if(!meals) {
            return reply.status(404).send({ message: 'No meals found' })
        }

        return reply.status(200).send({meals})
    }   

    static async create(request: FastifyRequest, reply: FastifyReply) {
        const createMealBodySchema = z.object({
            title: z.string(),
            description: z.string(),
            isOnDiet: z.boolean(),
            date: z.coerce.date(),
        })

        const { title, description, isOnDiet, date } = createMealBodySchema.parse(request.body)

        if(!request.user?.id) {
            return reply.status(401).send({ message: 'Unauthorized 3' })
        }

        await mealService.create({
            id: randomUUID(),
            userId: request.user?.id,
            title,
            description,
            date:  date.getTime(),
            isOnDiet: isOnDiet,
        })

        return reply.status(201).send({ message: 'Meal created successfully' })
    }


    static async show(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const meal = await mealService.getById(id)

        if(!meal) {
            return reply.status(404).send({ message: 'Meal not found' })
        }

        return reply.status(200).send({ meal })
    }

    static async update(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const updateMealBodySchema = z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            isOnDiet: z.boolean().optional(),
            date: z.coerce.date().optional()
        })

        const { id } = paramsSchema.parse(request.params)

        const { title, description, isOnDiet, date } = updateMealBodySchema.parse(request.body)

        const meal = await mealService.getById(id)

        if(!meal) {
            return reply.status(404).send({ message: 'Meal not found' })
        }

        if(!request.user?.id) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }

        await mealService.update(id, {
            id,
            userId: request.user?.id,
            title: title || meal.title,
            description: description || meal.description,
            date: date?.getTime() || meal.date,
            isOnDiet: isOnDiet || meal.is_on_diet,
        })

        return reply.status(204).send({ message: 'Meal updated successfully' })
    }

    static async delete(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const meal = await mealService.getById(id)

        if(!meal) {
            return reply.status(404).send({ message: 'Meal not found' })
        }

        await mealService.delete(id)

        return reply.status(204).send({ message: 'Meal deleted' })
    }

    static async getMetrics(request: FastifyRequest, reply: FastifyReply) {
        const userId = request.user?.id

        if(!userId) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }

        const totalOnDietMeals = await mealService.getOnDiet(userId)
        const totalNotOnDietMeals = await mealService.getNotOnDiet(userId)
        const totalMeals = await mealService.getAll(userId)

        const { bestOnDietSequence } = totalMeals.reduce(
            (acc, meal) => {
                if(meal.is_on_diet) {
                    acc.currentOn1DietSequence++
                } else {
                    acc.currentOn1DietSequence = 0
                }

                if(acc.currentOn1DietSequence > acc.bestOnDietSequence) {
                    acc.bestOnDietSequence = acc.currentOn1DietSequence
                }

                return acc
            },{bestOnDietSequence: 0, currentOn1DietSequence: 0}
        ) 

        return reply.status(200).send({
            totalMeals: totalMeals.length,
            totalMealsOnDiet: totalOnDietMeals?.total,
            totalMealsNotOnDiet: totalNotOnDietMeals?.total,
            bestOnDietSequence
        })


    }
}