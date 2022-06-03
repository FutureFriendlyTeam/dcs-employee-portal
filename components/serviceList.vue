<template>
  <div>
    <div v-if="filteredServices.length > 0">
      <div v-if="sort === 'provider'">
        <div
          v-for="provider in serviceProviders"
          :id="provider.id"
          :key="provider.id"
        >
          <div
            v-if="filteredServicesProviderCount(provider.id) > 0"
            class="my-4"
          >
            <h3>{{ provider.name }}</h3>
            <p class="text-sm">
              {{ filteredServicesProviderCount(provider.id) }} Service<span
                v-if="filteredServicesProviderCount(provider.id) > 1"
                >s</span
              >
            </p>

            <div class="flex flex-row flex-wrap -mx-2 mt-2">
              <div
                v-for="service in filteredServicesByProvider(provider.id)"
                :key="service.id"
                class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4"
              >
                <service-tile :service="service"></service-tile>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="sort === 'category'">
        <div
          v-for="category in serviceCategories"
          :id="category.id"
          :key="category.id"
        >
          <div
            v-if="filteredServiceCategoryCount(category.id) > 0"
            class="my-4"
          >
            <h3>{{ category.name }}</h3>
            <p class="text-sm">
              {{ filteredServiceCategoryCount(category.id) }} Service<span
                v-if="filteredServiceCategoryCount(category.id) > 1"
                >s</span
              >
            </p>

            <div class="flex flex-row flex-wrap -mx-2 mt-2">
              <div
                v-for="service in filteredServicesByCategory(category.id)"
                :key="service.id"
                class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4"
              >
                <service-tile :service="service"></service-tile>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <h3>No matching services</h3>
      <p>Try another search term</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import serviceTile from './serviceTile.vue'

export default {
  components: { serviceTile },
  props: {
    sort: {
      type: String,
      default: 'provider',
    },
    filter: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      getServices: 'services/getServices',
      serviceProviders: 'services/getServiceProviders',
      serviceProviderCount: 'services/getServiceProviderCount',
      servicesByProvider: 'services/getServicesByProvider',
      serviceCategories: 'services/getServiceCategories',
      serviceCategoryCount: 'services/getServiceCategoryCount',
      servicesByCategory: 'services/getServicesByCategory',
    }),
    filteredServices() {
      return this.getServices.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(this.filter.toLowerCase().replace(/\s/g, ''))
      )
    },
  },
  methods: {
    filteredServicesByProvider(provider) {
      return this.servicesByProvider(provider).filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(this.filter.toLowerCase().replace(/\s/g, ''))
      )
    },
    filteredServicesProviderCount(provider) {
      return this.servicesByProvider(provider).filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(this.filter.toLowerCase().replace(/\s/g, ''))
      ).length
    },
    filteredServicesByCategory(category) {
      return this.servicesByCategory(category).filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(this.filter.toLowerCase().replace(/\s/g, ''))
      )
    },
    filteredServiceCategoryCount(category) {
      return this.servicesByCategory(category).filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(this.filter.toLowerCase().replace(/\s/g, ''))
      ).length
    },
  },
}
</script>

<style lang="scss" scoped></style>
