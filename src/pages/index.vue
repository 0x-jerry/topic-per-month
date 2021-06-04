<template>
  <ul>
    <li v-for="o in conf.articles">
      <div v-if="o.publish || isDev">
        <router-link :to="`/docs/${o.routePath}`">
          {{ o.title }}
        </router-link>
      </div>
      <div v-else>
        <div v-if="o.visible">{{ o.title }} 「施工中」</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import conf from 'virtual:site'

const isDev = import.meta.env.DEV
</script>
