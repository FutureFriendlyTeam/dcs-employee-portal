<template>
  <div
    class="px-4 py-2 text-sm md:text-base font-bold rounded flex flex-row items-center justify-center cursor-pointer border-2"
    :class="[
      secondary
        ? 'bg-white text-primary border-divider hover:border-primary'
        : 'bg-primary text-white border-primary hover:bg-primary-dark',
      disabled
        ? 'bg-outline text-divider border-divider hover:border-divider hover:bg-outline cursor-not-allowed'
        : '',
    ]"
    @click="disabled ? null : $emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: true,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    slim: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
