<template>
  <div class="fixed right-0 bottom-0 transition-transform z-50" :style="iconStyle" @click="go2top">
    <span
      class="flex bg-light-600 rounded text-3xl hover:bg-light-400 text-gray-600 cursor-pointer"
    >
      <i-ic-round-arrow-upward />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

function go2top() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const pos = useWindowScroll()

const iconStyle = computed(() => {
  const r = pos.y.value > 100 ? '-3rem' : '2rem'

  return `transform: translate(-2rem, ${r})`
})
</script>
