import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { PrefNews } from 'src/pages-component/planId/pref-news'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

const PrefNewsPage: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle page='旅先の情報' />
      <PrefNews />
    </>
  )
}

PrefNewsPage.getLayout = ContentLayout

export default PrefNewsPage
