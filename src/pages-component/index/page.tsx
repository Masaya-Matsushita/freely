/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { IconCircleCheck, IconCircleX } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { HeroText } from './HeroText'
import { useMediaQuery } from 'src/lib/mantine'

const FEATURES = [
  {
    src: '/Features1.svg',
    text: '面倒な入力フォームは徹底的に排除。最低限の入力だけで旅行プランが完成します。',
    href: 'https://freely-azure.vercel.app/3db85a60-e343-44f4-8778-dce6ff194996/plan',
    link: 'プラン作成例を見る →',
  },
  {
    src: '/Features2.svg',
    text: '旅先の都道府県を設定することで、天気やコロナ情報などを確認できます。',
    href: 'https://freely-azure.vercel.app/weather/13?plan_id=3db85a60-e343-44f4-8778-dce6ff194996',
    link: '天気予報ページへ →',
  },
  {
    src: '/Features3.svg',
    text: '旅行のメンバーとプランを共有し、リアルタイムで共同編集ができます。',
  },
]

const OK_SITUATIONS = [
  '国内・短期間の旅行',
  'みんなでワイワイ計画したい',
  '時間に縛られない旅行がしたい',
]

const NG_SITUATIONS = ['海外・長期間の旅行', 'しっかり計画を立てたい']

/**
 * @package
 */
export const Index = () => {
  const largerThanXxs = useMediaQuery('xxs')
  const largerThanMd = useMediaQuery('md')

  return (
    <>
      {largerThanMd ? (
        <div className='relative -mt-16 h-[calc(100vh+20px)] overflow-hidden'>
          <div className='absolute top-1/2 left-1/2 -mt-[calc((100vh+20px)/2)] -ml-[calc((100vh+20px))] h-[calc(100vh+20px)] w-[calc((100vh+20px)*2)] opacity-75'>
            <Image src='/NaoshimaWide.JPG' alt='' layout='fill' priority />
          </div>
          <HeroText />
        </div>
      ) : (
        <div className='relative -mt-16 h-[calc(100vh-96px)] overflow-hidden'>
          <div className='absolute top-1/2 left-1/2 -mt-[calc((100vh-96px)/2)] -ml-[calc((100vh-96px+16px)/4*3)] h-[calc(100vh-96px)] w-[calc((100vh-96px)/2*3)] opacity-75'>
            <Image src='/Naoshima.JPG' alt='' layout='fill' priority />
          </div>
          <HeroText />
        </div>
      )}
      <div className='mt-48 flex items-center justify-center gap-[6vw]'>
        <div className='relative hidden h-80 w-80 opacity-90 md:block xl:h-[360px] xl:w-[360px]'>
          <Image src='/DreamerImage.svg' alt='' layout='fill' />
        </div>
        <div className='mx-auto max-w-[416px] xs:max-w-[520px] md:mx-0'>
          <div className='mx-4 flex items-center gap-4 xxs:gap-6 xs:gap-8'>
            <div className='h-[1.5px] w-24 rounded-sm bg-dark-500 xxs:w-28 xs:w-32 md:w-20 lg:w-28' />
            <div className='max-w-[248px] font-bold tracking-widest text-dark-600 xxs:text-[22px] xxs:leading-9 xs:max-w-[312px] md:max-w-[320px] md:text-2xl'>
              「きっちりしすぎ」は苦手な方へ
            </div>
          </div>
          <div className='mx-8 ml-auto mt-4 w-56 space-y-2 text-xs leading-5 tracking-wide text-dark-300 xxs:mt-8 xxs:w-full xxs:max-w-[280px] xxs:space-y-3 xxs:text-sm xxs:leading-6 xs:mt-10 xs:max-w-[340px] xs:space-y-4 xs:text-base md:mt-8 md:max-w-[320px] md:space-y-3 md:text-sm lg:mt-10 lg:max-w-[364px] lg:text-base'>
            <div>「旅行の計画を立てたい、でも細かく指定したくない」</div>
            <div>「行き先だけを決めて、時間に縛られずゆっくり巡りたい」</div>
            <div>
              そんな思いから生まれた、世界一手軽な旅行計画サービス「Freely」。
            </div>
            <div>
              細かな時間・料金計算に縛られず、大まかに計画を立てたい人にぴったりです。
            </div>
          </div>
        </div>
      </div>
      <div className='mx-8 mt-48 flex items-center justify-center gap-4'>
        <div className='h-[1px] flex-1 bg-dark-300 xs:max-w-[160px]' />
        <div className='text-xl tracking-widest text-dark-500 xs:text-2xl'>
          Features
        </div>
        <div className='h-[1px] flex-1 bg-dark-300 xs:max-w-[160px]' />
      </div>
      <div className='mt-1 text-center text-[10px] tracking-wide  text-dark-400'>
        サービスの特徴
      </div>
      <div className='mx-auto mt-20'>
        <div className='flex flex-col items-center gap-20 sm:flex-row sm:flex-wrap sm:justify-center md:gap-[4vw] lg:gap-[5vw]'>
          {FEATURES.map((item) => {
            return (
              <div key={item.src}>
                <div className='relative h-64 w-64 xxs:h-[300px] xxs:w-[300px] xl:h-[340px] xl:w-[340px]'>
                  <Image src={item.src} alt='' layout='fill' />
                </div>
                <div className='mx-auto mt-6 w-56 space-y-3 text-center text-sm tracking-wide text-dark-400 xxs:w-72 sm:space-y-2 md:mt-8'>
                  <div>{item.text}</div>
                  {item.href ? (
                    <div className='h-6'>
                      <Link href={item.href}>
                        <a className='font-bold text-main-400'>{item.link}</a>
                      </Link>
                    </div>
                  ) : (
                    <div className='h-6'></div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='mx-auto mt-48 w-[280px] xxs:w-80 sm:w-[700px] md:w-[900px]'>
        <div className='flex items-center justify-center gap-4 lg:gap-7'>
          <div className='h-[1px] flex-1 bg-dark-300 sm:max-w-[96px] lg:max-w-[120px]' />
          <div className='text-xl tracking-wide text-dark-500 xxs:text-2xl'>
            こんな場面でおすすめ
          </div>
        </div>
        <div className='ml-11 mt-6 flex xxs:ml-12 xxs:mt-6 sm:ml-0 sm:mt-10 sm:justify-center sm:gap-20 md:gap-36'>
          <div className='relative hidden h-52 w-52 sm:block md:h-72 md:w-72 lg:h-80 lg:w-80'>
            <Image src='/SituationImage.svg' alt='' layout='fill' />
          </div>
          <div className='flex flex-col space-y-5 sm:justify-center lg:space-y-7'>
            <div className='space-y-2 lg:space-y-[10px]'>
              {OK_SITUATIONS.map((text) => {
                return (
                  <div
                    className='flex items-center gap-[6px] xxs:gap-2 lg:gap-3'
                    key={text}
                  >
                    <IconCircleCheck
                      color='#20c997'
                      size={largerThanXxs ? 26 : 23}
                    />
                    <div className='text-sm text-dark-500 xxs:text-base lg:text-lg'>
                      {text}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='space-y-2 lg:space-y-[10px]'>
              {NG_SITUATIONS.map((text) => {
                return (
                  <div
                    className='flex items-center gap-[6px] xxs:gap-2 lg:gap-3'
                    key={text}
                  >
                    <IconCircleX
                      color='#ff6b6b'
                      size={largerThanXxs ? 26 : 23}
                    />
                    <div className='text-sm text-dark-500 xxs:text-base lg:text-lg'>
                      {text}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
