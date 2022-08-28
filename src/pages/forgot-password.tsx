import { PageTitle } from 'src/component/PageTitle'
import { NextPageWithLayout } from 'src/lib/next'
import { ForgotPassword } from 'src/pages-component/forgot-password'
import { ContentLayout } from 'src/pages-layout/ContentLayout'

const ForgotPasswordPage: NextPageWithLayout = () => {
  return (
    <>
      <PageTitle page='パスワード再設定' />
      <ForgotPassword />
    </>
  )
}

ForgotPasswordPage.getLayout = ContentLayout

export default ForgotPasswordPage
