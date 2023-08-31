import {getUserBySessionToken} from "~/server/services/sessionService";
import {deleteQuestion, findQuestion} from "~/server/database/repositories/askSamiRepository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const question =  await findQuestion(parseInt(body.questionId))

    const authToken = getCookie(event, 'auth_token')
    const user = await getUserBySessionToken(authToken)

    const isMine = user.id === question.authorId

    if (isMine) {
        return await deleteQuestion(question.id)
    }
});