import { GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { Covid19 } from 'src/pages-component/covid19/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { Covid19Obj } from 'src/type/Covid19Obj'

export const getStaticProps: GetStaticProps = async () => {
  // 日本全体
  const JAPAN_URL =
    'https://opendata.corona.go.jp/api/OccurrenceStatusOverseas?dataName=%E6%97%A5%E6%9C%AC'
  const japanRes = await fetch(JAPAN_URL)
  const japanData = await japanRes.json()
  // 取得したデータを整形
  const japanRecentData = japanData.itemList.filter(
    (item: any, index: number) => {
      return 1 <= index && index <= 31
    },
  )
  const japanTrimmedData = japanRecentData.map((item: any) => {
    return { date: item.date, infectedNum: item.infectedNum }
  })
  const japanRebuildData = {
    errorInfo: japanData.errorInfo,
    itemList: japanTrimmedData,
  }

  // 北海道
  const HOKKAIDO_URL =
    'https://opendata.corona.go.jp/api/Covid19JapanAll?dataName=%E5%8C%97%E6%B5%B7%E9%81%93'
  const hokkaidoRes = await fetch(HOKKAIDO_URL)
  const hokkaidoData = await hokkaidoRes.json()
  // 取得したデータを整形
  const hokkaidoRecentData = hokkaidoData.itemList.filter(
    (item: any, index: number) => {
      return index <= 30
    },
  )
  const hokkaidoTrimmedData = hokkaidoRecentData.map((item: any) => {
    return { date: item.date, infectedNum: item.npatients }
  })
  const hokkaidoRebuildData = {
    errorInfo: hokkaidoData.errorInfo,
    itemList: hokkaidoTrimmedData,
  }

  return {
    props: {
      covid19Japan: japanRebuildData,
      covid19Hokkaido: hokkaidoRebuildData,
    },
    revalidate: 86400,
  }
}

const Covid19Page: NextPageWithLayout<Covid19Obj> = (props) => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <Covid19 data={props} />
    </>
  )
}

Covid19Page.getLayout = ContentLayout

export default Covid19Page
