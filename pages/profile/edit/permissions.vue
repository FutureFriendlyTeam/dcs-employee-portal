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
              Step 2 of 2
            </h4>
            <h2 :class="[sticky ? 'text-lg' : '']">Sharing my data</h2>
          </div>
          <div>
            <nuxt-link to="/identity/edit/complete" class="no-underline"
              ><nsw-button>Submit Update</nsw-button></nuxt-link
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

      <div class="space-y-1">
        <p>
          At all times the ACT government aims to collect only your personal
          information that it reasonably requires in order to deliver services.
        </p>
        <p>
          In some situations we will need a minimum set of data to provide
          services or assistance to you. If you choose not to share that
          required data we will be unable to render that service.
        </p>
        <p>
          Please select your preferences below for the sharing of your updated
          identity data to ACT Government directorates.
        </p>
      </div>

      <div class="flex-grow space-y-4">
        <div
          v-for="provider in providers"
          :key="provider.id"
          class="flex flex-col space-y-6"
        >
          <provider-permissions
            :provider="provider"
            @share="setShare"
          ></provider-permissions>
        </div>
      </div>
    </div>

    <div class="border-t-2 border-shade">
      <div class="container mx-auto flex flex-row p-4 justify-end">
        <div>
          <nuxt-link to="/identity/edit/complete" class="no-underline"
            ><nsw-button>Submit Update</nsw-button></nuxt-link
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
import _ from 'lodash'
import InfoBanner from '~/components/infoBanner.vue'
import MainFooter from '~/components/mainFooter.vue'
import mainNavigation from '~/components/mainNavigation.vue'
import ProviderPermissions from '~/components/providerPermissions.vue'

export default {
  name: 'EditPermissionsPage',
  components: { mainNavigation, InfoBanner, MainFooter, ProviderPermissions },
  data() {
    return {
      sticky: false,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      providers: 'services/getServiceProviders',
      stagedChanges: 'profile/getStagedChanges',
    }),
  },
  methods: {
    toSentenceCase(str) {
      return _.upperFirst(_.lowerCase(str))
    },
    setShare(value, provider) {
      this.$store.dispatch('profile/ADD_TO_SHARED', { provider, value })
    },
    stuck(event) {
      this.sticky = event.sticked
    },
  },
}
</script>
