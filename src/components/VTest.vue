<template>
  <div class="test">
    <button @click="data.count++">+click me+{{ data.count }}</button>
    <div class="text-red-400">
      <slot name="header" :count="data.count"></slot>
    </div>

    vue container test.
    <br />
    props.a: {{ props.a }}
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, reactive } from 'vue'

const props = defineProps({
  a: String,
})

const data = reactive({
  count: 0,
})
</script>

<style lang="less">
.test {
  @apply bg-gray-200;
}
</style>
