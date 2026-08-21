import axios from 'axios'

// OpenWeatherMap 무료 플랜에 자외선 지수가 없어 별도 API로 보충한다 (키 불필요)
const openMeteo = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 8000,
})

// 좌표를 콤마로 이어 보내면 도시가 몇 개든 요청 1건이고, 응답 순서는 요청 순서와 같다
export const fetchUvBatch = (cities) =>
  openMeteo.get('/forecast', {
    params: {
      latitude: cities.map((city) => city.lat).join(','),
      longitude: cities.map((city) => city.lon).join(','),
      current: 'uv_index,precipitation_probability',
      timezone: 'Asia/Seoul',
    },
  })
