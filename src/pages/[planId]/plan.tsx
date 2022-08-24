import { NextPageWithLayout } from '@/lib/next'
import { Plan } from '@/pages-component/planId/plan'
import { ContentLayout } from '@/pages-layout/ContentLayout'

const PlanPage: NextPageWithLayout = () => {
  return <Plan />
}

PlanPage.getLayout = ContentLayout

export default PlanPage
