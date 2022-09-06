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

  // データを取得
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${
    prefList[Number(ctx.params.prefId) - 1].city
  },JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const res = await fetch(API_URL)
  const json = await res.json()

  return {
    props: {
      weather: json,
    },
    revalidate: 10800,
  }
}

const WeatherPage: NextPageWithLayout<{ weather: WeatherData }> = (props) => {

  return (
    <>
      <PageTitle page='旅先の情報' />
      {/* <Weather data={props.weather} /> */}
    </>
  )
}

WeatherPage.getLayout = ContentLayout

export default WeatherPage
