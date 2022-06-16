<template>
  <div class="min-h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation></main-navigation>

    <bread-crumbs :service="getService(serviceId)"></bread-crumbs>

    <div class="container mx-auto py-8 px-4 space-y-8 flex-grow">
      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0"
      >
        <div>
          <div
            class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:items-center"
          >
            <!-- <img
              class="w-8 h-8"
              :alt="`${getService(serviceId).category} icon`"
              :src="
                require('@/assets/images/icons/categories/' + icon + '.svg')
              "
            /> -->
            <h1 class="text-primary">
              {{ getService(serviceId).name }}
            </h1>
          </div>
          <p
            :class="[
              profile.identityStrengthLevel < service.identityStrengthLevel
                ? 'text-red'
                : 'text-divider',
            ]"
          >
            <span
              v-if="
                profile.identityStrengthLevel < service.identityStrengthLevel
              "
            >
              {{ service.identityStrength }} strength required ✕
            </span>
            <span v-else
              >{{ service.identityStrength }} identity strength ✓</span
            >
          </p>
        </div>

        <div>
          <my-services-button
            :service="getService(serviceId)"
          ></my-services-button>
        </div>
      </div>
      <div class="border-2 border-outline"></div>

      <div
        class="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0"
      >
        <div class="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 space-y-4">
          <nuxt-link to="/library" class="no-underline">
            <nsw-button secondary>← Back to library</nsw-button>
          </nuxt-link>

          <div class="hidden md:flex flex-col space-y-2">
            <h3>{{ service.serviceProvider }}</h3>

            <div class="flex flex-col space-y-1 text-sm">
              <div
                v-for="item in getServicesByProvider(service.serviceProviderId)"
                :key="item.id"
              >
                <nuxt-link :to="`/services/${item.id}--${item.name}`">
                  {{ item.name }}
                </nuxt-link>
              </div>
            </div>

            <h3>{{ service.category }}</h3>

            <div class="flex flex-col space-y-1 text-sm">
              <div
                v-for="item in getServicesByCategory(service.categoryId)"
                :key="item.id"
              >
                <nuxt-link :to="`/services/${item.id}--${item.name}`">
                  {{ item.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 space-y-8">
          <div>
            {{ service.description }}
          </div>

          <div
            v-if="service.actions.length > 0"
            class="flex flex-row flex-wrap -mx-2"
          >
            <div
              v-for="action in service.actions"
              :key="action.id"
              class="w-full lg:w-1/2 px-2 mb-4 flex flex-col"
            >
              <action-tile
                :action="action"
                :service-id="serviceId"
              ></action-tile>
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
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      getService: 'services/getService',
      getServicesByProvider: 'services/getServicesByProvider',
      getServicesByCategory: 'services/getServicesByCategory',
    }),
    service() {
      return this.getService(this.serviceId)
    },
    icon() {
      return this.getService(this.serviceId).icon
        ? this.getService(this.serviceId).icon
        : this.getService(this.serviceId).categoryId
    },
  },
}
</script>
