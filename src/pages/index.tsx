import { Index } from '@/pages-component/index'
import { EnterLayout } from '@/pages-layout/EnterLayout'
import { NextPageWithLayout } from '@/type/NextPageWithLayout'

const IndexPage: NextPageWithLayout = () => {
  return <Index />
}

IndexPage.getLayout = EnterLayout

export default IndexPage
