import { NextPageWithLayout } from 'src/lib/next'
import { Edit } from 'src/pages-component/planId/edit'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

const EditPage: NextPageWithLayout = () => {
  return <Edit />
}

EditPage.getLayout = ContentLayout

export default EditPage
