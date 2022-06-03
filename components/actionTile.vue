<template>
  <div
    class="no-underline bg-white border-2 border-outline rounded space-y-1 h-full text-sm transform transition-transform ease-out duration-100 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex flex-col space-y-4 justify-between"
  >
    <div class="flex flex-col space-y-4 p-4">
      <h3 class="text-primary">{{ action.type }} {{ action.name }}</h3>
      <p
        :class="[
          profile.identityStrengthLevel < service.identityStrengthLevel
            ? 'text-red'
            : 'text-divider',
        ]"
      >
        <span
          v-if="profile.identityStrengthLevel < service.identityStrengthLevel"
        >
          {{ service.identityStrength }} strength required ✕
        </span>
        <span v-else>{{ service.identityStrength }} identity strength ✓</span>
      </p>
      <div>
        <p>
          <span v-if="action.description">{{ action.description }}</span>
          <span v-else>
            This is a generic description placeholder, Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </span>
        </p>
      </div>
      <div>
        <h5>Time to complete:</h5>
        <span v-if="action.time">{{ action.time }} mins</span>
        <span v-else>3 mins</span>
      </div>
      <div>
        <h5>Requirements:</h5>
        <ul v-if="action.requirements.length > 0" class="list-disc ml-4">
          <li v-for="requirement in action.requirements" :key="requirement">
            {{ requirement }}
          </li>
        </ul>
        <ul v-else class="list-disc ml-4">
          <li>First item</li>
          <li>Second item</li>
        </ul>
      </div>
      <div>
        <h5>What to expect:</h5>
        <span v-if="action.whatToExpect">{{ action.whatToExpect }}</span>
        <span v-else
          >This is a generic expectation placeholder, Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.</span
        >
      </div>
    </div>

    <div
      class="flex flex-row justify-end items-center space-x-4 p-4 border-t-2 border-outline bg-shade"
    >
      <p v-if="!getAuthState">
        <nuxt-link class="inline" to="/login">Log in</nuxt-link> to use this
        service.
      </p>

      <div class="space-y-2">
        <p
          v-if="
            getAuthState &&
            profile.identityStrengthLevel < service.identityStrengthLevel
          "
        >
          <nuxt-link class="inline" to="/identity/strength/upgrade"
            >Upgrade your identity strength</nuxt-link
          >
          level by uploading identity documents to use this service.
        </p>

        <p v-if="getAuthState && action.isRelated">
          <nuxt-link class="inline" to="/identity/edit"
            >Update your address information</nuxt-link
          >
          in your identity to automatically update all ACT government services
          with your new address.
        </p>
      </div>

      <nsw-button
        :disabled="
          !(profile.identityStrengthLevel >= service.identityStrengthLevel) ||
          !getAuthState
        "
        class="flex-none"
        @click="
          goTo(`/services/${service.id}--${service.name}/action/${action.id}`)
        "
        >Start →</nsw-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    action: {
      type: Object,
      default() {
        return {}
      },
    },
    serviceId: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      getService: 'services/getService',
      getServicesByProvider: 'services/getServicesByProvider',
      getServicesByCategory: 'services/getServicesByCategory',
      getAuthState: 'global/getAuthState',
    }),
    service() {
      return this.getService(this.serviceId)
    },
  },
  methods: {
    goTo(route) {
      if (this.action.id === 'RMYL') {
        this.$router.push(route)
      } else if (this.action.id === 'UMII') {
        this.$router.push('/identity/edit')
      }
    },
  },
}
</script>
