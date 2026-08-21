import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { fetchCurrentWeather } from '@/api/openWeather.js'
import { fetchUvBatch } from '@/api/openMeteo.js'
import { toCityWeather } from '@/api/mapWeather.js'
import { cityRegistry, weatherMockData } from '@/components/exercise/weather/weatherData.js'

export const useWeatherStore = defineStore('weather', () => {
  const cities = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const lastUpdated = ref(null)

  const hasData = computed(() => cities.value.length > 0)
  const cityCount = computed(() => cities.value.length)
  const lastUpdatedLabel = computed(() =>
    lastUpdated.value ? lastUpdated.value.toLocaleTimeString('ko-KR') : '',
  )

  const findCity = (cityId) => cities.value.find((city) => city.id === cityId) ?? null

  // 도시별 현재 날씨 10건과 자외선 1건을 병렬로 호출한다
  async function loadCities() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const [owmResults, meteoRes] = await Promise.all([
        Promise.all(cityRegistry.map((city) => fetchCurrentWeather(city.lat, city.lon))),
        fetchUvBatch(cityRegistry),
      ])

      cities.value = cityRegistry.map((city, index) =>
        toCityWeather(city, owmResults[index].data, meteoRes.data[index]),
      )
      lastUpdated.value = new Date()
      console.log(`🟢 [API 통신 완료] ${cities.value.length}개 도시 동기화:`, cities.value)
    } catch (error) {
      console.error('🔴 날씨 API 연동 실패:', error)
      errorMessage.value = '실시간 날씨를 불러오지 못했습니다. Mock 데이터로 표시합니다.'
      // 폴백: 통신 실패에도 화면이 비지 않게 한다
      cities.value = weatherMockData
    } finally {
      isLoading.value = false
    }
  }

  return {
    cities,
    isLoading,
    errorMessage,
    lastUpdated,
    hasData,
    cityCount,
    lastUpdatedLabel,
    findCity,
    loadCities,
  }
})
