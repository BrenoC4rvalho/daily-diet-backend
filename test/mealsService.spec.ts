import { execSync } from "child_process"
import { randomUUID } from "crypto"
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest"
import { mealService } from "../src/services/mealsService"

describe('meal service', () => {
    
    const mealUserOne = {
        id: randomUUID(),
        title: 'Test Meal',
        description: 'This is a test meal',
        isOnDiet: true,
        date: new Date().getTime(),
        userId: randomUUID() 
    }

    const mealUserTwo = {
        id: randomUUID(),
        title: 'Test Meal 2',
        description: 'This is a test meal 2',
        isOnDiet: false,
        date: new Date().getTime(),
        userId: randomUUID()
    }

    beforeAll(async () => {
        //execSync('docker compose up -d')
    })

    afterAll(async () => {
        //execSync('docker compose down')
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback -all')
        execSync('npm run knex migrate:latest')
    })

    it('get all meals by user', async () => {
        
    })

    it('get meal by id', async () => {

    })

    it('create meal', async () => {

    })

    it('update meal', async () => {

    })

    it('delete meal', async () => {

    })

    it('get meals on diet', async () => {

    })

    it('get meals not on diet', async () => {

    })
})