<script setup lang="ts">
import getParam from "~/composables/getParam";
import {IAnswer} from "~/types/IAnswer";
import {IQuestion} from "~/types/IQuestion";

const questionId = getParam('id')
const me = useUser()

const router = useRouter();

const showEditForm = ref(false)
const showDeleted = ref(false)

const { data: question } = useFetch<IQuestion>(`/api/ask-sami/question?id=${questionId}`, { server: false })

const showAnswerForm = useState('showAnswerForm' + questionId, () => false)
const isMine = question?.authorId == me.id


const editEndpoint = '/api/ask-sami/edit-question'

function addAnswer(answer: IAnswer) {
  question.value?.answers.push(answer)
  showAnswerForm.value = false
}

async function deleteQuestion(answer: IAnswer) {
  const {data: deleted}  = await useFetch('/api/ask-sami/delete-question',
      {
        method: 'POST',
        body: {questionId}
      }
  )
  showDeleted.value = true
  setTimeout(() => {

  router.push(`/ask-sami/search`)
  }, 3000)
}
</script>

<template>
  <div
      class=" min-h-full theme-mode bg-gradient-to-b from-white to-indigo-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-600">
    <div class="h-32 flex justify-center">
      <div class="flex m-5">
        <img class="mx-auto h-24 w-auto" src="/img/logo_clear_fsj.png" alt="full stack sami logo" />
        <h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4">
          Ask Sami
        </h1>
      </div>
    </div>
    <div class="md:flex">
      <ElementsAskSamiSidebar />
      <div class="md:w-1/3 z-1 flex justify-right relative"></div>
      <div class="w-full md:w-1/3">
        <div class="p-8 text-white bg-lime-600 dark:bg-slate-800 rounded shadow-md" v-if="showDeleted">
          question deleted
        </div>
        <div v-if="question" class="flex flex-column justify-center hover:scale-110 transition duration-500">
          <div class="max-w-xxl w-full p-4">
            <div class="p-8 bg-white dark:bg-slate-800 rounded shadow-md">
              <div class="flex justify-end dark:text-gray-300">
                {{ question.authorName }}
              </div>

              <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-300">{{ question.title }}</h2>
              <p class="dark:text-gray-300">{{ question.description }}</p>

              <div class="mt-5" v-if="isMine && showEditForm == false">
                <button @click="showEditForm = true" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
                <button @click="deleteQuestion" class="bg-red-500 ml-3 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                  delete
                </button>
              </div>

              <ElementsQuestionForm :endpoint="editEndpoint" :data="question" v-if="showEditForm"/>

            </div>
          </div>
        </div>
        <div v-for="answer in question?.answers"
             class="flex flex-column justify-center hover:scale-110 transition duration-500">
          <div class="max-w-xxl w-full p-4">

            <div class="p-8 bg-white dark:bg-slate-900 rounded shadow-md">
              <div class="flex justify-end dark:text-gray-300">
                {{ answer.authorName }}
              </div>
              <p class="dark:text-gray-300">{{ answer.text }}</p>
            </div>
          </div>
        </div>


        <div class="flex justify-end">
          <button v-if="!showAnswerForm" @click="showAnswerForm = !showAnswerForm" type="button"
                  class="text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Answer
          </button>
        </div>
        <div v-if="showAnswerForm">
          <ElementsAnswerForm :questionId="questionId" @addAnswer="addAnswer" />
        </div>
      </div>
    </div>

  </div>
</template>
