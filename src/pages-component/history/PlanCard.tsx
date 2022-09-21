import { Skeleton, UnstyledButton } from '@mantine/core'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { PlanData } from './page'
import { DateRange } from 'src/component/DateRange'

export const PlanCard: FC<{ planDataList?: PlanData[]; loading: boolean }> = (
  props,
) => {
  const router = useRouter()

  // ローディング中
  if (props.loading) {
    return (
      <div className='mt-4'>
        <SkeletonPlanCard />
        <SkeletonPlanCard />
        <SkeletonPlanCard />
      </div>
    )
  }

  // useEffect前に描画しない
  if (!props.planDataList) {
    return null
  }

  // データが空のとき
  if (!props.planDataList.length) {
    return (
      <div className='mt-12 text-center text-dark-500'>
        プラン履歴はありません
      </div>
    )
  }

  return (
    <div className='mt-4'>
      {props.planDataList.map((plan: any) => {
        return (
          <div key={plan.planId} className='flex justify-center'>
            <UnstyledButton
              onClick={() => router.push(`/${plan.planId}/plan`)}
              className='mx-6 mt-6 max-w-xl flex-1 rounded-lg bg-white p-6 pt-4 pb-8 shadow-sm shadow-dark-100 xs:mx-10 xs:mt-8 xs:px-8'
            >
              <div className='text-right text-sm tracking-wide text-dark-400 xs:text-base'>
                作成日：{plan.timestamp}
              </div>
              <div className='mt-4 mb-5 text-2xl font-bold text-dark-500 xs:text-3xl'>
                {plan.name}
              </div>
              <DateRange dateList={[plan.startDate, plan.endDate]} />
            </UnstyledButton>
          </div>
        )
      })}
    </div>
  )
}

const SkeletonPlanCard = () => {
  return (
    <div className='flex justify-center'>
      <div className='mx-6 mt-6 max-w-xl flex-1 rounded-lg bg-white p-6 pt-4 pb-8 shadow-sm shadow-dark-100 xs:mx-10 xs:mt-8 xs:px-8'>
        <Skeleton
          className='ml-auto mr-0 h-5 w-40 rounded-3xl xs:h-7 xs:w-56'
          sx={{
            '&, &:before': {
              backgroundColor: '#fff',
            },
            '&, &:after': {
              backgroundColor: '#ecedef',
            },
          }}
        />
        <Skeleton
          className='mt-4 h-8 w-52 rounded-3xl xs:h-10 xs:w-72'
          sx={{
            '&, &:before': {
              backgroundColor: '#fff',
            },
            '&, &:after': {
              backgroundColor: '#ecedef',
            },
          }}
        />
        <Skeleton
          className='mt-4 h-6 w-56 rounded-3xl xxs:w-60 xs:h-8 xs:w-[350px]'
          sx={{
            '&, &:before': {
              backgroundColor: '#fff',
            },
            '&, &:after': {
              backgroundColor: '#ecedef',
            },
          }}
        />
      </div>
    </div>
  )
}
