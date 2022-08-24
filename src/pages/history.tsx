import { NextPageWithLayout } from 'src/lib/next'
import { History } from 'src/pages-component/history'
import { EnterLayout } from 'src/pages-layout/EnterLayout'

const HistoryPage: NextPageWithLayout = () => {
  return <History />
}

HistoryPage.getLayout = EnterLayout

export default HistoryPage
