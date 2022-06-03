<template>
  <div class="h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky></main-navigation>

    <div class="container mx-auto px-4 my-8 flex flex-col space-y-8 flex-grow">
      <h1>My Identity</h1>

      <div class="border-2 border-outline"></div>

      <div
        class="flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0"
      >
        <div class="lg:w-1/4 space-y-2">
          <nuxt-link to="/" class="no-underline">
            <nsw-button secondary>← Back to All Services</nsw-button>
          </nuxt-link>
        </div>

        <div class="flex-grow flex flex-col space-y-6">
          <div class="border-2 border-outline rounded-lg">
            <div
              class="flex flex-row justify-end p-4 bg-shade border-t-2 border-outline rounded-b-lg"
            >
              <nuxt-link to="/identity/strength/upgrade" class="no-underline"
                ><nsw-button>Upgrade Identity Strength</nsw-button></nuxt-link
              >
            </div>
          </div>

          <div class="border-2 border-outline rounded-lg">
            <div class="p-6 space-y-8">
              <div class="flex flex-col space-y-4">
                <h3>Personal Information</h3>

                <div>
                  <h5>Name</h5>
                  <p>
                    {{ profile.firstName }} {{ profile.middleName }}
                    {{ profile.lastName }}
                  </p>
                </div>

                <div>
                  <h5>Date of birth</h5>
                  <p>
                    {{ profile.dateOfBirth }}
                  </p>
                </div>
              </div>

              <div class="flex flex-col space-y-4">
                <h3>Contact Information</h3>

                <div>
                  <h5>Email</h5>
                  <p>
                    {{ profile.email }}
                  </p>
                </div>

                <div>
                  <h5>Mobile</h5>
                  <p>
                    {{ profile.mobile }}
                  </p>
                </div>
              </div>

              <div class="flex flex-col space-y-4">
                <h3>Address Information</h3>

                <div>
                  <h5>Residential Address</h5>
                  <p>
                    {{ profile.residentialUnit }}
                    <span v-if="profile.residentialUnit">/</span>
                    {{ profile.residentialNumber }}
                    {{ profile.residentialStreetName }}
                    {{ profile.residentialStreetType }}
                    {{ profile.residentialSuburb }},
                    {{ profile.residentialState }},
                    {{ profile.residentialPostcode }}
                    {{ profile.residentialCountry }}
                  </p>
                </div>

                <div>
                  <h5>Postal Address</h5>
                  <p>
                    {{ profile.postalUnit }}
                    <span v-if="profile.postalUnit">/</span>
                    {{ profile.postalNumber }}
                    {{ profile.postalStreetName }}
                    {{ profile.postalStreetType }}
                    {{ profile.postalSuburb }}, {{ profile.postalState }},
                    {{ profile.postalPostcode }}
                    {{ profile.postalCountry }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex flex-row justify-end p-4 bg-shade border-t-2 border-outline rounded-b-lg"
            >
              <nuxt-link to="/identity/edit" class="no-underline"
                ><nsw-button>Edit</nsw-button></nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'IdentityPage',
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      identityDocuments: 'profile/getIdentityDocuments',
    }),
  },
  methods: {
    kebabCase(input) {
      return _.kebabCase(input)
    },
  },
}
</script>
