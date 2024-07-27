import { execSync } from "child_process";
import request from "supertest";
import {beforeEach, it, afterAll, beforeAll, describe, expect } from "vitest";
import { app } from "../src/app";
import { userService } from "../src/services/userServices";


describe('user routes, test HTTP methods', () => {

    beforeAll(async () => {
        await app.ready()

    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback -all')
        execSync('npm run knex migrate:latest')
    })
        

    it('POST /users', async () => {
        const res = await request(app.server)
            .post('/users')
            .send({ name: 'testUser', email: 'testPassword@gmail.com' })
            .expect(201)

        const cookies = res.get('Set-Cookie')

        expect(cookies).toEqual(
            expect.arrayContaining([expect.stringContaining('sessionId')])
        )
    })

    it('PUT /users/:id', async () => {
        const userResponse = await request(app.server)
            .post('/users')
            .send({ name: 'testUser', email: 'testPassword@gmail.com' })
            .expect(201)
        
        const user = await userService.findByEmail('testPassword@gmail.com')    

        await request(app.server)
            .put(`/users/${user?.id}`)
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .send({ name: 'teste'})
            .expect(200)


        const changedUser = await userService.findByEmail('testPassword@gmail.com')
        
        expect(changedUser?.name).toEqual('teste')
        
    })

    it('DELETE /users/:id', async () => {

        const userResponse = await request(app.server)
            .post('/users')
            .send({ name: 'testUser', email: 'testPassword@gmail.com' })
            .expect(201)
        
        const user = await userService.findByEmail('testPassword@gmail.com')    

        await request(app.server)
            .delete(`/users/${user?.id}`)
            .set('Cookie', userResponse.get('Set-Cookie') as string[])
            .expect(204)

    })


})