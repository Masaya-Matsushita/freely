export type WeatherData = {
  city: string
  threeHourly: ThreeHourly[]
  weekly: Weekly[]
}

export type ThreeHourly = {
  year: number
  month: number
  day: number
  time: number
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
