import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import { describe, beforeEach, it, expect, afterAll, beforeAll } from 'vitest'
import { userService } from '../src/services/userServices'

describe('user service', () => {

    const user = {
        id: randomUUID(),
        name: 'Breno',
        email: 'breno@example.com',
        session_id: randomUUID()
    }

    beforeEach(() => {
        execSync('npm run knex migrate:rollback -all')
        execSync('npm run knex migrate:latest')
    })

    it('search user by id', async () => {
        await userService.create(user)
        
        const foundUser = await userService.findById(user.id)

        expect(foundUser?.id).toEqual(user.id)
    })

    it('search user by email', async () => {
        await userService.create(user)

        const foundUser = await userService.findByEmail(user.email)

        expect(foundUser?.email).toEqual(user.email)
    })

    it('search user by session', async () => {
        await userService.create(user)

        const foundUser = await userService.findBySession(user.session_id)

        expect(foundUser?.session_id).toEqual(user.session_id)
    })

    it('create user', async () => {

        await userService.create(user)
        
        const newUser = await userService.findById(user.id)

        expect(newUser?.id).toEqual(user.id)
        expect(newUser?.name).toEqual(user.name)
        expect(newUser?.email).toEqual(user.email)
        expect(newUser?.session_id).toEqual(user.session_id)
    })

    it('update user', async () => {
        await userService.create(user)

        const updatedUser = {
           ...user,
            name: 'Breno Updated',
            email: 'breno.updated@example.com'
        }

        await userService.update(user.id, updatedUser)
        
        const updatedUserFound = await userService.findById(user.id)

        expect(updatedUserFound?.name).toEqual(updatedUser.name)

    })

    it('delete user', async () => {
        await userService.create(user)

        await userService.delete(user.id)

        const foundUser = await userService.findById(user.id)
        expect(foundUser).toBeUndefined()
    })
})