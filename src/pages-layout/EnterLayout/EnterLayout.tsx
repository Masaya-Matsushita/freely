import { ReactElement } from 'react'
import { ErrorBoundary } from 'src/pages-layout/ErrorBoundary'

/**
 * @package
 */
export const EnterLayout = (page: ReactElement) => {
  return (
    <ErrorBoundary>
      <header>Enter</header>
      <main>{page}</main>
      <footer>Footer</footer>
    </ErrorBoundary>
  )
}
