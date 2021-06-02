<template>
  <div>
    {{ count }}
    <button @click="count++">+</button>
    <button @click="count--">-</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'

const count = ref(0)
</script>
