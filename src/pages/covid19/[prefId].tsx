import { GetStaticPaths, GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { prefList } from 'src/lib/const'
import { NextPageWithLayout } from 'src/lib/next'
import { Covid19 } from 'src/pages-component/covid19/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { Covid19Data } from 'src/type/Covid19Data'

export const getStaticPaths: GetStaticPaths<{ prefId: string }> = () => {
  const paths = prefList.map((pref) => ({ params: { prefId: pref.id } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  { covid19: Covid19Data },
  { prefId: string }
> = async (ctx) => {
  if (!ctx.params) {
    return { notFound: true }
  }
  // 都道府県のコロナデータ取得
  const API_URL = `https://opendata.corona.go.jp/api/Covid19JapanAll?dataName=${
    prefList[Number(ctx.params.prefId) - 1].name
  }`
  const res = await fetch(API_URL)
  const data = await res.json()

  // 取得したデータを整形
  const trimmedData = data.itemList
    .slice(0, 98)
    .map((item: any, index: number) => {
      return {
        date: item.date,
        infectedNum:
          index < 97
            ? Math.max(
                Number(item.npatients) -
                  Number(data.itemList[index + 1].npatients),
                0,
              )
            : 0,
      }
    })
  const rebuildData = {
    errorInfo: data.errorInfo,
    itemList: trimmedData.reverse().slice(1),
  }

  return {
    props: {
      covid19: rebuildData,
    },
    revalidate: 86400,
  }
}

const Covid19Page: NextPageWithLayout<{ covid19: Covid19Data }> = (props) => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <Covid19 data={props.covid19} />
    </>
  )
}

Covid19Page.getLayout = ContentLayout

export default Covid19Page
