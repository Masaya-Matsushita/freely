import { GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { Weather } from 'src/pages-component/weather/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { WeatherObj } from 'src/type/WeatherObj'

export const getStaticProps: GetStaticProps<WeatherObj> = async () => {
  // TODO: 47都道府県分fetchを繰り返したい
  // NOTE: 「動的ページを作成してgetStaticPathで回す」内容の記事ばかりだった
  const SAPPORO_URL = `https://api.openweathermap.org/data/2.5/forecast?q=Sapporo,JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const sapporoRes = await fetch(SAPPORO_URL)
  const sapporoData = await sapporoRes.json()

  const AOMORI_URL = `https://api.openweathermap.org/data/2.5/forecast?q=Aomori,JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const aomoriRes = await fetch(AOMORI_URL)
  const aomoriData = await aomoriRes.json()

  return {
    props: {
      weatherSapporo: sapporoData,
      weatherAomori: aomoriData,
    },
    revalidate: 10800,
  }
}

const WeatherPage: NextPageWithLayout<WeatherObj> = (props) => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <Weather data={props} />
    </>
  )
}

WeatherPage.getLayout = ContentLayout

export default WeatherPage
