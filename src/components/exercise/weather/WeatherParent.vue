<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherSummary from './WeatherSummary.vue'
import UvAlertBanner from './UvAlertBanner.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 45, uv: 8 },
  { id: 'city_02', name: '인천', temp: 26, status: '바람', humidity: 70, uv: 6 },
  { id: 'city_03', name: '수원', temp: 24, status: '비', humidity: 82, uv: 2 },
  { id: 'city_04', name: '대전', temp: 29, status: '맑음', humidity: 52, uv: 9 },
  { id: 'city_05', name: '대구', temp: 33, status: '폭염', humidity: 48, uv: 11 },
  { id: 'city_06', name: '광주', temp: 30, status: '구름', humidity: 60, uv: 5 },
  { id: 'city_07', name: '울산', temp: 27, status: '맑음', humidity: 63, uv: 8 },
  { id: 'city_08', name: '부산', temp: 26, status: '구름', humidity: 68, uv: 4 },
  { id: 'city_09', name: '강릉', temp: 31, status: '폭염', humidity: 55, uv: 10 },
  { id: 'city_10', name: '제주', temp: 22, status: '바람', humidity: 74, uv: 6 },
])

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
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}
</script>

<template>
  <div class="practice-section">
    <h2>🌦️ 과제 3: 날씨 (컴포넌트)</h2>

    <BaseDashboardCard title="🔍 도시 검색 (한글 즉시 동기화)">
      <SearchBar :query="searchQuery" @update-query="updateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard title="📈 검색 결과 요약">
      <WeatherSummary
        :count="resultCount"
        :avg-temp="avgTemp"
        :hottest-city="hottestCity"
        :sort-by-temp="sortByTemp"
        @toggle-sort="toggleSort"
      />
    </BaseDashboardCard>

    <BaseDashboardCard title="🗺️ 지역별 날씨 현황">
      <WeatherCard
        v-for="city in displayList"
        :key="city.id"
        :city="city"
        :is-selected="selectedCityInfo !== null && selectedCityInfo.id === city.id"
        @select-card="selectCity"
        @click-detail="showDetail"
      />
      <p v-if="resultCount === 0">검색 결과가 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <UvAlertBanner v-if="uvAlert" :message="uvAlert" />

    <p class="status-bar">{{ statusMessage }}</p>
  </div>
</template>

<style scoped>
.status-bar {
  padding: 10px;
  margin: 0;
  text-align: center;
  color: #2b8a3e;
  background-color: #ebfbee;
  border-radius: 6px;
}
</style>
