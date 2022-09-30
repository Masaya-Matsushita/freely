import { ReactElement } from 'react'
import { RecoilRoot } from 'recoil'
import { Header } from './Header'
import { InitState } from './InitState'
import { SideNav } from './SideNav'
import { useMediaQuery } from 'src/lib/mantine'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'
import { Footer } from 'src/pages-layout/Footer'
import { Seo } from 'src/pages-layout/Seo'

/**
 * @package
 */
export const ContentLayout = (page: ReactElement) => {
  const largerThanSm = useMediaQuery('sm')

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <Seo invite />
        <InitState />
        <Header />
        <div className='flex'>
          <SideNav />
          <main className='min-h-[calc(100vh-96px)] flex-1 bg-main-100 pt-16 pb-40'>
            {page}
          </main>
        </div>
        {largerThanSm ? null : <Footer />}
      </RecoilRoot>
    </ErrorBoundary>
  )
}
