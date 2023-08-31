import {getUserBySessionToken} from "~/server/services/sessionService";
import {createQuestion} from "~/server/database/repositories/askSamiRepository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const authToken = getCookie(event, 'auth_token')
    const user = await getUserBySessionToken(authToken)

    const data: IQuestionPost = body.data

    return await createQuestion(data, user.id)
});