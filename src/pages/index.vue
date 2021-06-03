<template>
  <ul>
    <li v-for="o in conf.menus">
      <router-link :to="`/docs/${o}`">
        {{ o }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import conf from 'virtual:site'
</script>
