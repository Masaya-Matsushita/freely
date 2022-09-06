export type WeatherData = {
  name: string
  time: string
  daily: Daily[]
  weekly: Weekly[]
}

type Daily = {
  datetime: string
  icon: string
  description: string
  windSpeed: number
  windDeg: number
  tempFeels: number
  tempMax: number
  tempMin: number
  humidity: number
}

type Weekly = {
  datetime: string
  icon: string
  tempMax: number
  tempMin: number
  humidity: number
}
