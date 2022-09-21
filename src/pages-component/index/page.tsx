/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { showNotification } from '@mantine/notifications'
import { IconArrowBackUp } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { HeroText } from './HeroText'
import { getPath } from 'src/lib/const'
import { useMediaQuery } from 'src/lib/mantine'

/**
 * @package
 */
export const Index = () => {
  const largerThanMd = useMediaQuery('md')

  useEffect(() => {
    const planList = localStorage.getItem('planList')
    if (planList) {
      showNotification({
        id: 'info',
        autoClose: 5000,
        color: 'indigo',
        message: (
          <div>
            <Link href={getPath('HISTORY')}>
              <a className='mx-1 font-bold tracking-wide text-main-500'>履歴</a>
            </Link>
            <span>ページから前回のプランへ戻れます。</span>
          </div>
        ),
        icon: <IconArrowBackUp size={18} />,
        styles: (theme) => ({
          root: {
            backgroundColor: '#fff',
            padding: '16px',
          },
          description: { color: theme.colors.gray[7] },
          closeButton: { color: theme.colors.gray[6] },
          icon: { width: '28px', height: '28px' },
        }),
      })
    }
  }, [])

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
            <Image src='/Naoshima.JPG' alt='' layout='fill' priority />
          </div>
          <HeroText />
        </div>
      )}
    </>
  )
}
