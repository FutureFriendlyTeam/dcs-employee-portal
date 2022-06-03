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
          <h3>Personal Information</h3>

          <p class="text-sm w-full md:w-2/3">
            As this information is related to your legal identity, to make
            changes you need to
            <nuxt-link to="/identity">upload an identity document</nuxt-link>
            that includes any information you wish to update.
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

        <div class="flex flex-col space-y-6">
          <h3>Residential Address</h3>

          <div class="flex flex-row flex-wrap -mx-2">
            <div class="w-1/2 sm:w-1/6 px-2 mb-4 sm:mb-0">
              <nsw-field v-model="updateData.residentialUnit">Unit</nsw-field>
            </div>
            <div class="w-1/2 sm:w-1/6 px-2 mb-4 sm:mb-0">
              <nsw-field v-model="updateData.residentialNumber"
                >Number</nsw-field
              >
            </div>
            <div class="w-full sm:w-3/6 px-2 mb-4 sm:mb-0">
              <nsw-field v-model="updateData.residentialStreetName"
                >Street name</nsw-field
              >
            </div>
            <div class="w-full sm:w-1/6 px-2">
              <nsw-field v-model="updateData.residentialStreetType"
                >Street type</nsw-field
              >
            </div>
          </div>

          <div class="flex flex-row -mx-2">
            <nsw-field
              v-model="updateData.residentialSuburb"
              class="w-1/2 sm:w-2/5 px-2"
              >Suburb</nsw-field
            >
            <nsw-field
              v-model="updateData.residentialState"
              class="w-1/4 sm:w-1/5 px-2"
              >State</nsw-field
            >
            <nsw-field
              v-model="updateData.residentialPostcode"
              class="w-1/4 sm:w-1/5 px-2"
              >Postcode</nsw-field
            >
          </div>

          <nsw-field
            v-model="updateData.residentialCountry"
            class="w-full sm:w-1/2"
            >Country</nsw-field
          >
        </div>

        <div class="flex flex-col space-y-6">
          <h3>Postal Address</h3>
          <div class="flex flex-row flex-wrap -mx-2">
            <div class="w-1/2 sm:w-1/6 px-2 mb-4 sm:mb-0">
              <nsw-field v-model="updateData.postalUnit">Unit</nsw-field>
            </div>
            <div class="w-1/2 sm:w-1/6 px-2 mb-4 sm:mb-0">
              <nsw-field v-model="updateData.postalNumber">Number</nsw-field>
            </div>
            <div class="w-full sm:w-3/6 px-2 mb-4 sm:mb-0">
              <nsw-field v-model="updateData.postalStreetName"
                >Street name</nsw-field
              >
            </div>
            <div class="w-full sm:w-1/6 px-2">
              <nsw-field v-model="updateData.postalStreetType"
                >Street type</nsw-field
              >
            </div>
          </div>

          <div class="flex flex-row -mx-2">
            <nsw-field
              v-model="updateData.postalSuburb"
              class="w-1/2 sm:w-2/5 px-2"
              >Suburb</nsw-field
            >
            <nsw-field
              v-model="updateData.postalState"
              class="w-1/4 sm:w-1/5 px-2"
              >State</nsw-field
            >
            <nsw-field
              v-model="updateData.postalPostcode"
              class="w-1/4 sm:w-1/5 px-2"
              >Postcode</nsw-field
            >
          </div>

          <nsw-field v-model="updateData.postalCountry" class="w-full sm:w-1/2"
            >Country</nsw-field
          >
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
