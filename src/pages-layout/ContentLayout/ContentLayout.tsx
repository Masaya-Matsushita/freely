import { ReactElement } from 'react'
import { ErrorBoundary } from '../ErrorBoundary'

export const ContentLayout = (page: ReactElement) => {
  return (
    <ErrorBoundary>
      <header>Plan</header>
      <main>{page}</main>
      <footer>Footer</footer>
    </ErrorBoundary>
  )
}
