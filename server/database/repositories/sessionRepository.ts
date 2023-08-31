import prisma from "~/server/database/client";
import {ISession} from "~/types/ISession";
import {IUser} from "~/types/IUser";

export async function createSession(data: ISession): Promise<ISession> {
    // @ts-ignore
    return prisma.session.create({
        data: {
            authToken: data.authToken ?? '',
            userId: data.userId
        },
    });
}

export async function getSessionByAuthToken(authToken: string): Promise<ISession> {
    const user: IUser = await getUserByAuthToken(authToken) as unknown as IUser

    return { authToken, user }
}

async function getUserByAuthToken(authToken: string): Promise<IUser> {
    // @ts-ignore
    return prisma.session.findUnique({
        where: {
            authToken: authToken,
        }
    }).user()
}