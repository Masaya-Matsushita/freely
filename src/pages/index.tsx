import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { Index } from 'src/pages-component/index'
import { EnterLayout } from 'src/pages-layout/EnterLayout'

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle />
      <Index />
    </>
  )
}

IndexPage.getLayout = EnterLayout

export default IndexPage
