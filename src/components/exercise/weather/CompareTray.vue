<script setup>
import { useRouter } from 'vue-router'

import { useCompareStore } from '@/stores/compareStore.js'

const router = useRouter()
const compareStore = useCompareStore()

const goCompare = () => {
  router.push('/compare')
}
</script>

<template>
  <!-- RouterView 밖이라 라우트가 바뀌어도 유지된다 -->
  <n-card v-if="compareStore.compareCount > 0" class="compare-tray" size="small" embedded>
    <div class="tray-body">
      <n-text depth="2" strong style="font-size: 13px">
        ⚖️ 비교 {{ compareStore.compareCount }}/{{ compareStore.maxCompare }}
      </n-text>

      <n-space size="small">
        <n-tag
          v-for="city in compareStore.compareCities"
          :key="city.id"
          size="small"
          round
          closable
          @close="compareStore.removeCompare(city.id)"
        >
          {{ city.name }}
        </n-tag>
      </n-space>

      <n-space class="tray-actions" size="small">
        <n-button size="tiny" quaternary @click="compareStore.clearCompare">비우기</n-button>
        <n-button
          size="tiny"
          type="primary"
          :disabled="compareStore.compareCount < 2"
          @click="goCompare"
        >
          비교하기 →
        </n-button>
      </n-space>
    </div>
  </n-card>
</template>

<style scoped>
.compare-tray {
  margin-top: 12px;
}
.tray-body {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.tray-actions {
  margin-left: auto;
}
</style>
