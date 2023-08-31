// @ts-ignore
import { CompatibilityEvent, sendError } from 'h3'
import bcrypt from 'bcrypt'
import { LoginRequest } from '~/types/IRegistration';
import {makeSession} from "~/server/services/sessionService";
import {sanitizeUserForFrontend, validateLoginUser} from "~/server/services/userService";
import {getUserByEmail} from "~/server/database/repositories/userRepository";

export default async (event: CompatibilityEvent) => {
    const body = await readBody(event)
    const data = body.data as LoginRequest
    const validation = await validateLoginUser(data)

    if (validation.hasErrors === true) {
        const errors = JSON.stringify(Object.fromEntries(validation.errors))
        return sendError(event, createError({ statusCode: 422, data: errors }))
    }

    const user = await getUserByEmail(data.email);

    if (!user) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))
    }

    const isPasswordCorrect = bcrypt.compare(data.password, user.password)
    if (!isPasswordCorrect) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))
    }

    // @ts-ignore
    await makeSession(user, event);

    return sanitizeUserForFrontend(user)

}