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
          <h1 :class="[sticky ? 'text-xl' : '']">
            Personal Information Updated
          </h1>
          <div class="flex flex-row space-x-4">
            <nsw-button @click="saveAndGo('/identity')">Done</nsw-button>
            <nsw-button :secondary="true" @click="saveAndGo('/')"
              >Return to All Services</nsw-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 mb-8 flex flex-col space-y-8 flex-grow">
      <div class="border-2 border-outline"></div>

      <div class="flex flex-col space-y-8">
        <div class="flex flex-col space-y-4">
          <p>You have updated the following personal information</p>

          <div class="border-2 border-outline rounded-lg p-6 space-y-6">
            <div
              v-if="stagedChanges.email || stagedChanges.mobile"
              class="flex flex-col space-y-2"
            >
              <h5>Contact Information</h5>

              <div class="flex flex-col space-y-4">
                <div v-if="stagedChanges.email" class="flex flex-row space-x-8">
                  <div class="w-1/2">
                    <p class="text-xs">Current email:</p>
                    <p>{{ profile.email }}</p>
                  </div>
                  <div class="w-1/2">
                    <p class="text-xs">New email:</p>
                    <p>{{ stagedChanges.email }}</p>
                  </div>
                </div>
                <div
                  v-if="stagedChanges.mobile"
                  class="flex flex-row space-x-8"
                >
                  <div class="w-1/2">
                    <p class="text-xs">Current mobile:</p>
                    <p>{{ profile.mobile }}</p>
                  </div>
                  <div class="w-1/2">
                    <p class="text-xs">New mobile:</p>
                    <p>{{ stagedChanges.mobile }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="
                stagedChanges.residentialUnit ||
                stagedChanges.residentialNumber ||
                stagedChanges.residentialStreetName ||
                stagedChanges.residentialStreetType ||
                stagedChanges.residentialSuburb ||
                stagedChanges.residentialState ||
                stagedChanges.residentialPostcode ||
                stagedChanges.residentialCountry
              "
              class="flex flex-col space-y-2"
            >
              <div class="font-bold">Residential Address</div>

              <div class="flex flex-row space-x-8">
                <div class="flex flex-col space-y-1 w-1/2">
                  <p class="text-xs">Old Address:</p>
                  <p>
                    {{ profile.residentialUnit
                    }}<span v-if="profile.residentialUnit">/</span
                    >{{ profile.residentialNumber }}
                    {{ profile.residentialStreetName }}
                    {{ profile.residentialStreetType }}
                  </p>
                  <p>
                    {{ profile.residentialSuburb }},
                    {{ profile.residentialState }},
                    {{ profile.residentialPostcode }}
                  </p>
                  <p>{{ profile.residentialCountry }}</p>
                </div>

                <div class="flex flex-col space-y-1 w-1/2">
                  <p class="text-xs">Updated Address:</p>
                  <p>
                    {{ stagedChanges.residentialUnit || profile.residentialUnit
                    }}<span
                      v-if="
                        stagedChanges.residentialUnit || profile.residentialUnit
                      "
                      >/</span
                    >{{
                      stagedChanges.residentialNumber ||
                      profile.residentialNumber
                    }}
                    {{
                      stagedChanges.residentialStreetName ||
                      profile.residentialStreetName
                    }}
                    {{
                      stagedChanges.residentialStreetType ||
                      profile.residentialStreetType
                    }}
                  </p>
                  <p>
                    {{
                      stagedChanges.residentialSuburb ||
                      profile.residentialSuburb
                    }},
                    {{
                      stagedChanges.residentialState ||
                      profile.residentialState
                    }},
                    {{
                      stagedChanges.residentialPostcode ||
                      profile.residentialPostcode
                    }}
                  </p>
                  <p>
                    {{
                      stagedChanges.residentialCountry ||
                      profile.residentialCountry
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-if="
                stagedChanges.postalUnit ||
                stagedChanges.postalNumber ||
                stagedChanges.postalStreetName ||
                stagedChanges.postalStreetType ||
                stagedChanges.postalSuburb ||
                stagedChanges.postalState ||
                stagedChanges.postalPostcode ||
                stagedChanges.postalCountry
              "
              class="flex flex-col space-y-4"
            >
              <div class="font-bold">Postal Address</div>

              <div class="flex flex-row space-x-8">
                <div class="flex flex-col space-y-1 w-1/2">
                  <p class="text-xs">Old Address:</p>
                  <p>
                    {{ profile.postalUnit
                    }}<span v-if="profile.postalUnit">/</span
                    >{{ profile.postalNumber }}
                    {{ profile.postalStreetName }}
                    {{ profile.postalStreetType }}
                  </p>
                  <p>
                    {{ profile.postalSuburb }}, {{ profile.postalState }},
                    {{ profile.postalPostcode }}
                  </p>
                  <p>{{ profile.postalCountry }}</p>
                </div>

                <div class="flex flex-col space-y-1 w-1/2">
                  <p class="text-xs">Updated Address:</p>
                  <p>
                    {{ stagedChanges.postalUnit || profile.postalUnit
                    }}<span
                      v-if="stagedChanges.postalUnit || profile.postalUnit"
                      >/</span
                    >{{ stagedChanges.postalNumber || profile.postalNumber }}
                    {{
                      stagedChanges.postalStreetName || profile.postalStreetName
                    }}
                    {{
                      stagedChanges.postalStreetType || profile.postalStreetType
                    }}
                  </p>
                  <p>
                    {{ stagedChanges.postalSuburb || profile.postalSuburb }},
                    {{ stagedChanges.postalState || profile.postalState }},
                    {{ stagedChanges.postalPostcode || profile.postalPostcode }}
                  </p>
                  <p>
                    {{ stagedChanges.postalCountry || profile.postalCountry }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <p>
            You have shared the updated information with the following
            directorates:
          </p>
          <div class="border-2 border-outline rounded-lg p-6">
            <ul class="list-disc ml-4 space-y-2">
              <div
                v-for="provider in Object.entries(sharingPreference)"
                :key="provider[0]"
              >
                <li v-if="provider[1]">
                  <span class="font-bold">
                    {{ getProvider(provider[0]).name }}
                  </span>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <p>
            As a result of sharing the updated information above, the following
            related actions will be automatically processed:
          </p>
          <div class="border-2 border-outline rounded-lg p-6">
            <ul class="list-disc ml-4 space-y-4">
              <div
                v-for="provider in Object.entries(sharingPreference)"
                :key="provider[0]"
                class="space-y-4"
              >
                <div
                  v-for="service in relatedServicesByProvider(
                    getProvider(provider[0]).id
                  )"
                  :key="service.id"
                  class="space-y-4"
                >
                  <li
                    v-for="action in service.actions.filter(
                      (action) => action.isRelated === true
                    )"
                    :key="action.id"
                  >
                    <p>
                      <span class="font-bold">{{ service.name }}</span> >
                      {{ action.type }} {{ action.name }}
                    </p>
                    <p class="text-sm">
                      {{ action.whatToExpect }}
                    </p>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t-2 border-shade">
      <div class="container mx-auto flex flex-row p-4 justify-end">
        <div class="flex flex-row space-x-4">
          <nsw-button @click="saveAndGo('/identity')">Done</nsw-button>
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
import { mapGetters } from 'vuex'
import _ from 'lodash'
import InfoBanner from '~/components/infoBanner.vue'
import MainFooter from '~/components/mainFooter.vue'
import mainNavigation from '~/components/mainNavigation.vue'

export default {
  name: 'EditCompletePage',
  components: { mainNavigation, InfoBanner, MainFooter },
  data() {
    return {
      sticky: false,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      providers: 'services/getServiceProviders',
      getProvider: 'services/getProvider',
      stagedChanges: 'profile/getStagedChanges',
      sharingPreference: 'profile/getSharingPreference',
      relatedServicesByProvider: 'services/getRelatedServicesByProvider',
    }),
  },
  methods: {
    toSentenceCase(str) {
      return _.upperFirst(_.lowerCase(str))
    },
    updateProfile() {
      this.$store.dispatch('profile/UPDATE_PROFILE')
    },
    addService(serviceId) {
      this.$store.dispatch('profile/ADD_SERVICE', serviceId)
    },
    addActivity(serviceId, message, actionId) {
      const payload = {
        text: message,
        service: serviceId,
        action: actionId,
        type: 'activity',
      }

      this.$store.dispatch('profile/ADD_ACTIVITY', payload)
    },
    saveAndGo(route) {
      this.updateProfile()

      Object.entries(this.sharingPreference).forEach((provider) => {
        this.relatedServicesByProvider(
          this.getProvider(provider[0]).id
        ).forEach((service) => {
          this.addService(service.id)

          service.actions.forEach((action) => {
            if (action.isRelated) {
              this.addActivity(service.id, action.relatedMessage, action.id)
            }
          })
        })
      })

      this.$router.push(route)
    },
    stuck(event) {
      this.sticky = event.sticked
    },
  },
}
</script>
