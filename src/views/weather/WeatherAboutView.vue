<script setup>
import { useRouter } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/weather/BaseDashboardCard.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const progress = [
  { title: '1번 과제 — Mockup', content: 'v-for · v-if · :value/@input · .stop' },
  { title: '2번 과제 — Composition', content: 'computed · watch · watchEffect' },
  { title: '3번 과제 — Component', content: 'props · emits · slot' },
  { title: '4번 과제 — Router', content: '지연 로딩 · 동적 경로 · Catch-all' },
  { title: '5번 과제 — Store', content: 'pinia state · getters · actions' },
  { title: '6번 과제 — Axios', content: 'axios.create · async/await · Promise.all' },
  { title: '7번 과제 — UI Library', content: 'Naive UI 전면 적용', type: 'success' },
]
</script>

<template>
  <div>
    <BaseDashboardCard title="ℹ️ 서비스 소개">
      <n-text>
        본 앱은 <n-text strong>Vue 3</n-text>, <n-text strong>Vue Router</n-text>,
        <n-text strong>Pinia</n-text>, <n-text strong>Axios</n-text>,
        <n-text strong>Naive UI</n-text> 기반으로 제작된 실습용 기상 관측 대시보드입니다.
      </n-text>

      <n-descriptions class="sources" bordered size="small" :column="1" label-placement="left">
        <n-descriptions-item label="OpenWeatherMap">
          현재 날씨 / 5일 예보 / 대기 오염 <n-tag size="tiny" type="warning">API 키 필요</n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="Open-Meteo">
          자외선 지수 / 강수확률 <n-tag size="tiny" type="success">키 없이 호출</n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="온도 단위">
          항상 섭씨로 받아 두고, 화씨는 화면에서만 변환합니다
        </n-descriptions-item>
        <n-descriptions-item label="갱신">
          대시보드의 🔄 새로고침 버튼으로 언제든 다시 받습니다
        </n-descriptions-item>
      </n-descriptions>
    </BaseDashboardCard>

    <BaseDashboardCard title="🗂️ 과제 진행">
      <n-timeline>
        <n-timeline-item
          v-for="step in progress"
          :key="step.title"
          :type="step.type ?? 'info'"
          :title="step.title"
          :content="step.content"
        />
      </n-timeline>
    </BaseDashboardCard>

    <n-button type="primary" block @click="goHome">대시보드 홈으로 이동</n-button>
  </div>
</template>

<style scoped>
.sources {
  margin-top: 12px;
}
</style>
