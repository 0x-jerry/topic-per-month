import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue-demi'

export function useInteractiveShadow() {
  const pos = useWindowScroll()

  return computed(() => [
    'card',
    {
      'card-lg': pos.y.value > 50,
    },
  ])
}
