import { NextPageWithLayout } from 'src/lib/next'
import { Create } from 'src/pages-component/create'
import { EnterLayout } from 'src/pages-layout/EnterLayout'

const CreatePage: NextPageWithLayout = () => {
  return <Create />
}

CreatePage.getLayout = EnterLayout

export default CreatePage
