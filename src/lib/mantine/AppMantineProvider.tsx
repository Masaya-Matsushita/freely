import { MantineProvider } from '@mantine/core'
import { FC, ReactNode } from 'react'

export const AppMantineProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      }}
    >
      {children}
    </MantineProvider>
  )
}
