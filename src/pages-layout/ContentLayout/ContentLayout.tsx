import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
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
  const router = useRouter()
  const largerThanSm = useMediaQuery('sm')
  const [isShowSideNav, setIsShowSideNav] = useState(true)

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
    <RecoilRoot>
      <ErrorBoundary>
        <Seo invite />
        <InitState />
        <Header />
        <div className='flex'>
          {isShowSideNav ? <SideNav /> : null}
          <main className='min-h-[calc(100vh-96px)] flex-1 bg-main-100 pt-16 pb-40'>
            {page}
          </main>
        </div>
        {isShowSideNav && largerThanSm ? null : <Footer />}
      </ErrorBoundary>
    </RecoilRoot>
  )
}
