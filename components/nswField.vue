<template>
  <div
    class="flex"
    :class="[
      horizontal ? 'flex-row space-x-4 items-center' : 'flex-col space-y-2',
    ]"
  >
    <label class="text-sm md:text-base font-medium"><slot></slot></label>
    <input
      v-model="inputVal"
      class="border-2 border-divider rounded p-2 flex-grow"
      :type="inputType"
    />
  </div>
</template>

<script>
export default {
  props: {
    horizontal: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    password: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    inputType() {
      return this.password ? 'password' : 'text'
    },
  },
}
</script>

<style lang="scss" scoped></style>
