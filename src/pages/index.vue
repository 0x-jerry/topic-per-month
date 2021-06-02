<template>
  <ul>
    <li v-for="o in menus">
      <router-link :to="`/${o}`">
        {{ o }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import menus from 'virtual:menus'
</script>
