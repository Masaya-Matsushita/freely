import { NextPageWithLayout } from '@/lib/next'
import { Index } from '@/pages-component/index'
import { EnterLayout } from '@/pages-layout/EnterLayout'

const IndexPage: NextPageWithLayout = () => {
  return <Index />
}

IndexPage.getLayout = EnterLayout

export default IndexPage
