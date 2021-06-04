<template>
  <header class="py-3 card transition-shadow" :class="shadowClass">
    <router-link to="/">
      <h1 class="text-4xl font-mono text-gray-500 hover:text-gray-600 text-center">每月一「题」</h1>
    </router-link>
  </header>

  <ul class="flex flex-wrap">
    <li v-for="o in conf.articles">
      <router-link
        :to="`/docs/${o.routePath}`"
        class="card block my-4 mx-2 p-5 capitalize transition-shadow hover:card-lg"
      >
        {{ o.title }}
        <span v-if="o.visible">- 施工中</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import conf from 'virtual:site'

const isDev = import.meta.env.DEV
if (isDev) {
  console.log('site config', conf)
}

import { useInteractiveShadow } from '../hooks'
const shadowClass = useInteractiveShadow()
</script>
