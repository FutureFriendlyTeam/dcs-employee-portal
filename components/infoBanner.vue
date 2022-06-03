<template>
  <div v-if="banner" class="bg-red text-white text-sm">
    <div class="container mx-auto">
      <div class="flex flex-row justify-between">
        <div class="px-4 py-3">
          In a life threatening emergency dial Triple Zero (000)
        </div>
        <div class="bg-red px-4 py-3 mr-4">Emergency contact</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
