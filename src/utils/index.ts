import { Router } from 'vue-router'

export function scrollToAnchor(anchorHref: string, router: Router) {
  const url = new URL(anchorHref, 'http://a.com')
  const hTarget = document.getElementById(url.hash.slice(1))

  router.push(url)

  const top = hTarget?.offsetTop
  if (!top) {
    return
  }

  window.scrollTo({
    top: top - 85,
    behavior: 'smooth',
  })
}
