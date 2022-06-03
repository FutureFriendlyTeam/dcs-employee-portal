<template>
  <div class="min-h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky></main-navigation>

    <div class="container mx-auto py-8 px-4 space-y-8 flex-grow">
      <h1>Activity Log</h1>

      <div v-if="activities.length < 1">No recent activity</div>

      <div v-else class="space-y-2">
        <div v-for="activity in activities" :key="activity.action">
          <notification-tile
            :notification="activity"
            :dismissable="false"
          ></notification-tile>
        </div>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ActivityLog',
  computed: {
    ...mapGetters({
      activities: 'profile/getActivityLog',
    }),
  },
}
</script>
