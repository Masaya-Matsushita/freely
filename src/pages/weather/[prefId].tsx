import { GetStaticPaths, GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { prefList } from 'src/lib/const'
import { NextPageWithLayout } from 'src/lib/next'
import { Weather } from 'src/pages-component/weather/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { WeatherData } from 'src/type/WeatherData'

export const getStaticPaths: GetStaticPaths<{ prefId: string }> = () => {
  const paths = prefList.map((pref) => ({ params: { prefId: pref.id } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  { weather: WeatherData },
  { prefId: string }
> = async (ctx) => {
  if (!ctx.params) {
    return { notFound: true }
  }

  const prefData = prefList[Number(ctx.params.prefId) - 1]

  // データを取得
  const OPENWEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${prefData.city},JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const openWeatherRes = await fetch(OPENWEATHER_URL)
  const openWeatherData = await openWeatherRes.json()

  const OPENMETEO_URL = `https://api.open-meteo.com/v1/forecast?latitude=${prefData.latitude}&longitude=${prefData.longlatitude}&daily=weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&timezone=Asia%2FTokyo`
  const openMeteoRes = await fetch(OPENMETEO_URL)
  const openMeteoData = await openMeteoRes.json()

  // 取得したデータを整形
  // const daily = []
  // for (let i = 0; i < 19; i++) {
  //   daily.push({
  //     datetime: json.list[i].dt_txt,
  //     icon: json.list[i].weather[0].icon,
  //     windSpeed: json.list[i].wind.speed,
  //     windDeg: json.list[i].wind.deg,
  //     rain: json.list[i].rain ? json.list[i].rain.3h : 0,
  //     tempFeels: json.list[i].main.feels_like,
  //     humidity: json.list[i].main.humidity,
  //   })
  // }
  const threeHourlyWeatherList = openWeatherData.list
    .slice(0, 19)
    .map((item: any) => {
      return {
        datetime: item.dt_txt,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed,
        windDeg: item.wind.deg,
        rain: item.rain ? item.rain : { '3h': 0 },
        tempFeels: item.main.feels_like,
        humidity: item.main.humidity,
      }
    })

  // const weekly = []
  // for (let i = 19; i < 40; i++) {
  //   weekly.push({
  //     datetime: json.list[i].dt_txt,
  //     icon: json.list[i].weather[0].icon,
  //     tempMax: json.list[i].main.temp_max,
  //     tempMin: json.list[i].main.temp_min,
  //     humidity: json.list[i].main.humidity,
  //   })
  // }

  const weeklyWeatherList = [
    {
      date: openMeteoData.daily.time[0],
      code: openMeteoData.daily.weathercode[0],
      tempMax: openMeteoData.daily.apparent_temperature_max[0],
      tempMin: openMeteoData.daily.apparent_temperature_min[0],
      sunrise: openMeteoData.daily.sunrise[0],
      sunset: openMeteoData.daily.sunset[0],
    },
  ]

  const data = {
    name: openWeatherData.city.name,
    time: openWeatherData.list[2].dt_txt,
    threeHourly: threeHourlyWeatherList,
    weekly: weeklyWeatherList,
  }

  return {
    props: {
      weather: data,
    },
    revalidate: 10800,
  }
}

const WeatherPage: NextPageWithLayout<{ weather: WeatherData }> = (props) => {
  console.log(props.weather)

  return (
    <>
      <PageTitle page='旅先の情報' />
      <Weather data={props.weather} />
    </>
  )
}

WeatherPage.getLayout = ContentLayout

export default WeatherPage
