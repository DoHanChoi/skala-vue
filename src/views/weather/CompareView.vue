<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/weather/BaseDashboardCard.vue'
import { useCompareStore } from '@/stores/compareStore.js'
import { useConfigStore } from '@/stores/configStore.js'

const router = useRouter()
const compareStore = useCompareStore()
const configStore = useConfigStore()

const rows = computed(() => [
  {
    label: '기온',
    values: compareStore.compareCities.map((city) => ({
      id: city.id,
      text: `${configStore.toDisplayTemp(city.temp)}${configStore.unitSymbol}`,
      mark:
        city.id === compareStore.hottest?.id
          ? '🔥'
          : city.id === compareStore.coldest?.id
            ? '❄'
            : '',
    })),
  },
  {
    label: '기상 현황',
    values: compareStore.compareCities.map((city) => ({
      id: city.id,
      text: city.status,
      mark: '',
    })),
  },
  {
    label: '습도',
    values: compareStore.compareCities.map((city) => ({
      id: city.id,
      text: `${city.humidity}%`,
      mark: '',
    })),
  },
  {
    label: '자외선',
    values: compareStore.compareCities.map((city) => ({
      id: city.id,
      text: String(city.uv),
      mark: city.uv >= 8 ? '🕶' : '',
    })),
  },
  {
    label: '강수확률',
    values: compareStore.compareCities.map((city) => ({
      id: city.id,
      text: city.pop === undefined ? '-' : `${city.pop}%`,
      mark: city.pop >= 60 ? '☔' : '',
    })),
  },
  {
    label: '풍속',
    values: compareStore.compareCities.map((city) => ({
      id: city.id,
      text: city.wind ?? '-',
      mark: '',
    })),
  },
])

const showDetail = (cityId) => {
  router.push({ name: 'weather-detail', params: { cityId } })
}
</script>

<template>
  <div>
    <BaseDashboardCard title="⚖️ 지역별 날씨 비교">
      <div v-if="compareStore.compareCount >= 2">
        <!-- 행=항목 / 열=도시로 전치된 표라 columns 모델의 n-data-table 대신 n-table을 쓴다 -->
        <n-table size="small" :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th></th>
              <th v-for="city in compareStore.compareCities" :key="city.id">
                <n-button size="tiny" text type="primary" @click="showDetail(city.id)">
                  {{ city.name }}
                </n-button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.label">
              <th>{{ row.label }}</th>
              <td v-for="value in row.values" :key="value.id">
                {{ value.text }}
                <n-tag v-if="value.mark" size="tiny" round :bordered="false">
                  {{ value.mark }}
                </n-tag>
              </td>
            </tr>
          </tbody>
        </n-table>

        <n-grid class="summary" :cols="3" :x-gap="12" responsive="screen">
          <n-gi>
            <n-statistic label="가장 더운 곳" :value="compareStore.hottest.name" />
          </n-gi>
          <n-gi>
            <n-statistic label="가장 시원한 곳" :value="compareStore.coldest.name" />
          </n-gi>
          <n-gi>
            <n-statistic label="기온차">
              {{ compareStore.tempGap }}
              <template #suffix>도</template>
            </n-statistic>
          </n-gi>
        </n-grid>
      </div>

      <n-empty
        v-else
        description="비교하려면 대시보드 카드의 ⚖️ 버튼으로 도시를 2개 이상 담아 주세요."
      >
        <template #extra>
          <n-button size="small" @click="router.push('/')">대시보드로 돌아가기</n-button>
        </template>
      </n-empty>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.summary {
  margin-top: 14px;
}
</style>
