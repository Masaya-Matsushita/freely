import { GetStaticProps } from 'next'
import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { Covid19 } from 'src/pages-component/pref-news/covid19'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

const Covid19Page: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <Covid19 />
    </>
  )
}

Covid19Page.getLayout = ContentLayout

export default Covid19Page
