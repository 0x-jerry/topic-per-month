<template>
  <v-header>
    <div class="flex-1 flex">
      <v-logo />
    </div>
    <div class="flex-0 flex">
      <div class="flex items-end">
        <small class="mx-1 px-3 rounded-full border text-blue-500 border-blue-500">
          {{ article?.title }}
        </small>
        <small class="mx-1 px-3 rounded-full border text-blue-500 border-blue-500">
          {{ dayjs(article?.lastUpdateDate).format('YYYY.MM.DD HH:mm') }}
        </small>
        <small class="mx-1 px-3 rounded-full border text-blue-500 border-blue-500">
          {{ data.wordsCount }} 字
        </small>
        <small
          class="mx-1 px-3 rounded-full border text-gray-500 border-gray-500"
          v-for="o in article?.tags"
        >
          # {{ o }}
        </small>
      </div>
    </div>
  </v-header>
  <div class="pl-10 pr-70 pb-10 mt-20">
    <div ref="mdEl">
      <router-view />
    </div>
    <hr class="mt-15" />
    <div class="my-10">
      除非特殊说明，否则，本站文章均使用
      <v-link href="https://creativecommons.org/licenses/by-nc/4.0/"> CC BY-NC 4.0 </v-link>
      许可。
    </div>
    <hr />
    <v-giscus class="py-10" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import conf from 'virtual:site'
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { scrollToAnchor } from '../utils'
import dayjs from 'dayjs'
import { wordsCount } from 'words-count'

const route = useRoute()

const article = computed(() => {
  const routePath = route.path.slice('/docs/'.length)

  return conf.articles.find((a) => a.routePath === routePath)
})

const scrollPos = useWindowScroll()

const mdEl = ref<HTMLDivElement>()

const data = reactive({
  wordsCount: 0,
})

onMounted(() => {
  initTocLinks()
  calcWordsCount()
})

onUpdated(() => {
  initTocLinks()
  calcWordsCount()
})

const router = useRouter()

function calcWordsCount() {
  if (!mdEl.value) return
  const els = mdEl.value.querySelectorAll('div.line-numbers-mode')

  let codeCount = 0
  els.forEach((el) => {
    codeCount += wordsCount((el as HTMLElement).innerText)
  })

  data.wordsCount = wordsCount(mdEl.value.innerText) - codeCount
}

function initTocLinks() {
  const toc = document.querySelector('.table-of-contents')
  if (!toc) return
  if (toc?.getAttribute('data-init') === '1') return
  toc.setAttribute('data-init', '1')

  updateTocActive()

  const lis = toc.querySelectorAll('li')

  lis?.forEach((li) => {
    li.setAttribute('title', li.querySelector('a')?.innerText || '')
    const a = li.querySelector('a')
    if (!a) {
      return
    }

    a.addEventListener('click', (e) => {
      e.preventDefault()
      scrollToAnchor(a.href, router)
    })
  })
}

function updateTocActive() {
  const toc = document.querySelector('.table-of-contents')
  if (!toc) return

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

  const firstLink = linksTop[0]
  const lastLink = linksTop[linksTop.length - 1]

  const idx =
    scrollPos.y.value <= firstLink.top
      ? 0
      : scrollPos.y.value >= lastLink.top
      ? linksTop.length - 1
      : linksTop.findIndex((l) => l.top - 100 > scrollPos.y.value) - 1

  links.forEach((li) => li.classList.remove('active'))
  links.item(idx)?.classList.add('active')
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
    // @apply text-blue-500 hover:text-blue-600;

    code {
      color: inherit !important;
    }
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

  ol,
  ul {
    padding-left: 1.5em;

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

  @apply fixed top-24 right-10 bg-white z-50 border-gray-200;

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    left: 0px;
    @apply border-l border-gray-200;
  }

  ul {
    list-style: none;
    padding-left: 0;
    line-height: 1.3em;

    li {
      margin: 0;
    }
  }

  & li a {
    color: inherit;
    @apply block pl-3 py-2px;

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
    @apply pl-5 m-0;
  }
}
</style>
