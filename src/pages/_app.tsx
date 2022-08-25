import 'src/style/globals.css'
import type { AppProps } from 'next/app'
import { AppMantineProvider } from 'src/lib/mantine'
import type { NextPageWithLayout } from 'src/lib/next'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <AppMantineProvider>
        {getLayout(<Component {...pageProps} />)}
      </AppMantineProvider>
    </>
  )
}

export default MyApp
