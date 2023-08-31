import {IUser} from "~/types/IUser";
import {LoginRequest, RegistrationRequest} from '~/types/IRegistration';
import {validateLoginForm, validateRegisterForm} from "~/server/services/validator";

export async function validateUser(data: RegistrationRequest): Promise<FormValidation> {
    const errors = await validateRegisterForm(data)

    if (errors.size > 0) {
        return { hasErrors: true, errors }
    }

    return { hasErrors: false }
}

export async function validateLoginUser(data: LoginRequest): Promise<FormValidation> {
    const errors = await validateLoginForm(data)

    if (errors.size > 0) {
        return { hasErrors: true, errors }
    }

    return { hasErrors: false }
}

export function sanitizeUserForFrontend(user: IUser | undefined): IUser {

    if (!user) {
        return user
    }

    delete user.password;
    delete user.loginType;
    delete user.stripeCustomerId;

    return user
}