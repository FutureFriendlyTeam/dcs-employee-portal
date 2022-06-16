<template>
  <div class="min-h-screen flex flex-col">
    <info-banner></info-banner>

    <main-navigation v-sticky></main-navigation>

    <div class="container mx-auto py-8 px-4 space-y-8">
      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0"
      >
        <h1>{{ profile.firstName }}'s Checklist</h1>

        <nuxt-link
          to="/profile"
          class="no-underline border-2 border-outline rounded pl-3 pr-6 py-3 flex flex-row space-x-4 transform transition-transform ease-out duration-100 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <img class="w-12 h-12 bg-divider rounded-sm" />
          <div class="flex flex-col space-y-1">
            <h4 class="text-primary">
              {{ profile.firstName }} {{ profile.lastName }}
            </h4>

            <p class="text-xs text-divider">
              {{ profile.role }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="border border-shade"></div>

    <div class="container mx-auto py-8 px-4 space-y-8">
      <div v-for="list in lists" :key="list">
        <div v-if="getTasksByList(list).length > 0" class="space-y-4">
          <h2>{{ list }}</h2>

          <div class="flex flex-col space-y-2">
            <div v-for="(task, index) in getTasksByList(list)" :key="task.id">
              <checklist-item
                :task="task"
                :status="
                  index === 0 && list === 'Day 1' ? 'active' : 'inactive'
                "
              ></checklist-item>
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
  name: 'IndexPage',
  data() {
    return {
      searchTerm: '',
      sticky: false,
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
      lists: 'checklist/getLists',
      getTasksByList: 'checklist/getTasksByList',
      getAuthState: 'global/getAuthState',
    }),
  },
  methods: {
    stuck(event) {
      this.sticky = event.sticked
    },
  },
}
</script>
