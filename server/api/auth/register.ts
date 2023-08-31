// @ts-ignore
import { CompatibilityEvent, sendError } from 'h3'
import bcrypt from 'bcrypt'
import { IUser } from '~/types/IUser';
import { RegistrationRequest } from '~/types/IRegistration';
import {createUser} from "~/server/database/repositories/userRepository";
import {makeSession} from "~/server/services/sessionService";
import {validateUser} from "~/server/services/userService";

export default async (event: CompatibilityEvent) => {
    const body = await readBody(event)
    const data = body.data as RegistrationRequest
    const validation = await validateUser(data)

    if (validation.hasErrors === true) {
        const errors = JSON.stringify(Object.fromEntries(validation.errors))
        return sendError(event, createError({ statusCode: 422, data: errors }))
    }

    const encryptPassword: string = await bcrypt.hash(data.password, 10)

    const userData: IUser = {
        username: data.username,
        name: data.name,
        email: data.email,
        loginType: 'email',
        password: encryptPassword
    }

    const user = await createUser(userData)

    // @ts-ignore
    return await makeSession(user, event);

}