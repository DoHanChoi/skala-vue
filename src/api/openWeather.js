import axios from 'axios'

// 공통 파라미터를 인스턴스에 걸어 호출부에서 반복하지 않는다
const openWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 8000,
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    // 항상 섭씨로 받고, 화씨 변환은 표시 시점에 configStore가 담당한다
    units: 'metric',
    lang: 'kr',
  },
})

export const fetchCurrentWeather = (lat, lon) =>
  openWeather.get('/weather', { params: { lat, lon } })

// 5일 / 3시간 간격 예보 (40건)
export const fetchForecast = (lat, lon) => openWeather.get('/forecast', { params: { lat, lon } })

export const fetchAirPollution = (lat, lon) =>
  openWeather.get('/air_pollution', { params: { lat, lon } })
