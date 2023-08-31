import {getUserBySessionToken} from "~/server/services/sessionService";
import {editQuestion, findQuestion} from "~/server/database/repositories/askSamiRepository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const data: IQuestionPost = body.data
    const questionId = data.id

    const question = await findQuestion(questionId)
    question.description = data.description
    question.title = data.title

    // const authToken = getCookie(event, 'auth_token')
    // const user = await getUserBySessionToken(authToken)

    return await editQuestion(question)
});