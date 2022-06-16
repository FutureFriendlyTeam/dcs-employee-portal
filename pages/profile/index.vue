<template>
  <div class="h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky></main-navigation>

    <div class="container mx-auto px-4 my-8 flex flex-col space-y-8 flex-grow">
      <h1>My Profile</h1>

      <div class="border-2 border-outline"></div>

      <div
        class="flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0"
      >
        <div class="flex-grow flex flex-col space-y-6">
          <div class="border-2 border-outline rounded-lg">
            <div class="p-6 space-y-8">
              <div class="flex flex-col space-y-4">
                <h3>Employee Information</h3>

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

                <div>
                  <h5>Role</h5>
                  <p>
                    {{ profile.role }}
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
            </div>

            <div
              class="flex flex-row justify-end p-4 bg-shade border-t-2 border-outline rounded-b-lg"
            >
              <nuxt-link to="/profile/edit" class="no-underline"
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
