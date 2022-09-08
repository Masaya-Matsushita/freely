import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
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
      }}
    >
      <NotificationsProvider position='top-center' className='mt-16 xs:mt-12'>
        {children}
      </NotificationsProvider>
    </MantineProvider>
  )
}
