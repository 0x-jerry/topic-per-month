<template>
  <div class="comments" ref="el"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const el = ref<HTMLDivElement>()

onMounted(() => {
  if (el.value) {
    const script = createScript()
    el.value.appendChild(script)
  }
})

function createScript() {
  const script = document.createElement('script')

  script.src = 'https://giscus-henna.vercel.app/client.js'
  script.crossOrigin = 'anonymous'
  script.async = true

  script.setAttribute('data-repo', '0x-jerry/topic-per-month')
  script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNzI2NzI5NzA=')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMzMDMwODM4')
  script.setAttribute('data-mapping', 'og:title')
  script.setAttribute('data-reactions-enabled', '0')
  script.setAttribute('data-theme', 'light')
  return script
}
</script>
