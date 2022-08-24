import { NextPageWithLayout } from 'src/lib/next'
import { Spot } from 'src/pages-component/planId/spot'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

const SpotPage: NextPageWithLayout = () => {
  return <Spot />
}

SpotPage.getLayout = ContentLayout

export default SpotPage
