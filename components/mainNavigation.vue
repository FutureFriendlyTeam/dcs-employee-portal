<template>
  <div>
    <div class="bg-white border-b border-outline">
      <div
        class="container mx-auto flex flex-row justify-between items-center py-2 sm:py-6 px-4"
      >
        <div class="flex flex-row space-x-6 md:space-x-12 items-center">
          <nuxt-link to="/">
            <div class="flex flex-row items-center space-x-4 -px-4">
              <img
                class="h-12 sm:h-16 w-auto"
                alt="NSW Gov Logo"
                src="@/assets/images/logos/nsw-gov.svg"
              />
            </div>
          </nuxt-link>

          <div class="hidden sm:flex flex-row space-x-4">
            <nuxt-link class="no-underline hover:underline" to="/"
              >Checklist</nuxt-link
            >
            <nuxt-link class="no-underline hover:underline" to="/library"
              >Library</nuxt-link
            >
            <nuxt-link class="no-underline hover:underline" to="/accounts"
              >Accounts</nuxt-link
            >
          </div>
        </div>

        <div v-if="getAuthState" class="flex flex-row space-x-8 items-center">
          <nuxt-link class="no-underline hover:underline" to="/profile"
            >My Profile</nuxt-link
          >

          <a
            class="hidden md:block no-underline hover:underline"
            href="#"
            @click="logOut()"
            >Log out</a
          >
        </div>
        <div v-else>
          <nuxt-link
            class="hidden md:block no-underline hover:underline"
            to="/login"
            >Log in</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    login: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      actvities: 'profile/getActivityLog',
      messages: 'profile/getMessages',
      getAuthState: 'global/getAuthState',
    }),
  },
  methods: {
    logOut() {
      this.$store.dispatch('global/LOG_OUT')
    },
  },
}
</script>
