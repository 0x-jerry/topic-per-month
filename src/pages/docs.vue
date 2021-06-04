<template>
  <div>
    <a @click="$router.back()"> goback </a>
  </div>
  <div>title: {{ article?.title }}</div>
  <div>tags: {{ article?.tags }}</div>
  <hr />
  <router-view />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import conf from 'virtual:site'
import { computed } from '@vue/runtime-core'

const r = useRoute()

const article = computed(() => {
  const routePath = r.path.split('/').pop()

  return conf.articles.find((a) => a.routePath === routePath)
})
</script>
