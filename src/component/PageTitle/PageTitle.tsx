import Head from 'next/head'
import { FC } from 'react'

/**
 * @package
 */
export const PageTitle: FC<{ page?: string }> = (props) => {
  if (!props.page) {
    return (
      <Head>
        <title>Freely</title>
      </Head>
    )
  }

  return (
    <Head>
      <title>{props.page} | Freely</title>
    </Head>
  )
}
