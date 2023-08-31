import { findQuestion} from "~/server/database/repositories/askSamiRepository";
import {IAnswer} from "~/types/IAnswer";
import {getUserById} from "~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
    const queries = getQuery(event)
    const questionId = parseInt(queries.id as string)

    const question = await findQuestion(questionId)

    question.answers.forEach(async (answer: IAnswer) => {
        const user = await getUserById(answer.authorId)
        answer.authorName = '@' + user.username
    })

    const user = await getUserById(question.authorId)
    question.authorName = '@' + user.username

    return question
});