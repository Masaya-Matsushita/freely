/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import Image from 'next/image'
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
    <div className='absolute mt-32 flex flex-col items-center xs:left-1/2 xs:-ml-[270px]'>
      <div className='mx-4 text-2xl tracking-widest text-white xs:text-3xl md:text-4xl'>
        旅行計画をもっと手軽に
      </div>
      <div className='mt-10 text-6xl font-bold tracking-widest text-white md:mt-14 md:text-7xl'>
        Freely
      </div>
      <div className='mx-12 mt-16 hidden text-center text-xl tracking-widest text-white xxs:block xs:max-w-[450px] xs:text-2xl md:mt-20'>
        全ての面倒を省いた、世界一シンプル＆簡単な計画表作成サービスです
      </div>
    </div>
  )
}
