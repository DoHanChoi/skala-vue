<script setup>
import { useRouter } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/weather/BaseDashboardCard.vue'
import WeatherCard from '@/components/exercise/weather/WeatherCard.vue'
import { useFavoriteStore } from '@/stores/favoriteStore.js'

const router = useRouter()
const favoriteStore = useFavoriteStore()

const showDetail = (city) => {
  router.push({ name: 'weather-detail', params: { cityId: city.id } })
}
</script>

<template>
  <div>
    <BaseDashboardCard title="⭐ 즐겨찾기한 도시">
      <n-text depth="3" style="font-size: 13px">
        홈 대시보드의 카드에서 ☆ 버튼을 누르면 이곳에 모입니다. 페이지를 이동해도 목록이 유지됩니다.
      </n-text>

      <div class="favorite-list">
        <WeatherCard
          v-for="city in favoriteStore.favoriteCities"
          :key="city.id"
          :city="city"
          show-favorite
          show-compare
          apply-unit
          :is-favorite="favoriteStore.isFavorite(city.id)"
          @click-detail="showDetail"
          @toggle-favorite="favoriteStore.toggleFavorite"
        />

        <n-empty
          v-if="favoriteStore.favoriteCount === 0"
          description="아직 즐겨찾기한 도시가 없습니다."
        >
          <template #extra>
            <n-button size="small" @click="router.push('/')">대시보드로 돌아가기</n-button>
          </template>
        </n-empty>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.favorite-list {
  margin-top: 12px;
}
</style>
