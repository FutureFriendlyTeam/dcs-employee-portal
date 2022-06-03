<template>
  <div
    class="border-2 border-outline rounded w-full p-4 py-3 flex flex-row justify-between items-center space-x-4"
  >
    <div class="flex-grow flex flex-row space-x-4 items-center">
      <div>
        <!-- <img
          v-if="notification.type === 'activity'"
          class="w-6 h-6"
          alt="icon"
          :src="
            require('@/assets/images/icons/categories/' +
              icon(notification.service) +
              '.svg')
          "
        /> -->
        <img
          v-if="notification.type === 'message'"
          class="w-12 h-12"
          alt="icon"
          :src="require('@/assets/images/logos/nsw-gov.svg')"
        />
      </div>
      <div class="flex-grow flex flex-row justify-between">
        <div>
          <div
            v-if="notification.type === 'activity'"
            class="text-sm font-bold text-primary"
          >
            <p>
              {{ getService(notification.service).name }} >
              {{ actionName(notification.service, notification.action).type }}
              {{ actionName(notification.service, notification.action).name }}
            </p>
          </div>
          <div
            v-if="notification.type === 'message'"
            class="text-sm font-bold text-primary"
          >
            <p>
              {{ notification.sender }}
            </p>
          </div>

          <p>{{ notification.text }}</p>
        </div>

        <div v-if="notification.link">
          <nuxt-link
            :to="`/services/${notification.service}--${
              getService(notification.service).name
            }/action/${notification.action}`"
          >
            <nsw-button>Go</nsw-button>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div
      v-if="dismissable"
      class="flex flex-row space-x-4 items-center cursor-pointer hover:text-primary hover:font-bold"
      @click="dismiss()"
    >
      <p>Dismiss</p>

      <img
        class="w-4 h-4"
        alt="close icon"
        :src="require('@/assets/images/icons/close.svg')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      default() {
        return {}
      },
    },
    dismissable: {
      type: Boolean,
      default: true,
    },
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
  },
  methods: {
    dismiss() {
      this.$store.dispatch('profile/DISMISS_NOTIFICATION', this.notification)
    },
    actionName(serviceId, actionId) {
      const index = this.getService(serviceId).actions.findIndex(
        (action) => action.id === actionId
      )

      return this.getService(serviceId).actions[index]
    },
    icon(serviceId) {
      return this.getService(serviceId).icon
        ? this.getService(serviceId).icon
        : this.getService(serviceId).categoryId
    },
  },
}
</script>
