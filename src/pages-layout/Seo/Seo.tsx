import Head from 'next/head'
import { FC } from 'react'
import { getUrl } from 'src/lib/const'

const descriptionList = [
  '世界一シンプル＆簡単な旅行計画表サービス「Freely」。大まかに計画を立てて、ゆっくり旅行がしたい人にぴったりです。',
  '旅行のプランに招待されました！',
] as const

/**
 * @package
 */
export const Seo: FC<{ invite?: true }> = (props) => {
  const description = props.invite ? descriptionList[1] : descriptionList[0]
  const url = getUrl('INDEX')

  return (
    <Head>
      <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      <meta name='description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:title' content='Freely' />
      <meta property='og:site_name' content='Freely' />
      <meta property='og:description' content={description} />
      <meta property='og:locale' content='ja_JP' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='/Naoshima.JPG' />
      <meta property='og:image:width' content='1920' />
      <meta property='og:image:height' content='1280' />
      <link rel='canonical' href={url} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
