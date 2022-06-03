<template>
  <div class="h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky></main-navigation>

    <div
      v-sticky
      sticky-offset="{top: 90, bottom: 20}"
      class="bg-white"
      on-stick="stuck"
      :class="[sticky ? 'border-b-2 border-outline' : '']"
    >
      <div class="container mx-auto px-4" :class="[sticky ? 'py-2 ' : 'py-6']">
        <div
          class="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0"
        >
          <h1 :class="[sticky ? 'text-xl' : '']">Renewal Submitted</h1>
          <div class="flex flex-row space-x-4">
            <nsw-button @click="saveAndGo('/')">Done</nsw-button>
            <nsw-button :secondary="true" @click="saveAndGo('/')"
              >Return to All Services</nsw-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 mb-8 flex flex-col space-y-8 flex-grow">
      <div class="border-2 border-outline"></div>

      <div class="flex flex-row -mx-4">
        <div class="w-3/5 px-4"></div>

        <div class="w-2/5 px-4">
          <div
            v-sticky
            sticky-offset="{top: 186, bottom: 20}"
            class="border-2 border-outline rounded-lg p-6 flex flex-col items-start space-y-4 shadow-md"
          >
            <div>
              <h3>Need Support?</h3>
              <p>
                Get help from our support team. Online, Over the phone or in
                person.
              </p>
            </div>

            <div class="space-y-2">
              <div class="flex flex-row space-x-4 items-center">
                <nsw-button>Live Chat</nsw-button>
                <p>2 min wait</p>
              </div>

              <div class="flex flex-row space-x-4 items-center">
                <nsw-button>Call us</nsw-button>
                <p>12 min wait</p>
              </div>
            </div>

            <p>
              For in person support visit an Access Canberra service centre.
              <a href="#">Find your nearest centre.</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t-2 border-shade">
      <div class="container mx-auto flex flex-row p-4 justify-end">
        <div class="flex flex-row space-x-4">
          <nsw-button @click="saveAndGo('/')">Done</nsw-button>
          <nsw-button :secondary="true" @click="saveAndGo('/')"
            >Return to All Services</nsw-button
          >
        </div>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
export default {
  name: 'ServiceCompletePage',
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
