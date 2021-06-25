<template>
  <v-header>
    <v-logo class="text-center" />
  </v-header>

  <ul class="flex flex-wrap mt-20">
    <li v-for="o in conf.articles">
      <router-link
        :to="`/docs/${o.routePath}`"
        class="
          border
          block
          my-4
          mx-2
          p-5
          min-w-50
          capitalize
          transition-colors
        border-gray-300
          hover:border-blue-400
          hover:text-blue-500
        "
      >
        {{ o.title }}
        <span v-if="!o.publish">- 施工中</span>
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
</script>
