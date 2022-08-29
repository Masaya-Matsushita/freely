import { GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { PrefNews } from 'src/pages-component/pref-news'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { WeatherObj } from 'src/type/WeatherObj'

export const getStaticProps: GetStaticProps<WeatherObj> = async () => {
  // TODO: 47都道府県分fetchを繰り返したい
  // NOTE: 「動的ページを作成してgetStaticPathで回す」内容の記事ばかりだった
  const WEATHER_URL_SAPPORO = `https://api.openweathermap.org/data/2.5/forecast?q=Sapporo,JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const weatherSapporoRes = await fetch(WEATHER_URL_SAPPORO)
  const weatherSapporoData = await weatherSapporoRes.json()

  const WEATHER_URL_AOMORI = `https://api.openweathermap.org/data/2.5/forecast?q=Aomori,JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const weatherAomoriRes = await fetch(WEATHER_URL_AOMORI)
  const weatherAomoriData = await weatherAomoriRes.json()

  return {
    props: {
      weatherSapporo: weatherSapporoData,
      weatherAomori: weatherAomoriData,
    },
    revalidate: 10800,
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
