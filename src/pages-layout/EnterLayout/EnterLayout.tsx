import { ReactElement } from 'react'
import { Header } from './Header'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'
import { Footer } from 'src/pages-layout/Footer'
import { Seo } from 'src/pages-layout/Seo'

/**
 * @package
 */
export const EnterLayout = (page: ReactElement) => {
  return (
    <ErrorBoundary>
      <Seo />
      <Header />
      <div className='h-[108px] bg-main-100 xs:h-24' />
      <main className='min-h-[calc(100vh-96px)] bg-main-100 pt-16 pb-40'>
        {page}
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
