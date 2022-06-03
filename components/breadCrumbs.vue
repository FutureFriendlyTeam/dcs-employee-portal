<template>
  <div class="bg-outline text-primary text-sm py-2">
    <div class="container mx-auto px-4">
      <nuxt-link to="/">All Services</nuxt-link>
      >
      <span v-if="sort === 'provider'">
        {{ service.serviceProvider }}
      </span>
      <span v-if="sort === 'category'">
        {{ service.category }}
      </span>
      >
      <span class="font-bold"> {{ service.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    service: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters({
      sort: 'global/getSort',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
