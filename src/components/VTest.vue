<template>
  <div class="test">
    <div class="text-red-400">
      <slot name="header"></slot>
    </div>

    vue container test.
    <br />
    props.a: {{props.a}}
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue-demi'

const props = defineProps({
  a: String,
})
</script>

<style lang="less">
.test {
  @apply bg-gray-200;
}
</style>
