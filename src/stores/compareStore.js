import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useWeatherStore } from '@/stores/weatherStore.js'

const MAX_COMPARE = 3

export const useCompareStore = defineStore('compare', () => {
  const weatherStore = useWeatherStore()

  const compareIds = ref([])

  // 담은 순서를 유지하고, 아직 응답이 없는 도시는 걸러 낸다
  const compareCities = computed(() =>
    compareIds.value
      .map((id) => weatherStore.cities.find((city) => city.id === id))
      .filter((city) => city !== undefined),
  )
  const compareCount = computed(() => compareIds.value.length)
  const canAdd = computed(() => compareIds.value.length < MAX_COMPARE)

  const hottest = computed(() =>
    compareCities.value.length === 0
      ? null
      : [...compareCities.value].sort((a, b) => b.temp - a.temp)[0],
  )
  const coldest = computed(() =>
    compareCities.value.length === 0
      ? null
      : [...compareCities.value].sort((a, b) => a.temp - b.temp)[0],
  )
  const tempGap = computed(() =>
    compareCities.value.length < 2 ? 0 : hottest.value.temp - coldest.value.temp,
  )

  const isComparing = (cityId) => compareIds.value.includes(cityId)

  function toggleCompare(cityId) {
    if (isComparing(cityId)) {
      compareIds.value = compareIds.value.filter((id) => id !== cityId)
      return
    }
    if (!canAdd.value) return
    compareIds.value = [...compareIds.value, cityId]
  }

  function removeCompare(cityId) {
    compareIds.value = compareIds.value.filter((id) => id !== cityId)
  }

  function clearCompare() {
    compareIds.value = []
  }

  return {
    compareIds,
    maxCompare: MAX_COMPARE,
    compareCities,
    compareCount,
    canAdd,
    hottest,
    coldest,
    tempGap,
    isComparing,
    toggleCompare,
    removeCompare,
    clearCompare,
  }
})
