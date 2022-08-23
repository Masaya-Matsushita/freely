import { Plan } from '@/pages-component/planId/plan'
import { PlanLayout } from '@/pages-layout/PlanLayout'
import { NextPageWithLayout } from '@/type/NextPageWithLayout'

const PlanPage: NextPageWithLayout = () => {
  return <Plan />
}

PlanPage.getLayout = PlanLayout

export default PlanPage
