import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { Header } from './Header'
import { PrefSelectBox } from './PrefSelectBox'
import { SideNav } from './SideNav'
import { getPath } from 'src/lib/const'
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
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    if (
      router.asPath.slice(0, 5) === '/edit' ||
      router.asPath.slice(0, 5) === '/spot'
    ) {
      setIsShow(false)
    }
    return () => {
      setIsShow(true)
    }
  }, [router])

  return (
    <ErrorBoundary>
      <Seo invite />
      {typeof planId === 'string' ? (
        <div>
          <Header router={router} planId={planId} largerThanSm={largerThanSm} />
          <div className='flex'>
            {isShow ? <SideNav planId={planId} /> : null}
            <main className='min-h-[calc(100vh-96px)] flex-1 bg-main-100 pt-16 pb-40'>
              {router.pathname.slice(0, 10) === getPath('PREF_NEWS') ? (
                <PrefSelectBox router={router} planId={planId} />
              ) : null}
              <div>{page}</div>
            </main>
          </div>
          {largerThanSm && isShow ? null : <Footer />}
        </div>
      ) : null}
    </ErrorBoundary>
  )
}
