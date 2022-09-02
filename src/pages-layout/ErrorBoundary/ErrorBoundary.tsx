import { FC, ReactNode } from 'react'
import { ErrorBoundary as OriginalErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './ErrorFallback'

const onError = (error: Error, info: { componentStack: string }) => {
  console.log('error-message', error.message)
  console.log('info-componentStack', info.componentStack)
}

/**
 * @package
 */
export const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <OriginalErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onError}
      onReset={() => location.reload()}
    >
      {children}
    </OriginalErrorBoundary>
  )
}
