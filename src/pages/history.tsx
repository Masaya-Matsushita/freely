import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { History } from 'src/pages-component/history'
import { EnterLayout } from 'src/pages-layout/EnterLayout'

const HistoryPage: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle page='履歴' />
      <History />
    </>
  )
}

HistoryPage.getLayout = EnterLayout

export default HistoryPage
