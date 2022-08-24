import { ReactElement } from 'react'
import { Header } from './Header'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'

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
