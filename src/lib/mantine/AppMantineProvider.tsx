import { MantineProvider } from '@mantine/core'
import { FC, ReactNode } from 'react'

/**
 * @package
 */
export const AppMantineProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        breakpoints: {
          xxs: 340,
          xs: 550,
          sm: 768,
          md: 992,
          lg: 1200,
          xl: 1400,
        },
      }}
    >
      {children}
    </MantineProvider>
  )
}
