/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import Image from 'next/image'
import { HeroText } from './HeroText'
import { useMediaQuery } from 'src/lib/mantine'

/**
 * @package
 */
export const Index = () => {
  const largerThanMd = useMediaQuery('md')

  return (
    <>
      {largerThanMd ? (
        <div className='relative -mt-16 h-[calc(100vh+20px)] overflow-hidden'>
          <div className='absolute top-1/2 left-1/2 -mt-[calc((100vh+20px)/2)] -ml-[calc((100vh+20px))] h-[calc(100vh+20px)] w-[calc((100vh+20px)*2)]'>
            <Image src='/NaoshimaWide.JPG' alt='' layout='fill' priority />
          </div>
          <HeroText />
        </div>
      ) : (
        <div className='relative -mt-16 h-[calc(100vh-96px)] overflow-hidden'>
          <div className='absolute top-1/2 left-1/2 -mt-[calc((100vh-96px)/2)] -ml-[calc((100vh-96px+16px)/4*3)] h-[calc(100vh-96px)] w-[calc((100vh-96px)/2*3)]'>
            <Image src='/Naoshima.jpg' alt='' layout='fill' priority />
          </div>
          <HeroText />
        </div>
      )}
    </>
  )
}
