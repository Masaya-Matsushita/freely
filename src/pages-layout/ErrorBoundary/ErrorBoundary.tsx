import { FC, ReactNode } from 'react'
import { ErrorBoundary as OriginalErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './ErrorFallback'

/**
 * @package
 */
export const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <OriginalErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => location.reload()}
    >
      {children}
    </OriginalErrorBoundary>
  )
}
