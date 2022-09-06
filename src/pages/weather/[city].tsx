import { GetStaticPaths, GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { prefList } from 'src/lib/const'
import { NextPageWithLayout } from 'src/lib/next'
import { Weather } from 'src/pages-component/weather/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

export const getStaticPaths: GetStaticPaths<{ city: string }> = () => {
  const paths = prefList.map((pref) => ({ params: { city: pref.city } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, { city: string }> = async (
  ctx,
) => {
  if (!ctx.params) {
    return { notFound: true }
  }

  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${ctx.params.city},JP&appid=${process.env.OPENWEATHERMAP_APPID}&lang=ja&units=metric`
  const res = await fetch(API_URL)
  const json = await res.json()

  return {
    props: {
      data: json,
    },
    revalidate: 10800,
  }
}

const WeatherPage: NextPageWithLayout<any> = (props) => {
  console.log(props.data)

  return (
    <>
      <PageTitle page='旅先の情報' />
      {/* <Weather data={props} /> */}
    </>
  )
}

WeatherPage.getLayout = ContentLayout

export default WeatherPage
