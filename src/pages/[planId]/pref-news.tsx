import { NextPageWithLayout } from 'src/lib/next'
import { PrefNews } from 'src/pages-component/planId/pref-news'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

const PrefNewsPage: NextPageWithLayout = () => {
  return <PrefNews />
}

PrefNewsPage.getLayout = ContentLayout

export default PrefNewsPage
