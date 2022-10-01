export type WeatherData = {
  name: string
  time: string
  threeHourly: ThreeHourly[]
  weekly: Weekly[]
}

export type ThreeHourly = {
  datetime: string
  icon: string
  windSpeed: number
  windDeg: number
  rain: { '3h': number }
  tempFeels: number
  humidity: number
}

export type Weekly = {
  year: number
  month: number
  day: number
  code: string
  tempMax: number
  tempMin: number
  sunrise: string
  sunset: string
}
