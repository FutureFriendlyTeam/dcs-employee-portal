<template>
  <div>
    <div v-if="sort === 'provider'">
      <div v-for="provider in serviceProviders" :key="provider.id">
        <a
          v-if="serviceProviderCount(provider.id) > 0"
          v-scroll-to="`#${provider.id}`"
          href="#"
        >
          {{ provider.name }}
        </a>
      </div>
    </div>

    <div v-if="sort === 'category'" class="flex flex-col">
      <div v-for="category in serviceCategories" :key="category.id">
        <a
          v-if="serviceCategoryCount(category.id) > 0"
          v-scroll-to="`#${category.id}`"
          href="#"
        >
          {{ category.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    sort: {
      type: String,
      default: 'provider',
    },
  },
  computed: {
    ...mapGetters({
      serviceProviders: 'services/getServiceProviders',
      serviceProviderCount: 'services/getServiceProviderCount',
      servicesByProvider: 'services/getServicesByProvider',
      serviceCategories: 'services/getServiceCategories',
      serviceCategoryCount: 'services/getServiceCategoryCount',
      servicesByCategory: 'services/getServicesByCategory',
    }),
  },
}
</script>
