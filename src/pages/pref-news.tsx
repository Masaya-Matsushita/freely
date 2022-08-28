import { GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { PrefNews } from 'src/pages-component/pref-news'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { WeatherObj } from 'src/type/WeatherObj'

export const getStaticProps: GetStaticProps = async () => {
  const WEATHER_URL_TOKYO = `https://api.openweathermap.org/data/2.5/forecast?q=Tokyo,JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const weatherTokyoRes = await fetch(WEATHER_URL_TOKYO)
  const weatherTokyoData = await weatherTokyoRes.json()

  const WEATHER_URL_OSAKA = `https://api.openweathermap.org/data/2.5/forecast?q=Osaka,JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const weatherOsakaRes = await fetch(WEATHER_URL_OSAKA)
  const weatherOsakaData = await weatherOsakaRes.json()

  return {
    props: {
      weatherTokyo: weatherTokyoData,
      weatherOsaka: weatherOsakaData,
    },
  }
}

const PrefNewsPage: NextPageWithLayout<WeatherObj> = (props) => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <PrefNews weatherData={props} />
    </>
  )
}

PrefNewsPage.getLayout = ContentLayout

export default PrefNewsPage
