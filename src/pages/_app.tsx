import '@/style/globals.css'
import type { AppProps } from 'next/app'
import { AppMantineProvider } from '@/lib/mantine'
import type { NextPageWithLayout } from '@/lib/next'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <div>
      <AppMantineProvider>
        {getLayout(<Component {...pageProps} />)}
      </AppMantineProvider>
    </div>
  )
}

export default MyApp
