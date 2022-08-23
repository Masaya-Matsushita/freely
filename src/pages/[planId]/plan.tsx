import { Plan } from '@/pages-component/planId/plan'
import { ContentLayout } from '@/pages-layout/ContentLayout'
import { NextPageWithLayout } from '@/type/NextPageWithLayout'

const PlanPage: NextPageWithLayout = () => {
  return <Plan />
}

PlanPage.getLayout = ContentLayout

export default PlanPage
