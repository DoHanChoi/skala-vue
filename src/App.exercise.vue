<script setup>
import { computed, h, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { NBadge, dateKoKR, koKR } from 'naive-ui'

import WeatherMockup from './components/exercise/WeatherMockup.vue'
import WeatherComposition from './components/exercise/WeatherComposition.vue'
import WeatherParent from './components/exercise/weather/WeatherParent.vue'
import UnitToggler from './components/exercise/weather/UnitToggler.vue'
import CompareTray from './components/exercise/weather/CompareTray.vue'
import { themeOverrides } from '@/plugins/naive.js'
import { useFavoriteStore } from '@/stores/favoriteStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'

const route = useRoute()
const favoriteStore = useFavoriteStore()
const weatherStore = useWeatherStore()

// 앱 루트에서 한 번만 호출한다. 어느 경로로 진입해도 데이터가 준비되도록
onMounted(() => {
  if (!weatherStore.hasData) {
    weatherStore.loadCities()
  }
})

// n-menu의 label에 렌더 함수를 주어 메뉴 항목을 RouterLink로 만든다
const menuOptions = computed(() => [
  {
    key: 'weather-home',
    label: () => h(RouterLink, { to: '/' }, () => '🌦️ 날씨 대시보드'),
  },
  {
    key: 'weather-about',
    label: () => h(RouterLink, { to: '/about' }, () => 'ℹ️ 서비스 소개'),
  },
  {
    key: 'weather-favorites',
    label: () =>
      h(RouterLink, { to: '/favorites' }, () =>
        h(
          NBadge,
          { value: favoriteStore.favoriteCount, offset: [6, -2], color: '#f59f00' },
          () => '⭐ 즐겨찾기',
        ),
      ),
  },
])

// 메뉴에 없는 라우트에서는 활성 표시를 지운다
const activeKey = computed(() =>
  menuOptions.value.some((option) => option.key === route.name) ? route.name : null,
)
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="koKR" :date-locale="dateKoKR">
    <n-global-style />

    <!-- useMessage()는 이 provider 안쪽에서만 호출할 수 있다 -->
    <n-message-provider :max="2">
      <div class="practice-container">
        <h1>SKALA Vue 실습 과제</h1>
        <hr />

        <n-collapse class="past-collapse">
          <n-collapse-item title="📁 1~3번 과제 (Mockup · Composition · Component)" name="past">
            <WeatherMockup />
            <WeatherComposition />
            <WeatherParent />
          </n-collapse-item>
        </n-collapse>

        <div class="practice-section">
          <h2>🌤️ 종합실습 7: UI Library 적용 (Naive UI)</h2>

          <div class="nav-bar">
            <n-menu mode="horizontal" responsive :value="activeKey" :options="menuOptions" />
            <UnitToggler />
          </div>

          <CompareTray />

          <main>
            <RouterView />
          </main>
        </div>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
@import '@/assets/practice.css';
</style>

<style scoped>
.past-collapse {
  margin-bottom: 16px;
}
.nav-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0 8px 0;
  border-bottom: 1px solid #e9ecef;
}
.nav-bar :deep(a) {
  color: inherit;
  text-decoration: none;
}
main {
  padding-top: 16px;
}
</style>
