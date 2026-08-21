<script setup>
import { computed } from 'vue'

import { useConfigStore } from '@/stores/configStore.js'

// 부모를 거치지 않고 스토어에 직접 쓰므로 어느 화면의 카드든 함께 반응한다
const configStore = useConfigStore()

const unit = computed({
  get: () => configStore.unit,
  set: () => configStore.toggleUnit(),
})
</script>

<template>
  <n-space size="small" align="center">
    <n-text depth="3" style="font-size: 13px">날씨단위</n-text>
    <n-switch v-model:value="unit" checked-value="fahrenheit" unchecked-value="celsius">
      <template #checked>℉</template>
      <template #unchecked>℃</template>
    </n-switch>
  </n-space>
</template>
