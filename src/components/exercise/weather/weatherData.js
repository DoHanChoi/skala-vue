export const weatherMockData = [
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
]

// 풍속은 현재 API가 채우므로 기록용으로만 남긴다
const weatherDetailMock = {
  city_01: { fullName: '대한민국 서울특별시', wind: '2.5m/s' },
  city_02: { fullName: '인천광역시 연수구', wind: '5.4m/s' },
  city_03: { fullName: '경기도 수원시 영통구', wind: '4.1m/s' },
  city_04: { fullName: '대전광역시 유성구', wind: '1.8m/s' },
  city_05: { fullName: '대구광역시 중구', wind: '1.2m/s' },
  city_06: { fullName: '광주광역시 서구', wind: '3.0m/s' },
  city_07: { fullName: '울산광역시 남구', wind: '2.2m/s' },
  city_08: { fullName: '부산광역시 해운대구', wind: '5.0m/s' },
  city_09: { fullName: '강원특별자치도 강릉시', wind: '3.6m/s' },
  city_10: { fullName: '제주특별자치도 제주시', wind: '6.8m/s' },
}

export const findCityById = (cityId) => weatherMockData.find((city) => city.id === cityId) ?? null

// API 호출 기준 도시 명부. id/name을 위 Mock과 같게 유지해야 즐겨찾기·비교함 id가 통한다
export const cityRegistry = [
  { id: 'city_01', name: '서울', fullName: '대한민국 서울특별시', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '인천', fullName: '인천광역시 연수구', lat: 37.4563, lon: 126.7052 },
  { id: 'city_03', name: '수원', fullName: '경기도 수원시 영통구', lat: 37.2636, lon: 127.0286 },
  { id: 'city_04', name: '대전', fullName: '대전광역시 유성구', lat: 36.3504, lon: 127.3845 },
  { id: 'city_05', name: '대구', fullName: '대구광역시 중구', lat: 35.8714, lon: 128.6014 },
  { id: 'city_06', name: '광주', fullName: '광주광역시 서구', lat: 35.1595, lon: 126.8526 },
  { id: 'city_07', name: '울산', fullName: '울산광역시 남구', lat: 35.5384, lon: 129.3114 },
  { id: 'city_08', name: '부산', fullName: '부산광역시 해운대구', lat: 35.1796, lon: 129.0756 },
  { id: 'city_09', name: '강릉', fullName: '강원특별자치도 강릉시', lat: 37.7519, lon: 128.8761 },
  { id: 'city_10', name: '제주', fullName: '제주특별자치도 제주시', lat: 33.4996, lon: 126.5312 },
]

export const findRegistryCity = (cityId) => cityRegistry.find((city) => city.id === cityId) ?? null
