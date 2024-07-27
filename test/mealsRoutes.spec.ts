import { execSync } from "child_process";
import request from 'supertest'
import { beforeEach, it, afterAll, beforeAll, describe, expect } from "vitest";
import { app } from "../src/app";

describe('meals routes, test HTTP methods', () => {

    beforeAll(async () => {
        //execSync('docker compose up -d')
        await app.ready()

    })

    afterAll(async () => {
        //execSync('docker compose down')
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback -all')
        execSync('npm run knex migrate:latest')
    })

    it('GET /meals', async () => {
        const userResponse = await request(app.server)
        .post('/users')
        .send({ name: 'John Doe', email: 'johndoe@gmail.com' })
        .expect(201)
  
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie') as string[])
        .send({
          title: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: 111111//new Date(),
        })
        .expect(201)
  
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie') as string[])
        .send({
          title: 'Lunch',
          description: "It's a lunch",
          isOnDiet: true,
          date: 121212//new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day after
        })
        .expect(201)
  
      const mealsResponse = await request(app.server)
        .get('/meals')
        .set('Cookie', userResponse.get('Set-Cookie') as string[])
        .expect(200)
  
      expect(mealsResponse.body.meals).toHaveLength(2)
  
      // This validate if the order is correct
      expect(mealsResponse.body.meals[0].title).toBe('Lunch')
      expect(mealsResponse.body.meals[1].title).toBe('Breakfast')
    })

    it('POST /meals', async () => {
        const userResponse = await request(app.server)
        .post('/users')
        .send({ name: 'John Doe', email: 'johndoe@gmail.com' })
        .expect(201)
  
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie') as string[])
        .send({
          title: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: 111111
          ,
        })
        .expect(201)
    })

    it('GET /meals/:id', async () => {
        const userResponse = await request(app.server)
            .post('/users')
            .send({ name: 'John Doe', email: 'johndoe@gmail.com' })
            .expect(201)

        await request(app.server)
            .post('/meals')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .send({
                title: 'Breakfast',
                description: "It's a breakfast",
                isOnDiet: true,
                date: 111111,
            })
            .expect(201)

        const mealsResponse = await request(app.server)
            .get('/meals')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .expect(200)

        const mealId = mealsResponse.body.meals[0].id

        const mealResponse = await request(app.server)
            .get(`/meals/${mealId}`)
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .expect(200)

        expect(mealResponse.body.meal.title).toEqual('Breakfast')
    })

    it('PUT /meals/:id', async () => {
        const userResponse = await request(app.server)
        .post('/users')
        .send({ name: 'John Doe', email: 'johndoe@gmail.com' })
        .expect(201)
  
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie') as string[])
        .send({
          title: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: 111111,
        })
        .expect(201)
  
      const mealsResponse = await request(app.server)
        .get('/meals')
        .set('Cookie', userResponse.get('Set-Cookie') as string[])
        .expect(200)
  
      const mealId = mealsResponse.body.meals[0].id
  
      await request(app.server)
        .put(`/meals/${mealId}`)
        .set('Cookie', userResponse.get('Set-Cookie') as string[])
        .send({
          title: 'Dinner',
          description: "It's a dinner",
          isOnDiet: true,
          date: 111111,
        })
        .expect(204)
    })

    it('DELETE /meals/:id', async () => {
        const userResponse = await request(app.server)
            .post('/users')
            .send({ name: 'John Doe', email: 'johndoe@gmail.com' })
            .expect(201)

        await request(app.server)
            .post('/meals')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .send({
                title: 'Breakfast',
                description: "It's a breakfast",
                isOnDiet: true,
                date: 111111,
            })
            .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie') as string[])
      .expect(200)

    const mealId = mealsResponse.body.meals[0].id

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', userResponse.get('Set-Cookie') as string[])
      .expect(204)
    })

    it('GET /meals/metrics', async () => {
        const userResponse = await request(app.server)
            .post('/users')
            .send({ name: 'John Doe', email: 'johndoe@gmail.com' })
            .expect(201)

        await request(app.server)
            .post('/meals')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .send({
                title: 'Breakfast',
                description: "It's a breakfast",
                isOnDiet: true,
                date: new Date('2021-01-01T08:00:00'),
            })
            .expect(201)

        await request(app.server)
            .post('/meals')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .send({
                title: 'Lunch',
                description: "It's a lunch",
                isOnDiet: false,
                date: new Date('2021-01-01T12:00:00'),
            })
            .expect(201)

        await request(app.server)
            .post('/meals')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .send({
                title: 'Snack',
                description: "It's a snack",
                isOnDiet: true,
                date: new Date('2021-01-01T15:00:00'),
            })
            .expect(201)

        await request(app.server)
            .post('/meals')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .send({
                title: 'Dinner',
                description: "It's a dinner",
                isOnDiet: true,
                date: new Date('2021-01-01T20:00:00'),
            })

        await request(app.server)
            .post('/meals')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .send({
                title: 'Breakfast',
                description: "It's a breakfast",
                isOnDiet: true,
                date: new Date('2021-01-02T08:00:00'),
            })

        const metricsResponse = await request(app.server)
            .get('/meals/metrics')
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .expect(200)

        expect(metricsResponse.body).toEqual({
            totalMeals: 5,
            totalMealsOnDiet: 4,
            totalMealsOffDiet: 1,
            bestOnDietSequence: 3,
        })
    })


})

//padrao de data 2011-11-11T02:00:00.000Z