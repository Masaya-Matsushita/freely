import 'src/style/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { AppMantineProvider } from 'src/lib/mantine'
import type { NextPageWithLayout } from 'src/lib/next'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init)
  return res.json()
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <AppMantineProvider>
        <RecoilRoot>
          <SWRConfig value={{ fetcher }}>
            {getLayout(<Component {...pageProps} />)}
          </SWRConfig>
        </RecoilRoot>
      </AppMantineProvider>
    </>
  )
}

export default MyApp
