import { execSync } from "child_process";
import { beforeEach, it } from "node:test";
import { afterAll, beforeAll, describe } from "vitest";
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

    })

    it('POST /meals', async () => {

    })

    it('GET /meals/:id', async () => {

    })

    it('PUT /meals/:id', async () => {

    })

    it('DELETE /meals/:id', async () => {

    })

    it('GET /meals/metrics', async () => {

    })


})