/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { Button } from '@mantine/core'
import { NextLink } from '@mantine/next'
import Image from 'next/image'
import { getPath } from 'src/lib/const'
import { useMediaQuery } from 'src/lib/mantine'

/**
 * @package
 */
export const Index = () => {
  const largerThanMd = useMediaQuery('md')

  return (
    <>
      {largerThanMd ? (
        <div className='relative h-[calc(100vh+20px)] overflow-hidden'>
          <div className='absolute top-1/2 left-1/2 -mt-[calc((100vh+20px)/2)] -ml-[calc((100vh+20px))] h-[calc(100vh+20px)] w-[calc((100vh+20px)*2)]'>
            <Image src='/NaoshimaWide.JPG' alt='' layout='fill' priority />
          </div>
          <HeroText />
        </div>
      ) : (
        <div className='relative h-[calc(100vh-96px)] overflow-hidden'>
          <div className='absolute top-1/2 left-1/2 -mt-[calc((100vh-96px)/2)] -ml-[calc((100vh-96px+16px)/4*3)] h-[calc(100vh-96px)] w-[calc((100vh-96px)/2*3)]'>
            <Image src='/Naoshima.JPG' alt='' layout='fill' priority />
          </div>
          <HeroText />
        </div>
      )}
    </>
  )
}

const HeroText = () => {
  return (
    <div className='absolute top-1/4 -mt-20 flex flex-col items-center xs:left-1/2 xs:top-1/4 xs:-ml-[270px] md:top-1/4'>
      <div className='mx-4 text-2xl tracking-widest text-white xs:text-3xl md:text-4xl'>
        旅行計画をもっと手軽に
      </div>
      <div className='mb-28 mt-10 text-6xl font-bold tracking-widest text-white xxs:mb-0 md:mt-14 md:text-7xl'>
        Freely
      </div>
      <div className='mx-12 mt-16 mb-12 hidden text-center text-xl tracking-widest text-white xxs:block xs:mb-16 xs:max-w-[450px] xs:text-2xl md:mb-24 md:mt-20'>
        全ての面倒を省いた、世界一シンプル＆簡単な計画表作成サービスです
      </div>
      <LinkButton />
    </div>
  )
}

const LinkButton = () => {
  return (
    <Button
      component={NextLink}
      variant='light'
      href={getPath('CREATE')}
      className='h-12 w-52 rounded-md border-[1px] border-solid border-main-500 bg-main-300/80 text-lg font-bold text-main-500  transition-colors duration-300 hover:bg-main-300 xs:w-60'
    >
      プランを新規作成
    </Button>
  )
}
