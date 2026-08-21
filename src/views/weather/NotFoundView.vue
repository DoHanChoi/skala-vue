<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 경로가 바뀌어도 동작하도록 라우트 이름으로 이동한다
const goHome = () => {
  router.push({ name: 'weather-home' })
}
</script>

<template>
  <n-result
    status="404"
    title="페이지를 찾을 수 없습니다."
    description="요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다."
  >
    <template #icon>
      <div class="error-icon">☀️❓</div>
    </template>
    <template #footer>
      <n-button type="primary" @click="goHome">날씨 메인으로 이동</n-button>
    </template>
  </n-result>
</template>

<style scoped>
.error-icon {
  font-size: 4rem;
}
</style>
