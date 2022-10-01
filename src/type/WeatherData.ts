export type WeatherData = {
  name: string
  time: string
  threeHourly: ThreeHourly[]
  weekly: Weekly[]
}

type ThreeHourly = {
  datetime: string
  icon: string
  windSpeed: number
  windDeg: number
  rain: { '3h': number }
  tempFeels: number
  humidity: number
}

type Weekly = {
  date: string
  code: string
  tempMax: number
  tempMin: number
  sunrise: string
  sunset: string
}
