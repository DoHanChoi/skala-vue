<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/weather/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/weather/SearchBar.vue'
import WeatherCard from '@/components/exercise/weather/WeatherCard.vue'
import WeatherSummary from '@/components/exercise/weather/WeatherSummary.vue'
import UvAlertBanner from '@/components/exercise/weather/UvAlertBanner.vue'
import { useFavoriteStore } from '@/stores/favoriteStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'

const router = useRouter()
const route = useRoute()
const favoriteStore = useFavoriteStore()
const weatherStore = useWeatherStore()

const weatherList = computed(() => weatherStore.cities)

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const sortByTemp = ref(false)
const uvAlert = ref('')

const filteredWeatherList = computed(() => {
  const search = searchQuery.value.trim()
  if (!search) return weatherList.value
  return weatherList.value.filter((city) => city.name.includes(search))
})

// 원본 불변을 위해 복사 후 정렬
const displayList = computed(() => {
  if (!sortByTemp.value) return filteredWeatherList.value
  return [...filteredWeatherList.value].sort((a, b) => b.temp - a.temp)
})

const resultCount = computed(() => displayList.value.length)

const avgTemp = computed(() => {
  if (displayList.value.length === 0) return 0
  const total = displayList.value.reduce((sum, city) => sum + city.temp, 0)
  return (total / displayList.value.length).toFixed(1)
})

const hottestCity = computed(() => {
  if (displayList.value.length === 0) return null
  return [...displayList.value].sort((a, b) => b.temp - a.temp)[0]
})

const statusMessage = computed(() => {
  if (!selectedCityInfo.value) return '카드를 클릭하거나 검색해 보세요.'
  return `${selectedCityInfo.value.name}이 선택되었습니다.`
})

watch(selectedCityInfo, (newCity, oldCity) => {
  const before = oldCity ? oldCity.name : '없음'
  console.log(
    `👁 [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${statusMessage.value}" (이전 선택: ${before})`,
  )

  uvAlert.value =
    newCity && newCity.uv >= 8
      ? `⚠️ ${newCity.name} 지역의 자외선이 매우 높습니다 (지수 ${newCity.uv}). 외출 시 주의하세요.`
      : ''
})

watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다...`,
  )
})

// 새로고침·링크 공유 대응: 주소창의 ?search= 를 읽어 복원
onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
})

watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    // undefined를 넣으면 키 자체가 URL에서 사라진다 (빈 ?search= 방지)
    query: { search: newQuery || undefined },
  })
})

const updateQuery = (value) => {
  searchQuery.value = value
}

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const toggleSort = () => {
  sortByTemp.value = !sortByTemp.value
}

const showDetail = (city) => {
  router.push(`/weather/${city.id}`)
}
</script>

<template>
  <div>
    <BaseDashboardCard title="🔍 도시 검색 (한글 즉시 동기화)">
      <SearchBar :query="searchQuery" @update-query="updateQuery" />
    </BaseDashboardCard>

    <n-alert
      v-if="weatherStore.errorMessage"
      class="error-banner"
      type="warning"
      :title="weatherStore.errorMessage"
    />

    <BaseDashboardCard title="📈 검색 결과 요약">
      <div class="refresh-row">
        <n-text v-if="weatherStore.lastUpdated" depth="3" style="font-size: 12px">
          🛰️ 마지막 갱신 <n-time :time="weatherStore.lastUpdated" type="relative" />
        </n-text>
        <n-button
          size="small"
          secondary
          :loading="weatherStore.isLoading"
          @click="weatherStore.loadCities"
        >
          🔄 새로고침
        </n-button>
      </div>

      <WeatherSummary
        :count="resultCount"
        :avg-temp="avgTemp"
        :hottest-city="hottestCity"
        :sort-by-temp="sortByTemp"
        apply-unit
        @toggle-sort="toggleSort"
      />
    </BaseDashboardCard>

    <BaseDashboardCard title="🗺️ 지역별 날씨 현황 (실시간 API 연동)">
      <n-space v-if="weatherStore.isLoading" vertical size="small">
        <n-skeleton v-for="n in 5" :key="n" :height="96" :sharp="false" />
      </n-space>

      <template v-else>
        <WeatherCard
          v-for="city in displayList"
          :key="city.id"
          :city="city"
          :is-selected="selectedCityInfo !== null && selectedCityInfo.id === city.id"
          show-favorite
          show-compare
          apply-unit
          :is-favorite="favoriteStore.isFavorite(city.id)"
          @select-card="selectCity"
          @click-detail="showDetail"
          @toggle-favorite="favoriteStore.toggleFavorite"
        />
        <n-empty v-if="resultCount === 0" description="검색 결과가 일치하는 도시가 없습니다." />
      </template>
    </BaseDashboardCard>

    <UvAlertBanner v-if="uvAlert" :message="uvAlert" />

    <n-alert type="success" :show-icon="false">{{ statusMessage }}</n-alert>
  </div>
</template>

<style scoped>
.error-banner {
  margin-bottom: 12px;
}
.refresh-row {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
