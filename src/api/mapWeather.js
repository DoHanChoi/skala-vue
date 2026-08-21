// status 문자열은 종류가 많아 판정에 쓸 수 없어 아이콘 코드 앞 2자리로 가른다
const THEME_BY_ICON = {
  '01': 'sunny',
  '02': 'cloudy',
  '03': 'cloudy',
  '04': 'cloudy',
  '09': 'rainy',
  10: 'rainy',
  11: 'rainy',
  13: 'snowy',
  50: 'windy',
}

export const toThemeKey = (icon) => THEME_BY_ICON[String(icon).slice(0, 2)] ?? 'cloudy'

export const toIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

// 두 API 응답을 합쳐 카드 규격으로 만든다
export const toCityWeather = (city, owm, meteo) => ({
  id: city.id,
  name: city.name,
  fullName: city.fullName,
  temp: Math.round(owm.main.temp),
  status: owm.weather[0].description,
  icon: owm.weather[0].icon,
  themeKey: toThemeKey(owm.weather[0].icon),
  humidity: owm.main.humidity,
  wind: `${owm.wind.speed}m/s`,
  feelsLike: Math.round(owm.main.feels_like),
  // 아래 두 값의 출처는 Open-Meteo
  uv: Math.round(meteo?.current?.uv_index ?? 0),
  pop: meteo?.current?.precipitation_probability ?? 0,
})

// 3시간 간격 40건 → 날짜별 1건.
// dt는 UTC라 timezone(초)을 더해 현지 시각 기준으로 묶어야 날짜 경계가 맞는다.
export const toDailyForecast = (list, timezoneOffset = 0) => {
  const byDate = new Map()

  for (const item of list) {
    const local = new Date((item.dt + timezoneOffset) * 1000)
    const date = local.toISOString().slice(0, 10)
    const hour = local.getUTCHours()

    const day = byDate.get(date) ?? {
      date,
      min: Infinity,
      max: -Infinity,
      icon: item.weather[0].icon,
      status: item.weather[0].description,
      noonGap: Infinity,
    }

    day.min = Math.min(day.min, Math.round(item.main.temp_min))
    day.max = Math.max(day.max, Math.round(item.main.temp_max))

    // 대표 아이콘·상태는 정오에 가장 가까운 시각의 값을 쓴다
    const gap = Math.abs(hour - 12)
    if (gap < day.noonGap) {
      day.noonGap = gap
      day.icon = item.weather[0].icon
      day.status = item.weather[0].description
    }

    byDate.set(date, day)
  }

  // 40건이 6일에 걸치기도 하므로 마지막 반쪽 날은 버린다
  return [...byDate.values()].slice(0, 5)
}

// AQI 1~5에 대응하는 등급
const AQI_GRADE = ['좋음', '양호', '보통', '나쁨', '매우 나쁨']

export const toAirQuality = (data) => {
  const item = data.list[0]
  return {
    aqi: item.main.aqi,
    grade: AQI_GRADE[item.main.aqi - 1] ?? '알 수 없음',
    pm10: item.components.pm10,
    pm25: item.components.pm2_5,
  }
}

export const toDateLabel = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
