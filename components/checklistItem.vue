<template>
  <div
    :class="[
      status === 'active' ? 'border border-outline shadow p-4 rounded' : 'p-4',
    ]"
    class="flex flex-row space-x-6 items-center cursor-pointer"
    @click="check = !check"
  >
    <div
      :class="[check ? 'bg-green-500 border-green-700' : 'border-divider']"
      class="w-8 h-8 border-2 rounded-full"
    ></div>

    <div class="flex-1 flex flex-col">
      <div class="flex flex-row justify-between">
        <h3>{{ task.name }}</h3>
        <p>{{ task.time }} mins</p>
      </div>
      <div v-if="status === 'active'">
        <p>{{ task.description }}</p>
        <p>{{ task.outcome }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default() {
        return {}
      },
    },
    status: {
      type: String,
      default: 'inactive',
    },
  },
  data() {
    return {
      check: false,
    }
  },
}
</script>
