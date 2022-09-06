import { GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { Sake } from 'src/pages-component/sake/pref'
import { ContentLayout } from 'src/pages-layout/ContentLayout'
import { SakeObj } from 'src/type/SakeObj'

export const getStaticProps: GetStaticProps = async () => {
  // 北海道
  const HOKKAIDO_URL = `https://www.sakenote.com/api/v1/sakes?token=${process.env.SAKENOTE_TOKEN}&prefecture_code=1`
  const hokkaidoRes = await fetch(HOKKAIDO_URL)
  const hokkaidoData = await hokkaidoRes.json()
  // 取得したデータを整形
  const hokkaidoTrimmedData = hokkaidoData.sakes.map((sake: any) => {
    return {
      name: sake.sake_name,
      en: sake.sake_alphabet,
      makerName: sake.maker_name,
      makerUrl: sake.maker_url,
    }
  })

  return {
    props: {
      sakeHokkaido: hokkaidoTrimmedData,
    },
  }
}

const SakePage: NextPageWithLayout<SakeObj> = (props) => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <Sake data={props} />
    </>
  )
}

SakePage.getLayout = ContentLayout

export default SakePage
