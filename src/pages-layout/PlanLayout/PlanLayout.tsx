import { ReactElement } from 'react'
import { ErrorBoundary } from '../ErrorBoundary'

export const PlanLayout = (page: ReactElement) => {
  return (
    <ErrorBoundary>
      <header>Plan</header>
      <main>{page}</main>
      <footer>Footer</footer>
    </ErrorBoundary>
  )
}
