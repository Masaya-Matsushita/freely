import Head from 'next/head'
import { FC } from 'react'
import { getUrl } from '../const'

type MetaData = {
  pageTitle?: string
  pageDescription?: string
  pagePath?: string
  pageImg?: string
  pageImgWidth?: number
  pageImgHeight?: number
  enter?: true
}

/**
 * @package
 */
export const Seo: FC<MetaData> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  pageImgWidth,
  pageImgHeight,
  enter,
}) => {
  const defaultTitle = 'Freely'
  const defaultDescription =
    'Freelyは、世界一シンプル＆簡単な旅行計画表サービスです。大まかに計画を立てて、ゆっくり旅行がしたい人にぴったりです。'

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle
  const description = pageDescription ? pageDescription : defaultDescription
  const url = pagePath
  const imgUrl = pageImg
  const imgWidth = pageImgWidth ? pageImgWidth : 1920
  const imgHeight = pageImgHeight ? pageImgHeight : 1280
  const canonicalUrl = enter ? getUrl('INDEX') : getUrl('PLAN', 'foo')

  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      <meta name='description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content={String(imgWidth)} />
      <meta property='og:image:height' content={String(imgHeight)} />
      <link rel='canonical' href={canonicalUrl} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
