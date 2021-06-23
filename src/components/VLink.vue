<script lang="ts" setup>
import { reactive } from '@vue/reactivity'
import { defineProps, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { scrollToAnchor } from '../utils'

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})

const data = reactive({
  isRelative: false,
  isAnchor: false,
})

watchEffect(() => {
  data.isRelative = !/^https?/.test(props.href)
  data.isAnchor = props.href.startsWith('#')
})

const router = useRouter()

function scrollToAnchorEvent(e: MouseEvent) {
  e.preventDefault()
  scrollToAnchor(props.href, router)
}
</script>

<template>
  <span class="link">
    <a v-if="data.isAnchor" :href="props.href" @click="scrollToAnchorEvent">
      <slot />
    </a>
    <router-link v-else-if="data.isRelative" :to="props.href">
      <slot />
    </router-link>
    <a v-else :href="props.href" target="_blank">
      <span>
        <slot />
      </span>
      <i-line-md-external-link-rounded />
    </a>
  </span>
</template>

<style lang="less" scoped>
.link {
  @apply text-gray-800 hover:text-blue-500 transition-colors;
}
</style>
