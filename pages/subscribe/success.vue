<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const appDomain = config.public.appDomain
const sessionId = ref(route.query.session_id ? route.query.session_id : '')
</script>

<template>
  <div>
    <div v-if="sessionId" class="flex py-60 flex-col h-screen my-auto items-center bgimg bg-cover">
      <button class="mt-2 bg-white font-bold py-1 px-8 rounded m-2 dark:bg-slate-800 dark:text-white">
        You are subscribed!
      </button>
      <form :action="`${appDomain}/api/stripe/createPortalSession`" method="POST">
        <input type="hidden" id="session-id" name="session_id" :value="sessionId" />
        <button
            class="w-full px-6 py-3.5 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm text-center mr-2 mb-2"
            id="checkout-and-portal-button" type="submit">
          Manage your subscription
        </button>
      </form>
    </div>
    <div v-else>
      loading. . .
    </div>
  </div>
</template>