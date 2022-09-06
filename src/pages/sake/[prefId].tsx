import { GetStaticPaths, GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { prefList } from 'src/lib/const'
import { NextPageWithLayout } from 'src/lib/next'
import { Sake } from 'src/pages-component/sake/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { SakeData } from 'src/type/SakeData'

export const getStaticPaths: GetStaticPaths<{ prefId: string }> = () => {
  const paths = prefList.map((pref) => ({ params: { prefId: pref.id } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  { sake: SakeData },
  { prefId: string }
> = async (ctx) => {
  if (!ctx.params) {
    return { notFound: true }
  }

  // データを取得
  const API_URL = `https://www.sakenote.com/api/v1/sakes?token=${process.env.SAKENOTE_TOKEN}&prefecture_code=${ctx.params.prefId}`
  const res = await fetch(API_URL)
  const json = await res.json()

  // 取得したデータを整形
  const data = json.sakes.map((sake: any) => {
    return {
      name: sake.sake_name,
      en: sake.sake_alphabet,
      makerName: sake.maker_name,
      makerUrl: sake.maker_url,
    }
  })

  return {
    props: {
      sake: data,
    },
  }
}

const SakePage: NextPageWithLayout<{ sake: SakeData }> = (props) => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <Sake data={props.sake} />
    </>
  )
}

SakePage.getLayout = ContentLayout

export default SakePage
