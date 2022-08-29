import { GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { Sake } from 'src/pages-component/pref-news/sake'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

const SakePage: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <Sake />
    </>
  )
}

SakePage.getLayout = ContentLayout

export default SakePage
