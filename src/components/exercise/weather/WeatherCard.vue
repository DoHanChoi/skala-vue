<script setup>
import { computed } from 'vue'
import { useMessage } from 'naive-ui'

import { toIconUrl } from '@/api/mapWeather.js'
import { useCompareStore } from '@/stores/compareStore.js'
import { useConfigStore } from '@/stores/configStore.js'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  showFavorite: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  applyUnit: {
    type: Boolean,
    default: false,
  },
  showCompare: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail', 'toggle-favorite'])

const configStore = useConfigStore()
const message = useMessage()

// 즐겨찾기는 부모가 emit으로 중개하고, 비교함은 카드가 스토어를 직접 쓴다
const compareStore = useCompareStore()
const isComparing = computed(() => compareStore.isComparing(props.city.id))

// 표시값만 환산한다. 아래 판정과 게이지는 원본 섭씨(city.temp) 기준
const displayTemp = computed(() =>
  props.applyUnit ? configStore.toDisplayTemp(props.city.temp) : props.city.temp,
)
const unitSymbol = computed(() => (props.applyUnit ? configStore.unitSymbol : '℃'))
const hotThreshold = computed(() =>
  props.applyUnit ? `${configStore.toDisplayTemp(25)}${configStore.unitSymbol}` : '25도',
)

// themeKey가 없는 Mock 데이터는 status로 테마를 결정한다
const THEME_BY_STATUS = { 맑음: 'sunny', 비: 'rainy', 구름: 'cloudy', 폭염: 'heat', 바람: 'windy' }

const THEME_COLOR = {
  sunny: { background: '#fff9db', border: '#fab005' },
  rainy: { background: '#e7f5ff', border: '#4dabf7' },
  cloudy: { background: '#f1f3f5', border: '#adb5bd' },
  heat: { background: '#fff0f6', border: '#f03e3e' },
  windy: { background: '#e6fcf5', border: '#20c997' },
  snowy: { background: '#f8f9fa', border: '#74c0fc' },
}

const themeKey = computed(() => props.city.themeKey ?? THEME_BY_STATUS[props.city.status] ?? '')

const cardStyle = computed(() => {
  const theme = THEME_COLOR[themeKey.value]
  return {
    backgroundColor: theme?.background ?? '#ffffff',
    borderLeft: `5px solid ${theme?.border ?? '#e0e0e6'}`,
    boxShadow: props.isSelected ? '0 0 0 2px rgba(43, 138, 62, 0.45)' : 'none',
  }
})

const iconUrl = computed(() => (props.city.icon ? toIconUrl(props.city.icon) : ''))

const tempPercentage = computed(() => Math.min(Math.max(props.city.temp * 2, 0), 100))
const tempColor = computed(() => (props.city.temp >= 25 ? '#ff6b6b' : '#4dabf7'))

const uvPercentage = computed(() => Math.min((props.city.uv / 11) * 100, 100))
const uvColor = computed(() =>
  props.city.uv >= 8 ? '#f76707' : props.city.uv >= 6 ? '#fab005' : '#51cf66',
)

const handleFavorite = () => {
  message.success(
    props.isFavorite
      ? `${props.city.name}을(를) 즐겨찾기에서 뺐습니다.`
      : `${props.city.name}을(를) 즐겨찾기에 담았습니다.`,
  )
  emit('toggle-favorite', props.city.id)
}

const handleCompare = () => {
  if (!isComparing.value && !compareStore.canAdd) {
    message.warning(`비교함은 최대 ${compareStore.maxCompare}개까지입니다.`)
    return
  }
  compareStore.toggleCompare(props.city.id)
}
</script>

<template>
  <n-card
    class="weather-card"
    size="small"
    hoverable
    :style="cardStyle"
    @click="emit('select-card', city)"
  >
    <div class="card-body">
      <div class="card-main">
        <div class="card-head">
          <img v-if="iconUrl" class="weather-icon" :src="iconUrl" :alt="city.status" />
          <n-text strong>{{ city.name }}</n-text>
          <n-tag size="small" round :bordered="false">{{ city.status }}</n-tag>
        </div>

        <div class="card-metrics">
          <n-statistic label="현재 기온">
            <n-number-animation :from="0" :to="displayTemp" :duration="600" />
            <template #suffix>{{ unitSymbol }}</template>
          </n-statistic>

          <div class="uv-gauge">
            <n-progress
              type="dashboard"
              :percentage="uvPercentage"
              :color="uvColor"
              :stroke-width="8"
              :style="{ width: '62px' }"
            >
              <span class="uv-value">UV {{ city.uv }}</span>
            </n-progress>
          </div>

          <div class="temp-gauge">
            <n-progress
              type="line"
              :percentage="tempPercentage"
              :color="tempColor"
              :height="8"
              :show-indicator="false"
            />
            <n-space size="small">
              <n-tag size="small" :type="city.temp >= 25 ? 'error' : 'info'" round>
                {{ city.temp >= 25 ? '🔥 더움' : '❄ 선선함' }} ({{ hotThreshold }}
                {{ city.temp >= 25 ? '이상' : '미만' }})
              </n-tag>
              <n-tag size="small" :type="city.uv >= 6 ? 'warning' : 'success'" round>
                {{ city.uv >= 6 ? '🕶 자외선 강함' : '🙂 자외선 보통' }}
              </n-tag>
              <n-tag size="small" round :bordered="false">💧 습도 {{ city.humidity }}%</n-tag>
              <n-tag v-if="city.pop !== undefined" size="small" type="info" round>
                ☔ 강수확률 {{ city.pop }}%
              </n-tag>
            </n-space>
          </div>
        </div>
      </div>

      <!-- .stop: 카드 선택 이벤트가 함께 발생하는 것을 막는다 -->
      <n-space class="card-actions" size="small" align="center" @click.stop>
        <n-tooltip v-if="showFavorite" trigger="hover">
          <template #trigger>
            <n-button
              circle
              quaternary
              :type="isFavorite ? 'warning' : 'default'"
              @click.stop="handleFavorite"
            >
              {{ isFavorite ? '★' : '☆' }}
            </n-button>
          </template>
          즐겨찾기
        </n-tooltip>

        <n-tooltip v-if="showCompare" trigger="hover">
          <template #trigger>
            <n-button
              circle
              :quaternary="!isComparing"
              :type="isComparing ? 'info' : 'default'"
              @click.stop="handleCompare"
            >
              ⚖️
            </n-button>
          </template>
          비교함에 담기 (최대 {{ compareStore.maxCompare }}개)
        </n-tooltip>

        <n-button size="small" type="primary" @click.stop="emit('click-detail', city)">
          상세보기
        </n-button>
      </n-space>
    </div>
  </n-card>
</template>

<style scoped>
.weather-card {
  margin-bottom: 10px;
  cursor: pointer;
}
.card-body {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}
.card-main {
  flex: 1;
  min-width: 0;
}
.card-head {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 4px;
}
.weather-icon {
  width: 32px;
  height: 32px;
  margin: -6px 0 -6px -6px;
}
.card-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
.uv-value {
  font-size: 12px;
  font-weight: 600;
}
.temp-gauge {
  flex: 1;
  min-width: 200px;
}
.temp-gauge .n-space {
  margin-top: 6px;
}
.card-actions {
  flex: none;
}
</style>
