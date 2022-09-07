import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
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
  const largerThanSm = useMediaQuery('sm')
  const [planId, setPlanId] = useState('')
  const [isShowSideNav, setIsShowSideNav] = useState(true)

  // planIdに初期値を代入
  useEffect(() => {
    const localPlanId = localStorage.getItem('planId')
    if (localPlanId) {
      setPlanId(localPlanId)
    }
  }, [])

  // edit, spotページではSideNavを非表示
  useEffect(() => {
    if (
      router.pathname === '/[planId]/[spotId]/edit' ||
      router.pathname === '/[planId]/[spotId]/spot'
    ) {
      setIsShowSideNav(false)
    }
    return () => {
      setIsShowSideNav(true)
    }
  }, [router])

  return (
    <ErrorBoundary>
      <Seo invite />
      {planId ? (
        <div>
          <Header planId={planId} />
          <div className='flex'>
            {isShowSideNav ? <SideNav planId={planId} /> : null}
            <main className='min-h-[calc(100vh-96px)] flex-1 bg-main-100 pt-16 pb-40'>
              {page}
            </main>
          </div>
          {largerThanSm && isShowSideNav ? null : <Footer />}
        </div>
      ) : null}
    </ErrorBoundary>
  )
}
