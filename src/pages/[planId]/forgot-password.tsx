import { NextPageWithLayout } from 'src/lib/next'
import { ForgotPassword } from 'src/pages-component/planId/forgot-password'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

const ForgotPasswordPage: NextPageWithLayout = () => {
  return <ForgotPassword />
}

ForgotPasswordPage.getLayout = ContentLayout

export default ForgotPasswordPage
