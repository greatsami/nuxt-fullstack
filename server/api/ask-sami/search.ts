import {searchQuestions} from "~/server/database/repositories/askSamiRepository";

export default defineEventHandler(async (event) => {
    const queries = getQuery(event)

    return await searchQuestions(queries.search as string)
});