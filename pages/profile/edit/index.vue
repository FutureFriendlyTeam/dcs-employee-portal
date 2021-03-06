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
              Step 1 of 2
            </h4>
            <h2 :class="[sticky ? 'text-lg' : '']">
              Edit Personal Information
            </h2>
          </div>

          <div class="flex flex-row space-x-2">
            <nsw-button
              :disabled="JSON.stringify(updateData) === JSON.stringify(profile)"
              @click="stageAndGo('/identity/edit/permissions')"
              >Next</nsw-button
            >
            <nuxt-link to="/identity" class="no-underline"
              ><nsw-button :secondary="true">Cancel</nsw-button></nuxt-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 mb-8 flex flex-col space-y-8 flex-grow">
      <div class="border-2 border-outline"></div>

      <div class="flex-grow space-y-12">
        <div class="flex flex-col space-y-6">
          <h3>Employee Information</h3>

          <p class="text-sm w-full md:w-2/3">
            As this information is related to your employment profile, to make
            changes you need to contact
            <nuxt-link to="/identity"> Human Resources</nuxt-link>.
          </p>

          <div class="flex flex-col space-y-2">
            <h5>Name</h5>
            <p>
              {{ profile.firstName }} {{ profile.middleName }}
              {{ profile.lastName }}
            </p>
          </div>

          <div class="flex flex-col space-y-2">
            <h5>Date of Birth</h5>
            <p>{{ profile.dateOfBirth }}</p>
          </div>
          <div class="flex flex-col space-y-2">
            <h5>Role</h5>
            <p>{{ profile.role }}</p>
          </div>
        </div>

        <div class="flex flex-col space-y-6">
          <h3>Contact Information</h3>

          <div>
            <nsw-field v-model="updateData.email" class="w-full md:w-1/2"
              >Email</nsw-field
            >
          </div>

          <div>
            <nsw-field v-model="updateData.mobile" class="w-full md:w-1/2"
              >Mobile</nsw-field
            >
          </div>
        </div>
      </div>
    </div>

    <div class="border-t-2 border-shade">
      <div class="container mx-auto flex flex-row p-4 justify-end">
        <div class="flex flex-row space-x-2">
          <nsw-button
            :disabled="JSON.stringify(updateData) === JSON.stringify(profile)"
            @click="stageAndGo('/identity/edit/permissions')"
            >Next</nsw-button
          >
          <nuxt-link to="/identity" class="no-underline"
            ><nsw-button :secondary="true">Cancel</nsw-button></nuxt-link
          >
        </div>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IdentityEditPage',
  data() {
    return {
      updateData: {},
      sticky: false,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
  },
  mounted() {
    this.setProfile()

    this.stageProfileUpdate()
  },
  methods: {
    setProfile() {
      this.updateData = JSON.parse(JSON.stringify(this.profile))
    },
    stageProfileUpdate() {
      this.$store.dispatch('profile/STAGE_UPDATE', this.updateData)
    },
    stageAndGo(route) {
      this.stageProfileUpdate()

      this.$router.push(route)
    },
    stuck(event) {
      this.sticky = event.sticked
    },
  },
}
</script>
