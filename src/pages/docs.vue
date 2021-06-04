<template>
  <header class="py-3 px-3 transition-shadow flex bg-white fixed-top" :class="shadowClass">
    <div class="flex-1 flex">
      <h1 class="text-4xl">
        {{ article?.title }}
      </h1>
    </div>
    <div class="flex-0 flex items-center">
      <router-link
        to="/"
        class="flex bg-light-600 rounded text-3xl hover:bg-light-400 text-gray-600"
      >
        <i-ic-baseline-arrow-back />
      </router-link>
    </div>
  </header>
  <div class="px-5 mt-20">
    <router-view />
  </div>
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

import { useInteractiveShadow } from '../hooks'
const shadowClass = useInteractiveShadow()
</script>
