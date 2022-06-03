<template>
  <div
    class="border-2 border-outline p-4 rounded-lg flex flex-col space-y-4 bg-shade"
  >
    <div
      class="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0"
    >
      <div
        class="flex flex-row space-x-2 flex-grow cursor-pointer"
        @click="open = !open"
      >
        <img
          :class="[open ? 'transform rotate-180' : '']"
          alt="chevron icon"
          src="@/assets/images/icons/chevron.svg"
        />
        <h3>{{ provider.name }}</h3>
      </div>

      <div class="flex felx-row space-x-2 items-center space-x-6 self-end">
        <p v-if="relatedServicesByProvider(provider.id).length > 0">
          {{ relatedServicesByProvider(provider.id).length }} actions
        </p>
        <label
          :for="provider.name"
          class="no-underline bg-white border-2 rounded px-3 py-2 space-x-2 h-full text-sm transform transition-transform ease-out duration-100 hover:shadow-md cursor-pointer break-words flex flex-row items-center"
          :class="[share ? 'border-primary' : 'border-outline']"
        >
          <span>Share data</span>

          <input
            :id="provider.name"
            v-model="share"
            value="true"
            type="checkbox"
            @input="$emit('input', !share, provider)"
          />
        </label>
      </div>
    </div>

    <div v-if="open" class="flex flex-col space-y-8 md:ml-8">
      <div class="flex flex-col space-y-4">
        <div>
          <h4>Updated Information</h4>
          <p>
            If you choose to share, the following updated information will be
            shared with
            {{ provider.name }} to update their records.
          </p>
        </div>

        <div
          class="border-2 border-outline rounded-lg p-6 bg-white flex flex-col space-y-4"
        >
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
              <div v-if="stagedChanges.mobile" class="flex flex-row space-x-8">
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
            <h5>Residential Address</h5>

            <div class="flex flex-row space-x-8">
              <div class="flex flex-col space-y-1 w-1/2">
                <p class="text-xs">Current Address:</p>
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
                  <span v-if="stagedChanges.residentialUnit === ''">{{
                    stagedChanges.residentialUnit
                  }}</span
                  ><span v-else>{{ profile.residentialUnit }}</span
                  ><span v-if="stagedChanges.residentialUnit !== ''">/</span
                  >{{
                    stagedChanges.residentialNumber || profile.residentialNumber
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
                    stagedChanges.residentialState || profile.residentialState
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
            <h5>Postal Address</h5>

            <div class="flex flex-row space-x-8">
              <div class="flex flex-col space-y-1 w-1/2">
                <p class="text-xs">Current Address:</p>
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
                  <span v-if="stagedChanges.postalUnit === ''">{{
                    stagedChanges.postalUnit
                  }}</span
                  ><span v-else>{{ profile.postalUnit }}</span
                  ><span v-if="stagedChanges.postalUnit !== ''">/</span
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

      <div
        v-if="relatedServicesByProvider(provider.id).length > 0"
        class="flex flex-col space-y-4"
      >
        <div>
          <h4>Related Actions</h4>
          <p>
            As a result of sharing the updated information above, the following
            related actions will be automatically processed with
            {{ provider.name }}.
          </p>
        </div>

        <div class="border-2 border-outline rounded-lg p-6 bg-white">
          <div class="flex flex-col space-y-4">
            <div
              v-for="service in relatedServicesByProvider(provider.id)"
              :key="service.id"
            >
              <div
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-4">
        <div>
          <h4>Data Usage</h4>
          <p>The following is the data usage policy of {{ provider.name }}.</p>
        </div>
        <div class="space-y-4 border-2 border-outline rounded-lg p-6 bg-white">
          <p>
            {{ provider.dataUsage }}
          </p>
          <p class="text-sm">
            Be agreeing to share information with {{ provider.name }}, you agree
            to the <a>Terms of Use</a> and <a>Privacy Statement</a> of
            {{ provider.name }}.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  props: {
    provider: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      share: true,
      open: false,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      stagedChanges: 'profile/getStagedChanges',
      relatedServicesByProvider: 'services/getRelatedServicesByProvider',
    }),
  },
  watch: {
    share: {
      handler() {
        this.$emit('share', this.share, this.provider)
      },
      immediate: true,
    },
  },
  methods: {
    toSentenceCase(str) {
      return _.upperFirst(_.lowerCase(str))
    },
  },
}
</script>
