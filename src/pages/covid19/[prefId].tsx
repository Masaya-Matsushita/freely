import { GetStaticPaths, GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { prefList } from 'src/lib/const'
import { NextPageWithLayout } from 'src/lib/next'
import { Covid19 } from 'src/pages-component/covid19/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { Covid19Data } from 'src/type/Covid19Data'

// export const getStaticPaths: GetStaticPaths<{ prefId: string }> = () => {
//   const paths = prefList.map((pref) => ({ params: { prefId: pref.id } }))
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps<
//   { covid19: Covid19Data },
//   { prefId: string }
// > = async (ctx) => {
//   if (!ctx.params) {
//     return { notFound: true }
//   }

//   // 日本全体
//   const API_URL_JAPAN =
//     'https://opendata.corona.go.jp/api/OccurrenceStatusOverseas?dataName=%E6%97%A5%E6%9C%AC'
//   const japanRes = await fetch(API_URL_JAPAN)
//   const japanData = await japanRes.json()

//   // 取得したデータを整形
//   const japanRecentData = japanData.itemList.filter(
//     (item: any, index: number) => {
//       return 1 <= index && index <= 31
//     },
//   )
//   const japanTrimmedData = japanRecentData.map((item: any) => {
//     return { date: item.date, infectedNum: item.infectedNum }
//   })
//   const japanRebuildData = {
//     errorInfo: japanData.errorInfo,
//     itemList: japanTrimmedData,
//   }

//   // 都道府県
//   const API_URL_PREF = `https://opendata.corona.go.jp/api/Covid19JapanAll?dataName=${
//     prefList[Number(ctx.params.prefId) - 1].name
//   }`
//   const prefRes = await fetch(API_URL_PREF)
//   const prefData = await prefRes.json()

//   // 取得したデータを整形
//   const prefRecentData = prefData.itemList.filter(
//     (item: any, index: number) => {
//       return index <= 30
//     },
//   )
//   const prefTrimmedData = prefRecentData.map((item: any) => {
//     return { date: item.date, infectedNum: item.npatients }
//   })
//   const prefRebuildData = {
//     errorInfo: prefData.errorInfo,
//     itemList: prefTrimmedData,
//   }

//   return {
//     props: {
//       covid19: {
//         covid19Japan: japanRebuildData,
//         covid19Pref: prefRebuildData,
//       },
//     },
//     revalidate: 86400,
//   }
// }

// const Covid19Page: NextPageWithLayout<{ covid19: Covid19Data }> = (props) => {
const Covid19Page = () => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      {/* <Covid19 data={props.covid19} /> */}
      <Covid19 />
    </>
  )
}

Covid19Page.getLayout = ContentLayout

export default Covid19Page
