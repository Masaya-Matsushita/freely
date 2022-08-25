import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Header } from './Header'
import { SideNav } from './SideNav'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'

/**
 * @package
 */
export const ContentLayout = (page: ReactElement) => {
  const router = useRouter()
  const planId = router.query.planId

  return (
    <ErrorBoundary>
      {typeof planId === 'string' ? (
        <div>
          <Header router={router} planId={planId} />
          <div className='flex'>
            <SideNav planId={planId} />
            <main className='min-h-[calc(100vh-96px)] flex-1 bg-main-100'>
              {page}
            </main>
          </div>
          <footer>Footer</footer>
        </div>
      ) : null}
    </ErrorBoundary>
  )
}
