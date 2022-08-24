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
      <main className='min-h-screen bg-main-100'>{page}</main>
      <footer>Footer</footer>
    </ErrorBoundary>
  )
}

const Header = () => {
  return (
    <HeaderWrapper>
      <div className='ml-8 text-2xl font-medium tracking-wider text-dark-500'>
        Freely
      </div>
      <div className='mr-3 flex items-center'>
        {LINKS.map((link) => {
          return (
            <Link href={getPath(link.path)} key={link.path}>
              <a className='mx-3 py-2 text-sm font-bold text-main-500'>
                {link.text}
              </a>
            </Link>
          )
        })}
      </div>
    </HeaderWrapper>
  )
}
