<template>
  <div>
    <div v-if="!checkMyService(service.id)">
      <nsw-button @click="add()">Add to my services</nsw-button>
    </div>
    <div v-else>
      <nsw-button @click="remove()">Remove from my services</nsw-button>
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
      checkMyService: 'profile/checkMyService',
    }),
  },
  methods: {
    add() {
      this.$store.dispatch('profile/ADD_SERVICE', this.service.id)
    },
    remove() {
      this.$store.dispatch('profile/REMOVE_SERVICE', this.service.id)
    },
  },
}
</script>
