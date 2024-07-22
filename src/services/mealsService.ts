import { UUID } from "crypto"
import { knex } from "../database/db"

type Meal = {
    id: string,
    userId: string,
    title: string,
    description: string,
    isOnDiet: boolean,
    date: number
}

export class mealService {
    
    static async create(meal: Meal) {
        await knex('meals').insert({
            id: meal.id,
            user_id: meal.userId,
            title: meal.title,
            description: meal.description,
            is_on_diet: meal.isOnDiet,
            date: meal.date,
        })
    }

    static async getAll(userId: string) {
        return await knex('meals')
            .where({user_id: userId})
            .orderBy('date', 'desc')
    }
    
    static async getById(id: string) {
        return await knex('meals')
           .where({ id })
           .first()
    }

    static async update(id: string, meal: Meal) {
        await knex('meals').where({ id }).update({
            id: meal.id,
            user_id: meal.userId,
            title: meal.title,
            description: meal.description,
            is_on_diet: meal.isOnDiet,
            date: meal.date,
        })
    }

    static async delete(id: string) {
        await knex('meals').where({ id }).delete()
    }

    static async getOnDiet(userId: string) {
        return await knex('meals')
            .where({ 
                user_id: userId, 
                is_on_diet: true
            }) 
            .count('id', {as: 'total'})
            .first()
    }

    static async getNotOnDiet(userId: string) {
        return await knex('meals')
            .where({ 
                user_id: userId, 
                is_on_diet: false
            }) 
            .count('id', {as: 'total'})
            .first()
    }

}