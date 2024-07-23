import { execSync } from "child_process";
import { beforeEach, it } from "node:test";
import { afterAll, beforeAll, describe } from "vitest";
import { app } from "../src/app";

describe('user routes, test HTTP methods', () => {

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

    it('POST /users', async () => {

    })

    it('PUT /users/:id', async () => {

    })

    it('DELETE /users/:id', async () => {

    })


})