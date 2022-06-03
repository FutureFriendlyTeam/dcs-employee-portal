<template>
  <nuxt-link
    :to="`/services/${service.id}--${service.name}`"
    class="no-underline h-full text-sm transform transition-transform ease-out duration-100 hover:shadow-md hover:-translate-y-0.5 cursor-pointer break-words w-full flex flex-col bg-white border-2 border-outline flex-grow rounded"
  >
    <div class="p-4 space-y-1">
      <div class="flex flex-row space-x-2 items-start">
        <!-- <img
          class="w-6 h-6"
          :alt="`${service.category} icon`"
          :src="require('@/assets/images/icons/categories/' + icon + '.svg')"
        /> -->
        <h4 class="text-primary">{{ service.name }}</h4>
      </div>
      <!-- <p
        class="text-xs text-divider"
        :class="[
          profile.identityStrengthLevel < service.identityStrengthLevel
            ? 'text-red'
            : 'text-divider',
        ]"
      >
        <span
          v-if="profile.identityStrengthLevel < service.identityStrengthLevel"
        >
          {{ service.identityStrength }} identity strength required ✕
        </span>
        <span v-else>{{ service.identityStrength }} identity strength ✓</span>
      </p> -->
    </div>
    <div
      v-if="service.messages.length > 0 && myServices"
      class="flex-grow border-t-2 border-outline p-4 bg-shade"
    >
      <div class="flex flex-col space-y-2">
        <div v-for="message in service.messages" :key="message">
          <vue-simple-markdown
            class="inline"
            :source="message"
          ></vue-simple-markdown
          ><span>.</span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    service: {
      type: Object,
      default() {
        return {}
      },
    },
    myServices: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
    icon() {
      return this.service.icon ? this.service.icon : this.service.categoryId
    },
  },
}
</script>
