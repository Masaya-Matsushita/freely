import Link from 'next/link'
import { ReactElement } from 'react'
import { getPath } from 'src/lib/const'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'
import { HeaderWrapper } from 'src/pages-layout/HeaderWrapper'

const LINKS = [
  {
    path: 'INDEX',
    text: 'ホーム',
  },
  {
    path: 'CREATE',
    text: '作成する',
  },
  {
    path: 'HISTORY',
    text: '履歴',
  },
] as const

/**
 * @package
 */
export const EnterLayout = (page: ReactElement) => {
  return (
    <ErrorBoundary>
      <Header />
      <main className='min-h-[calc(100vh-96px)] bg-main-100'>{page}</main>
      <footer>Footer</footer>
    </ErrorBoundary>
  )
}

const Header = () => {
  return (
    <HeaderWrapper>
      <div className='ml-8 text-2xl font-medium tracking-wider text-dark-500 xs:ml-8 xs:text-3xl xs:font-normal'>
        Freely
      </div>
      <div className='mr-3 flex items-center xs:mr-10'>
        {LINKS.map((link) => {
          return (
            <Link href={getPath(link.path)} key={link.path}>
              <a className='mx-3 py-2 text-sm font-bold text-main-500 xs:mx-5 sm:text-base'>
                {link.text}
              </a>
            </Link>
          )
        })}
      </div>
    </HeaderWrapper>
  )
}
