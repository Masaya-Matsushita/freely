import { NextPageWithLayout } from 'src/lib/next'
import { Index } from 'src/pages-component/index'
import { EnterLayout } from 'src/pages-layout/EnterLayout'

const IndexPage: NextPageWithLayout = () => {
  return <Index />
}

IndexPage.getLayout = EnterLayout

export default IndexPage
