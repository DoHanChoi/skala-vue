<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/weather/BaseDashboardCard.vue'
import { findRegistryCity } from '@/components/exercise/weather/weatherData.js'
import { fetchAirPollution, fetchForecast } from '@/api/openWeather.js'
import { toAirQuality, toDailyForecast, toDateLabel, toIconUrl } from '@/api/mapWeather.js'
import { useCompareStore } from '@/stores/compareStore.js'
import { useConfigStore } from '@/stores/configStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const compareStore = useCompareStore()
const weatherStore = useWeatherStore()

const cityInfo = computed(() => weatherStore.findCity(route.params.cityId))

// 이 화면에서만 쓰는 데이터라 스토어 대신 로컬 ref에 둔다
const forecast = ref([])
const airQuality = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  const city = findRegistryCity(route.params.cityId)
  if (!city) return

  isLoading.value = true
  try {
    const [forecastRes, airRes] = await Promise.all([
      fetchForecast(city.lat, city.lon),
      fetchAirPollution(city.lat, city.lon),
    ])

    forecast.value = toDailyForecast(forecastRes.data.list, forecastRes.data.city.timezone)
    airQuality.value = toAirQuality(airRes.data)
    console.log(
      `🟢 [상세] ${city.name} 예보 ${forecast.value.length}일 / 대기질 수신`,
      airQuality.value,
    )
  } catch (error) {
    console.error('🔴 상세 정보 로딩 실패:', error)
    errorMessage.value = '예보와 대기질 정보를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
})

const displayTemp = computed(() => configStore.toDisplayTemp(cityInfo.value?.temp ?? 0))
const displayFeelsLike = computed(() => configStore.toDisplayTemp(cityInfo.value?.feelsLike ?? 0))

const displayForecast = computed(() =>
  forecast.value.map((day) => ({
    ...day,
    label: toDateLabel(day.date),
    iconUrl: toIconUrl(day.icon),
    displayMin: configStore.toDisplayTemp(day.min),
    displayMax: configStore.toDisplayTemp(day.max),
  })),
)

// AQI 1~5에 대응하는 태그 색
const AQI_TAG_TYPE = ['success', 'success', 'warning', 'warning', 'error']
const aqiTagType = computed(() => AQI_TAG_TYPE[(airQuality.value?.aqi ?? 1) - 1] ?? 'default')

const isComparing = computed(() => !!cityInfo.value && compareStore.isComparing(cityInfo.value.id))
const canToggleCompare = computed(() => isComparing.value || compareStore.canAdd)

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <BaseDashboardCard title="📊 지역별 상세 기상 관측 정보 (실시간 API 연동)">
      <template v-if="cityInfo">
        <div class="detail-head">
          <img v-if="cityInfo.icon" class="detail-icon" :src="toIconUrl(cityInfo.icon)" alt="" />
          <n-text strong>📍 {{ cityInfo.fullName }}</n-text>
        </div>

        <n-descriptions bordered size="small" :column="2" label-placement="left">
          <n-descriptions-item label="실시간 기온">
            {{ displayTemp }}{{ configStore.unitSymbol }}
          </n-descriptions-item>
          <n-descriptions-item label="체감 기온">
            {{ displayFeelsLike }}{{ configStore.unitSymbol }}
          </n-descriptions-item>
          <n-descriptions-item label="기상 현황">
            <n-tag size="small" round :bordered="false">{{ cityInfo.status }}</n-tag>
          </n-descriptions-item>
          <n-descriptions-item label="대기 습도">{{ cityInfo.humidity }}%</n-descriptions-item>
          <n-descriptions-item label="현재 풍속">{{ cityInfo.wind }}</n-descriptions-item>
          <n-descriptions-item label="자외선 · 강수확률">
            {{ cityInfo.uv }} · {{ cityInfo.pop }}%
          </n-descriptions-item>
        </n-descriptions>
      </template>

      <n-spin v-else-if="weatherStore.isLoading" size="small">
        <template #description>도시 목록을 수신 중입니다...</template>
      </n-spin>

      <n-empty v-else :description="`해당 지역(${route.params.cityId})의 데이터가 없습니다.`" />
    </BaseDashboardCard>

    <n-alert v-if="errorMessage" class="error-banner" type="error" :title="errorMessage" />

    <BaseDashboardCard title="📅 5일 예보">
      <n-skeleton v-if="isLoading" :height="130" :sharp="false" />

      <n-grid v-else-if="displayForecast.length > 0" :cols="5" :x-gap="8" responsive="screen">
        <n-gi v-for="day in displayForecast" :key="day.date">
          <n-card class="forecast-item" size="small" embedded>
            <p class="forecast-date">{{ day.label }}</p>
            <img class="forecast-icon" :src="day.iconUrl" :alt="day.status" />
            <p class="forecast-status">{{ day.status }}</p>
            <p class="forecast-temp">
              <span class="temp-min">{{ day.displayMin }}°</span>
              ~
              <span class="temp-max">{{ day.displayMax }}°</span>
            </p>
          </n-card>
        </n-gi>
      </n-grid>

      <n-empty v-else description="예보 데이터가 없습니다." />
    </BaseDashboardCard>

    <BaseDashboardCard title="🌫️ 대기질">
      <n-skeleton v-if="isLoading" :height="90" :sharp="false" />

      <n-grid v-else-if="airQuality" :cols="3" :x-gap="12" responsive="screen">
        <n-gi>
          <n-statistic label="종합 지수">
            <n-tag :type="aqiTagType" round>
              AQI {{ airQuality.aqi }} · {{ airQuality.grade }}
            </n-tag>
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic label="미세먼지 (PM10)">
            {{ airQuality.pm10 }}
            <template #suffix>㎍/㎥</template>
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic label="초미세먼지 (PM2.5)">
            {{ airQuality.pm25 }}
            <template #suffix>㎍/㎥</template>
          </n-statistic>
        </n-gi>
      </n-grid>

      <n-empty v-else description="대기질 데이터가 없습니다." />
    </BaseDashboardCard>

    <n-space size="small">
      <n-button secondary @click="goHome">← 메인 대시보드로 돌아가기</n-button>
      <n-button
        v-if="cityInfo"
        :type="isComparing ? 'info' : 'default'"
        :disabled="!canToggleCompare"
        @click="compareStore.toggleCompare(cityInfo.id)"
      >
        {{ isComparing ? '⚖️ 비교함에서 빼기' : '⚖️ 비교함에 담기' }}
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>
.detail-head {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
}
.detail-icon {
  width: 36px;
  height: 36px;
  margin: -8px 0 -8px -8px;
}
.error-banner {
  margin-bottom: 12px;
}
.forecast-item {
  text-align: center;
}
.forecast-date {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
}
.forecast-icon {
  width: 44px;
  height: 44px;
}
.forecast-status {
  margin: 0 0 4px 0;
  font-size: 11px;
  color: #868e96;
}
.forecast-temp {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}
.temp-min {
  color: #4dabf7;
}
.temp-max {
  color: #ff6b6b;
}
</style>
