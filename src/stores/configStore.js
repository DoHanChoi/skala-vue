import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')

  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))

  // 인자를 받는 getter. 온도 변환식을 한 곳에만 둔다
  const toDisplayTemp = computed(
    () => (celsius) => (unit.value === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius),
  )

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return { unit, unitSymbol, toDisplayTemp, toggleUnit }
})
