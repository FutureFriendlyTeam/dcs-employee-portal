<template>
  <div class="min-h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky></main-navigation>

    <div class="container mx-auto py-8 px-4 space-y-8 flex-grow">
      <h1>Inbox</h1>

      <div v-if="messages.length < 1">No messages</div>

      <div v-else class="space-y-2">
        <div v-for="message in messages" :key="message.action">
          <notification-tile
            :notification="message"
            :dismissable="false"
          ></notification-tile>
        </div>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MessageInbox',
  computed: {
    ...mapGetters({
      messages: 'profile/getMessages',
    }),
  },
}
</script>
