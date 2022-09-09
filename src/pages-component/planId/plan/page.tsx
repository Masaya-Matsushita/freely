import { UnstyledButton } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import useSWR from 'swr'
import { SkeletonLoading } from './SkeltonLoading'
import { SpotCard } from './SpotCard'
import { DateRange } from 'src/component/DateRange'
import { getPath } from 'src/lib/const'
import { planIdState } from 'src/state/planId'
import { Spot } from 'src/type/Spot'

/**
 * @package
 */
export const Plan = () => {
  const planId = useRecoilValue(planIdState)
  const { data: planData, error: planError } = useSWR(
    `/api/plan?planId=${planId}`,
  )
  const { data: spotData, error: spotError } = useSWR(
    `/api/spotList?planId=${planId}`,
  )

  if (planError || spotError) {
    console.log('planError:', planError)
    console.log('spotError:', spotError)
  }

  return (
    <>
      {planId && planData && spotData ? (
        <div>
          <Link href={getPath('EDIT', planId)} passHref>
            <UnstyledButton
              component='a'
              className='mx-3 block rounded-md p-2 text-3xl font-bold text-dark-500 xs:mx-5 xs:text-4xl sm:mx-9'
            >
              {planData.plan_name}
            </UnstyledButton>
          </Link>
          <Link href={getPath('EDIT', planId)} passHref>
            <a className='mx-6 mt-2 block no-underline xs:mx-8 xs:mt-4 sm:mx-14'>
              <DateRange dateList={[planData.start_date, planData.end_date]} />
            </a>
          </Link>
          {/* 世界地図背景
          <div className='absolute right-2 ml-16 hidden max-w-xs xxs:top-[106px] xxs:block xs:top-24 xs:max-w-md sm:right-12 md:max-w-xl lg:max-w-3xl'>
            <Image
              src='/WorldMap.png'
              width={largerThanSm ? '800px' : '500px'}
              height={largerThanSm ? '400px' : '300px'}
              alt=''
              className='opacity-10'
            />
          </div> */}
          <div className='ml-4 mt-10 text-2xl font-bold text-dark-500 xs:mt-12 xs:ml-6 xs:text-3xl sm:mt-14 sm:ml-11'>
            スポット一覧
          </div>
          <hr className='mx-3 mt-1 h-[3px] border-0 bg-main-200 xs:mx-5 sm:mx-8' />
          <div className='mx-4 mt-6 flex flex-wrap gap-x-3 gap-y-4 xs:mx-6 xs:mt-8 xs:gap-x-4 xs:gap-y-6 sm:ml-12 md:mt-10 md:ml-16 md:mr-8 md:gap-x-6 md:gap-y-8'>
            {spotData.map((spot: Spot) => (
              <SpotCard key={spot.spot_id} spot={spot} planId={planId} />
            ))}
            {/* 追加ボタン候補
            <div className='my-4 flex w-full items-center justify-center xxs:my-0 xxs:w-[calc(50vw-22px)] xs:w-[calc(50vw-32px)] sm:min-h-[155px] sm:w-[calc(50vw-186px)] md:min-h-[200px] md:w-[292px]'>
              <Button className='h-14 w-60 rounded-lg bg-white shadow-md shadow-dark-200 xxs:h-[18vw] xxs:w-[18vw] xs:rounded-2xl sm:h-[13vw] sm:w-[13vw] md:h-28 md:w-28'>
                <IconPlus size={44} color='#495057' />
              </Button>
            </div> */}
            <Link href={getPath('SPOT', planId)} passHref>
              <UnstyledButton
                component='a'
                className='flex h-[calc(55vw+25px)] w-full items-center justify-center rounded-xl bg-slate-100 shadow shadow-dark-200 xxs:h-[calc(28vw+30px)] xxs:w-[calc(50vw-22px)] xs:h-[calc(28vw+35px)] xs:w-[calc(50vw-32px)] sm:h-[calc(28vw-50px)] sm:w-[calc(50vw-186px)] md:h-[217px] md:w-[292px]'
              >
                <IconPlus size={36} color='#495057' />
              </UnstyledButton>
            </Link>
          </div>
        </div>
      ) : (
        <SkeletonLoading />
      )}
    </>
  )
}
