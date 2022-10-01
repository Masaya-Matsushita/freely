import { GetStaticPaths, GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { prefList } from 'src/lib/const'
import { NextPageWithLayout } from 'src/lib/next'
import { Weather } from 'src/pages-component/weather/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { ThreeHourly, WeatherData, Weekly } from 'src/type/WeatherData'

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

  // データを取得
  const prefData = prefList[Number(ctx.params.prefId) - 1]

  const OPENWEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${prefData.city},JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const openWeatherRes = await fetch(OPENWEATHER_URL)
  const openWeatherData = await openWeatherRes.json()

  const OPENMETEO_URL = `https://api.open-meteo.com/v1/forecast?latitude=${prefData.latitude}&longitude=${prefData.longlatitude}&daily=weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&timezone=Asia%2FTokyo`
  const openMeteoRes = await fetch(OPENMETEO_URL)
  const openMeteoData = await openMeteoRes.json()

  // 取得したデータを整形
  const threeHourlyWeatherList: ThreeHourly[] = openWeatherData.list
    .slice(0, 19)
    .map((item: any) => {
      return {
        time: item.dt_txt.slice(11, 13),
        icon: item.weather[0].icon,
        windSpeed: Math.round(item.wind.speed * 10) / 10,
        windDeg: item.wind.deg,
        rain: item.rain ? item.rain : { '3h': 0 },
        tempFeels: Math.round(item.main.feels_like),
        humidity: item.main.humidity,
      }
    })

  const weeklyWeatherList: Weekly[] = []
  for (let i = 0; i < openMeteoData.daily.time.length; i++) {
    const date = openMeteoData.daily.time[i].split('-')
    weeklyWeatherList.push({
      year: Number(date[0]),
      month: Number(date[1]),
      day: Number(date[2]),
      code: openMeteoData.daily.weathercode[i],
      tempMax: Math.round(openMeteoData.daily.apparent_temperature_max[i]),
      tempMin: Math.round(openMeteoData.daily.apparent_temperature_min[i]),
      sunrise: openMeteoData.daily.sunrise[i],
      sunset: openMeteoData.daily.sunset[i],
    })
  }

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
  return (
    <>
      <PageTitle page='旅先の情報' />
      <Weather data={props.weather} />
    </>
  )
}

WeatherPage.getLayout = ContentLayout

export default WeatherPage
