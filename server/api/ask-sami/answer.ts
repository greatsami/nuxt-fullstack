import {getUserBySessionToken} from "~/server/services/sessionService";
import {createAnswer} from "~/server/database/repositories/askSamiRepository";
import {IAnswerPost} from "~/types/IAnswerPost";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const data: IAnswerPost = body.data

    const authToken = getCookie(event, 'auth_token')
    const user = await getUserBySessionToken(authToken)

    if (data.text !== null || data.text !== '') {
        return await createAnswer(data, user.id)
    }

});