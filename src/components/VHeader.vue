<script lang="ts" setup>
import { useInteractiveShadow } from '../hooks'
const shadowClass = useInteractiveShadow()
</script>

<template>
  <header class="py-3 px-10 transition-shadow flex bg-white fixed-top" :class="shadowClass">
    <slot />
  </header>
</template>
