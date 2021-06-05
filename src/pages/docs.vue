<template>
  <header class="py-3 px-10 transition-shadow flex bg-white fixed-top" :class="shadowClass">
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
  <div class="pl-10 pr-70 pb-10 mt-20">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import conf from 'virtual:site'
import { computed, onMounted, watch } from '@vue/runtime-core'

const r = useRoute()

const article = computed(() => {
  const routePath = r.path.split('/').pop()

  return conf.articles.find((a) => a.routePath === routePath)
})

import { useInteractiveShadow } from '../hooks'
import { useWindowScroll } from '@vueuse/core'
const shadowClass = useInteractiveShadow()
const scrollPos = useWindowScroll()

// respect toc
onMounted(() => {
  updateTocActive()
  const toc = document.querySelector('.table-of-contents')
  if (!toc) {
    return
  }

  const lis = toc.querySelectorAll('li')

  lis?.forEach((li) => {
    li.setAttribute('title', li.querySelector('a')?.innerText || '')
    const a = li.querySelector('a')
    const url = new URL(a?.href || '')
    const hTarget = document.getElementById(url.hash.slice(1))

    a?.addEventListener('click', (e) => {
      e.preventDefault()

      const top = hTarget?.offsetTop
      if (!top) {
        return
      }

      window.scrollTo({
        top: top - 85,
        behavior: 'smooth',
      })
    })
  })
})

function updateTocActive() {
  const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.table-of-contents li a')

  const linksTop = Array.from(links).map((link) => {
    const url = new URL(link?.href || '')
    const hTarget = document.getElementById(url.hash.slice(1))
    const top = hTarget?.offsetTop || 0

    return {
      link,
      top,
    }
  })

  const idx = linksTop.findIndex((l) => l.top - 100 > scrollPos.y.value) - 1

  const tIdx = idx < 0 ? 0 : idx

  links.forEach((li) => li.classList.remove('active'))
  links.item(tIdx)?.classList.add('active')
}

watch(() => scrollPos.y.value, updateTocActive)
</script>

<style lang="less">
.table-of-contents {
  width: 230px;
  height: 70vh;
  overflow: auto;

  @apply fixed top-24 right-10 bg-white;

  &::before {
    content: ' ';
    position: absolute;
    width: 1px;
    height: 100%;
    left: 0px;
    @apply border-l border-gray-200;
  }

  & li a {
    color: inherit;
    @apply block pl-3;

    @apply text-gray-500;

    &:hover,
    &.active {
      @apply text-gray-900;

      &::before {
        content: ' ';
        position: absolute;
        width: 1px;
        height: 18px;
        left: 0px;

        @apply border-l border-gray-900;
      }
    }
  }

  & ul ul li {
    @apply pl-5;
  }
}

.markdown-body {
  blockquote {
    padding: 16px 40px;
    margin: 0;
    box-sizing: border-box;

    @apply bg-light-700 relative;

    &::before {
      width: 8px;
      content: '';

      @apply absolute left-0 top-0 h-full bg-gray-500;
    }
  }

  a {
    @apply text-blue-500 hover:text-blue-600;
  }
}
</style>
