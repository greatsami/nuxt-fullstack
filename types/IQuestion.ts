import {IAnswer} from "~/types/IAnswer";

export type IQuestion = {
    id: number
    authorId: number
    authorName?: string
    title: string
    description: string
    answers: IAnswer[]
}