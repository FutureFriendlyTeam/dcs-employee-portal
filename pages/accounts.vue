<template>
  <div class="min-h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky></main-navigation>

    <div class="container mx-auto py-8 px-4 space-y-8 flex-grow">
      <h1>Accounts</h1>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'MessageInbox',
  // computed: {
  //   ...mapGetters({
  //     messages: 'profile/getMessages',
  //   }),
  // },
}
</script>
