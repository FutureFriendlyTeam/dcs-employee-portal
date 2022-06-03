<template>
  <div class="min-h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky></main-navigation>

    <div class="container mx-auto py-8 px-4 space-y-8">
      <div
        v-if="getAuthState"
        class="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0"
      >
        <h1>Hi {{ profile.firstName }}.</h1>

        <nuxt-link
          to="/identity"
          class="no-underline border-2 border-outline rounded pl-3 pr-6 py-3 flex flex-row space-x-4 transform transition-transform ease-out duration-100 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <img class="w-12 h-12 bg-divider rounded-sm" />
          <div class="flex flex-col space-y-1">
            <h4 class="text-primary">
              {{ profile.firstName }} {{ profile.lastName }}
            </h4>

            <p class="text-xs text-divider">
              {{ profile.identityStrength }} identity strength
            </p>
          </div>
        </nuxt-link>
      </div>

      <div v-if="getAuthState && notifications.length > 0" class="space-y-6">
        <h2>Notifications</h2>

        <div class="space-y-2">
          <div
            v-for="notification in notifications.slice().reverse()"
            :key="notification.action"
          >
            <notification-tile :notification="notification"></notification-tile>
          </div>
        </div>
      </div>

      <div
        v-if="getAuthState && myServices.length > 0"
        class="flex flex-col space-y-6"
      >
        <h2>My Services</h2>

        <div class="flex flex-col sm:flex-row sm:flex-wrap -mx-2 mt-2">
          <div
            v-for="myService in myServices"
            :key="myService"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <service-tile
              :service="getService(myService)"
              my-services
            ></service-tile>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-6">
        <h2>Popular Services</h2>

        <div class="flex flex-col sm:flex-row sm:flex-wrap -mx-2 mt-2">
          <div
            v-for="popservice in popularServices"
            :key="popservice.Id"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <service-tile :service="popservice"></service-tile>
          </div>
        </div>
      </div>
    </div>

    <div class="border border-shade"></div>

    <div
      v-sticky
      sticky-offset="{top: 90, bottom: 20}"
      class="bg-white"
      on-stick="stuck"
      :class="[sticky ? 'border-b-2 border-outline' : '']"
    >
      <div
        class="container mx-auto px-4 space-y-8 flex-grow"
        :class="[sticky ? 'py-4' : 'py-8']"
      >
        <div
          class="flex flex-col space-y-6 md:flex-row md:space-y-0 justify-between items-center"
        >
          <h1 :class="[sticky ? 'text-xl' : '']">All Services</h1>

          <div class="flex flex-row space-x-2 xl:w-1/3">
            <nsw-field v-model="searchTerm" horizontal class="flex-grow"
              >Search</nsw-field
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto py-8 px-4 space-y-8 flex-grow">
      <div
        class="flex flex-col space-y-2 md:flex-row md:space-x-8 md:space-y-0"
      >
        <div class="w-full md:w-1/4 lg:w-1/5">
          <div
            v-sticky
            sticky-offset="{top: 186, bottom: 20}"
            class="flex flex-col space-y-4"
          >
            <h4>Categories</h4>

            <side-navigation
              class="hidden md:block"
              :sort="sort"
            ></side-navigation>
          </div>
        </div>

        <service-list
          class="w-full md:w-3/4 lg:w-4/5"
          :sort="sort"
          :filter="searchTerm"
        ></service-list>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      searchTerm: '',
      sticky: false,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      notifications: 'profile/getNotifications',
      myServices: 'profile/getMyServices',
      popularServices: 'services/getPopularServices',
      getService: 'services/getService',
      getAuthState: 'global/getAuthState',
    }),
    sort: {
      get() {
        return this.$store.state.global.sort
      },
      set(value) {
        this.$store.dispatch('global/SET_SORT', value)
      },
    },
  },
  methods: {
    stuck(event) {
      this.sticky = event.sticked
    },
  },
}
</script>
