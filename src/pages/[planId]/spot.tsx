import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { Spot } from 'src/pages-component/planId/spot'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

const SpotPage: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle page='スポット編集' />
      <Spot />
    </>
  )
}

SpotPage.getLayout = ContentLayout

export default SpotPage
