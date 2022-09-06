import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { Plan } from 'src/pages-component/planId/plan'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

const PlanPage: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle page='旅行プラン' />
      <Plan />
    </>
  )
}

PlanPage.getLayout = ContentLayout

export default PlanPage
