import { useEffect, useState } from 'react'
import { LinkButton } from './LinkButton'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const HeroText = () => {
  const [planId, setPlanId] = useState('')

  useEffect(() => {
    const planListStr = localStorage.getItem('planList')
    if (planListStr) {
      const planList = JSON.parse(planListStr)
      setPlanId(planList[0].id)
    }
  }, [])

  return (
    // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
    <div className='absolute top-1/4 -mt-20 flex w-full flex-col items-center xs:left-1/2 xs:top-1/4 xs:-ml-[270px] xs:max-w-[546px] md:top-1/4'>
      <div className='mx-4 text-xl tracking-widest text-white xxs:text-2xl xs:text-3xl md:text-4xl'>
        旅行計画をもっと手軽に
      </div>
      <div className='mb-20 mt-10 text-5xl font-bold tracking-widest text-white xxs:mb-0 xxs:text-6xl md:mt-14 md:text-7xl'>
        Freely
      </div>
      <div className='mx-12 mt-16 mb-12 hidden text-center text-xl tracking-widest text-white xxs:block xs:mb-16 xs:max-w-[450px] xs:text-2xl md:mb-[88px] md:mt-20'>
        全ての面倒を省いた、世界一シンプル＆簡単な計画表作成サービスです
      </div>
      <div className='flex flex-col items-center gap-6'>
        <LinkButton href={getPath('CREATE')} text='プランを新規作成' />
        {planId ? (
          <LinkButton href={getPath('PLAN', planId)} text='前回のプラン' pink />
        ) : null}
      </div>
    </div>
  )
}
