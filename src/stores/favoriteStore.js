import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useWeatherStore } from '@/stores/weatherStore.js'

export const useFavoriteStore = defineStore('favorite', () => {
  // 도시 객체가 아니라 id만 저장해, 데이터 출처가 바뀌어도 영향을 받지 않는다
  const weatherStore = useWeatherStore()

  const favoriteIds = ref([])

  const favoriteCities = computed(() =>
    weatherStore.cities.filter((city) => favoriteIds.value.includes(city.id)),
  )
  const favoriteCount = computed(() => favoriteIds.value.length)

  const isFavorite = (cityId) => favoriteIds.value.includes(cityId)

  function toggleFavorite(cityId) {
    if (isFavorite(cityId)) {
      favoriteIds.value = favoriteIds.value.filter((id) => id !== cityId)
      return
    }
    favoriteIds.value = [...favoriteIds.value, cityId]
  }

  return { favoriteIds, favoriteCities, favoriteCount, isFavorite, toggleFavorite }
})
