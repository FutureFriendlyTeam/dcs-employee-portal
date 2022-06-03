<template>
  <div class="h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky sticky-z-index="10"></main-navigation>

    <div
      v-sticky
      sticky-offset="{top: 112, bottom: 20}"
      sticky-z-index="5"
      class="bg-white"
      on-stick="stuck"
      :class="[sticky ? 'border-b-2 border-outline' : '']"
    >
      <div class="container mx-auto px-4" :class="[sticky ? 'py-2 ' : 'py-6']">
        <div
          class="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0"
        >
          <div>
            <h4 class="text-text" :class="[sticky ? 'text-sm' : '']">
              Step 1 of 1
            </h4>
            <h2 :class="[sticky ? 'text-lg' : '']">Renew driver licence</h2>
          </div>

          <div class="flex flex-row space-x-2">
            <nsw-button @click="saveAndGo()">Submit &amp; Pay</nsw-button>
            <nuxt-link to="/identity" class="no-underline"
              ><nsw-button :secondary="true">Cancel</nsw-button></nuxt-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 mb-8 flex flex-col space-y-8 flex-grow">
      <div class="border-2 border-outline"></div>

      <div class="flex flex-row -mx-4"></div>
    </div>

    <div class="border-t-2 border-shade">
      <div class="container mx-auto flex flex-row p-4 justify-end">
        <div class="flex flex-row space-x-2">
          <nsw-button @click="saveAndGo()">Submit &amp; Pay</nsw-button>
          <nuxt-link to="/" class="no-underline"
            ><nsw-button :secondary="true">Cancel</nsw-button></nuxt-link
          >
        </div>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
export default {
  name: 'ServicePage',
  props: {
    serviceId: {
      type: String,
      default: '',
    },
    serviceName: {
      type: String,
      default: '',
    },
    actionId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      sticky: false,
    }
  },
  methods: {
    stuck(event) {
      this.sticky = event.sticked
    },
  },
}
</script>
