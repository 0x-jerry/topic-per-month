<script lang="ts" setup>
import { reactive } from '@vue/reactivity'
import { defineProps } from 'vue'

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})

const data = reactive({
  isRelative: false,
})

try {
  new URL(props.href)
} catch {
  data.isRelative = true
}
</script>

<template>
  <div class="link">
    <router-link v-if="data.isRelative" :to="props.href">
      <slot />
    </router-link>
    <a v-else :href="props.href" target="_blank">
      <slot />
    </a>
  </div>
</template>

<style lang="less" scoped>
.link {
  @apply text-gray-800 hover:text-blue-500 transition-colors;
}
</style>
