import { FastifyReply, FastifyRequest } from "fastify";
import { userService } from "../services/userServices";

export async function checkSessionId(request: FastifyRequest, reply: FastifyReply) {
    
    const sessionId = request.cookies.sessionId

    if(!sessionId) {
        return reply.status(401).send({ message: 'Unauthorized 1' })
    }

    const user = await userService.findBySession(sessionId)

    if(!user) {
        return reply.status(401).send({ message: 'Unauthorized 2' })
    }

    request.user = user
}