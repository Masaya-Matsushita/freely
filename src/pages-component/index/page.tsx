/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import { HeroText } from './HeroText'
import { MemoModal } from 'src/component/MemoModal'
import { useMediaQuery } from 'src/lib/mantine'

/**
 * @package
 */
export const Index = () => {
  const largerThanMd = useMediaQuery('md')
  const [opened, { open, close }] = useDisclosure(true)

  const memoList: {
    id: number
    text: string
    marked: 'White' | 'Red' | 'Green'
  }[] = [
    {
      id: 1,
      text: '入場料3,100円',
      marked: 'White',
    },
    {
      id: 2,
      text: 'お土産購入忘れずに',
      marked: 'Red',
    },
    {
      id: 3,
      text: '初日が悪天候みたいなので、2日目の午後へ予定変更',
      marked: 'White',
    },
    {
      id: 4,
      text: 'この場所は訪れました！',
      marked: 'Green',
    },
  ]

  return (
    <>
      <MemoModal
        opened={opened}
        close={close}
        planId='hoge'
        spotId={1}
        memoList={memoList}
      />
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
            <Image src='/Naoshima.JPG' alt='' layout='fill' priority />
          </div>
          <HeroText />
        </div>
      )}
    </>
  )
}
