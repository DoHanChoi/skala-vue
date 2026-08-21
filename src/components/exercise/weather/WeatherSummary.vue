<script setup>
import { computed } from 'vue'

import { useConfigStore } from '@/stores/configStore.js'

const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
  avgTemp: {
    type: [String, Number],
    required: true,
  },
  hottestCity: {
    type: Object,
    default: null,
  },
  sortByTemp: {
    type: Boolean,
    default: false,
  },
  applyUnit: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-sort'])

const configStore = useConfigStore()

// avgTemp는 toFixed 결과 문자열이라 환산 전에 숫자로 되돌린다
const displayAvgTemp = computed(() =>
  props.applyUnit ? configStore.toDisplayTemp(Number(props.avgTemp)) : props.avgTemp,
)
const displayHottestTemp = computed(() => {
  if (!props.hottestCity) return 0
  return props.applyUnit
    ? configStore.toDisplayTemp(props.hottestCity.temp)
    : props.hottestCity.temp
})
const unitSymbol = computed(() => (props.applyUnit ? configStore.unitSymbol : '℃'))
</script>

<template>
  <div>
    <n-grid :cols="3" :x-gap="12" responsive="screen">
      <n-gi>
        <n-statistic label="검색 결과">
          {{ count }}
          <template #suffix>건</template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="평균 기온">
          {{ displayAvgTemp }}
          <template #suffix>{{ unitSymbol }}</template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic :label="hottestCity ? `최고 기온 · ${hottestCity.name}` : '최고 기온'">
          {{ hottestCity ? displayHottestTemp : '-' }}
          <template v-if="hottestCity" #suffix>{{ unitSymbol }}</template>
        </n-statistic>
      </n-gi>
    </n-grid>

    <n-button class="sort-btn" size="small" secondary @click="emit('toggle-sort')">
      {{ sortByTemp ? '↕ 기본 순서로 보기' : '🔥 기온 높은 순으로 정렬' }}
    </n-button>
  </div>
</template>

<style scoped>
.sort-btn {
  margin-top: 10px;
}
</style>
