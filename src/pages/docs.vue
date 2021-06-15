<template>
  <v-header>
    <div class="flex-1 flex">
      <v-logo />
    </div>
    <div class="flex-0 flex items-center">
      <h1 class="text-4xl">{{ article?.title }}</h1>
    </div>
  </v-header>
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

  return conf.articles.find(a => a.routePath === routePath)
})

import { useWindowScroll } from '@vueuse/core'
const scrollPos = useWindowScroll()

// respect toc
onMounted(() => {
  updateTocActive()
  const toc = document.querySelector('.table-of-contents')
  if (!toc) {
    return
  }

  const lis = toc.querySelectorAll('li')

  lis?.forEach(li => {
    li.setAttribute('title', li.querySelector('a')?.innerText || '')
    const a = li.querySelector('a')
    const url = new URL(a?.href || '')
    const hTarget = document.getElementById(url.hash.slice(1))

    a?.addEventListener('click', e => {
      e.preventDefault()

      const top = hTarget?.offsetTop
      if (!top) {
        return
      }

      window.scrollTo({
        top: top - 85,
        behavior: 'smooth'
      })
    })
  })
})

function updateTocActive() {
  const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.table-of-contents li a')

  const linksTop = Array.from(links).map(link => {
    const url = new URL(link?.href || '')
    const hTarget = document.getElementById(url.hash.slice(1))
    const top = hTarget?.offsetTop || 0

    return {
      link,
      top
    }
  })

  const idx = linksTop.findIndex(l => l.top - 100 > scrollPos.y.value) - 1

  const tIdx = idx < 0 ? 0 : idx

  links.forEach(li => li.classList.remove('active'))
  links.item(tIdx)?.classList.add('active')
}

watch(() => scrollPos.y.value, updateTocActive)
</script>

<style lang="less">
.markdown-body {
  @apply font-sans;

  blockquote {
    padding: 16px 40px;
    margin: 2em 0;
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

    code {
      color: inherit !important;
    }
  }

  code {
    @apply font-mono;
  }

  :not(pre) code {
    @apply text-red-600 px-2 py-1 bg-gray-100 rounded-sm;
  }

  p {
    line-height: 2.2em;
    margin: 1.3em 0;
  }

  h1 {
    @apply text-4xl;
    margin: 2em 0;
  }

  h2 {
    @apply text-3xl;
    margin: 1em 0;
  }

  h3 {
    @apply text-2xl;
    margin: 1em 0;
  }

  h4 {
    @apply text-1xl;
    margin: 1em 0;
  }

  h5,
  h6 {
    margin: 1em 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @offset: 0.8em;
    position: relative;
    left: @offset;

    &::before {
      content: '#';
      position: absolute;
      top: 0;
      left: -@offset;
      @apply text-blue-500;
    }

    // &:hover {
    //   &::before {
    //     @apply text-blue-500;
    //   }
    // }
  }

  ol,
  ul {
    padding-left: 1em;

    li {
      margin: 0.5em 0;
    }
  }

  ol {
    list-style: decimal;
  }

  ul {
    list-style: circle;
  }

  pre[class*='language-'] code {
    display: block;
    width: max-content;
  }

  .highlighted-line {
    background-color: #dbdbdb;
    display: block;
    width: 120%;
    // background-attachment: fixed;
    margin: 0 -1.575rem;
    padding: 0 1.575rem;
  }
}

.markdown-body .table-of-contents {
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

  ul {
    list-style: none;
    padding-left: 0;
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
</style>
