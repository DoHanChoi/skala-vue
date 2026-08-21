<script setup>
import { computed, ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 45, uv: 8 },
  { id: 'city_02', name: '인천', temp: 26, status: '바람', humidity: 70, uv: 6 },
  { id: 'city_03', name: '수원', temp: 24, status: '비', humidity: 82, uv: 2 },
  { id: 'city_04', name: '대전', temp: 29, status: '맑음', humidity: 52, uv: 9 },
  { id: 'city_05', name: '대구', temp: 33, status: '폭염', humidity: 48, uv: 11 },
  { id: 'city_06', name: '광주', temp: 30, status: '구름', humidity: 60, uv: 5 },
  { id: 'city_07', name: '울산', temp: 27, status: '맑음', humidity: 63, uv: 8 },
  { id: 'city_08', name: '부산', temp: 26, status: '구름', humidity: 68, uv: 4 },
  { id: 'city_09', name: '강릉', temp: 31, status: '폭염', humidity: 55, uv: 10 },
  { id: 'city_10', name: '제주', temp: 22, status: '바람', humidity: 74, uv: 6 },
])

const keyword = ref('')

const statusMessage = ref('')

const selectedId = ref('')

const handleInput = (event) => {
  keyword.value = event.target.value
}

const filteredList = computed(() => {
  const search = keyword.value.trim()
  if (!search) return weatherList.value
  return weatherList.value.filter((city) => city.name.includes(search))
})

const selectCity = (city) => {
  selectedId.value = city.id
  statusMessage.value = `${city.name}이 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="practice-section">
    <h2>🌤️ 과제 1: 날씨 (Mockup)</h2>

    <section class="weather-box">
      <h3>🔍 도시 검색</h3>
      <input
        type="text"
        placeholder="검색할 도시 이름 입력"
        :value="keyword"
        @input="handleInput"
      />
      <p>검색 중인 도시: {{ keyword }}</p>
    </section>

    <section class="weather-box">
      <h3>📊 지역별 날씨 현황</h3>
      <div
        v-for="city in filteredList"
        :key="city.id"
        class="weather-card"
        :class="{
          'is-sunny': city.status === '맑음',
          'is-rainy': city.status === '비',
          'is-cloudy': city.status === '구름',
          'is-heat': city.status === '폭염',
          'is-windy': city.status === '바람',
          'is-selected': selectedId === city.id,
        }"
        @click="selectCity(city)"
      >
        <div>
          <p class="city-name">{{ city.name }} ({{ city.status }})</p>
          <p class="city-temp">
            현재 기온: {{ city.temp }}°C / 습도: {{ city.humidity }}% / 자외선 {{ city.uv }}
          </p>
          <div class="gauge">
            <div
              class="gauge-fill"
              :style="{
                width: city.temp * 2 + '%',
                backgroundColor: city.temp >= 25 ? '#ff6b6b' : '#4dabf7',
              }"
            ></div>
          </div>
          <div class="gauge">
            <div
              class="gauge-fill"
              :style="{
                width: city.uv * 9 + '%',
                backgroundColor: city.uv >= 8 ? '#f76707' : city.uv >= 6 ? '#fab005' : '#51cf66',
              }"
            ></div>
          </div>
          <span v-if="city.temp >= 25" class="label label-hot">🔥 더움 (25도 이상)</span>
          <span v-else class="label label-cool">❄ 선선함 (25도 미만)</span>
          <span v-if="city.uv >= 6" class="label label-uv-high">🕶 자외선 강함 (6 이상)</span>
          <span v-else class="label label-uv-low">🙂 자외선 보통 (6 미만)</span>
        </div>
        <button @click.stop="showDetail(city.name, city.status)">상세보기</button>
      </div>
      <p v-if="filteredList.length === 0">검색된 도시가 없습니다.</p>
    </section>

    <p class="status-bar">
      {{ statusMessage || '카드를 클릭하거나 검색해 보세요.' }}
    </p>
  </div>
</template>

<style scoped>
.weather-box {
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}
.weather-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  margin-bottom: 10px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.weather-card:hover {
  background-color: #f8f9fa;
}
.weather-card.is-sunny {
  background-color: #fff9db;
  border-left: 5px solid #fab005;
}
.weather-card.is-rainy {
  background-color: #e7f5ff;
  border-left: 5px solid #4dabf7;
}
.weather-card.is-cloudy {
  background-color: #f1f3f5;
  border-left: 5px solid #adb5bd;
}
.weather-card.is-heat {
  background-color: #fff0f6;
  border-left: 5px solid #f03e3e;
}
.weather-card.is-windy {
  background-color: #e6fcf5;
  border-left: 5px solid #20c997;
}
.weather-card.is-selected {
  border-color: #2b8a3e;
  box-shadow: 0 0 0 2px rgba(43, 138, 62, 0.35);
}
.city-name {
  margin: 0;
  font-weight: 600;
}
.city-temp {
  margin: 2px 0 6px 0;
  font-size: 14px;
}
.gauge {
  width: 180px;
  height: 8px;
  margin-bottom: 8px;
  background-color: #f1f3f5;
  border-radius: 4px;
  overflow: hidden;
}
.gauge-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}
.label {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  border-radius: 4px;
}
.label-hot {
  background-color: #ff6b6b;
}
.label-cool {
  background-color: #4dabf7;
}
.label-uv-high {
  background-color: #f76707;
}
.label-uv-low {
  background-color: #51cf66;
}
.status-bar {
  padding: 10px;
  margin: 0;
  text-align: center;
  color: #2b8a3e;
  background-color: #ebfbee;
  border-radius: 6px;
}
</style>
