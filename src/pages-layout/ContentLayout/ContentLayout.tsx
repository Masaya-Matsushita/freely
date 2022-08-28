import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Header } from './Header'
import { SideNav } from './SideNav'
import { useMediaQuery } from 'src/lib/mantine'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'
import { Footer } from 'src/pages-layout/Footer'
import { Seo } from 'src/pages-layout/Seo'

/**
 * @package
 */
export const ContentLayout = (page: ReactElement) => {
  const router = useRouter()
  const planId = router.query.plan
  const largerThanSm = useMediaQuery('sm')

  return (
    <ErrorBoundary>
      <Seo invite />
      {typeof planId === 'string' ? (
        <div>
          <Header router={router} planId={planId} largerThanSm={largerThanSm} />
          <div className='flex'>
            <SideNav planId={planId} />
            <main className='min-h-[calc(100vh-96px)] flex-1 bg-main-100'>
              {page}
            </main>
          </div>
          {largerThanSm ? null : <Footer />}
        </div>
      ) : null}
    </ErrorBoundary>
  )
}
