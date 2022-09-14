import { UnstyledButton } from '@mantine/core'
import { IconClock } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ContentLabel } from 'src/component/ContentLabel'
import { DateRange } from 'src/component/DateRange'
import { useMediaQuery } from 'src/lib/mantine'

type Plan = { id: string; password: string }

type PlanData = {
  planId: string
  name: string
  startDate: string
  endDate: string
  timestamp: string
}

/**
 * @package
 */
export const History = () => {
  const router = useRouter()
  const largerThanXs = useMediaQuery('xs')
  const [planDataList, setPlanDataList] = useState<PlanData[]>()

  // LocalStorageからplanIdを全て取得し、データをフェッチ
  useEffect(() => {
    const fetchPlan = async () => {
      // LocalStorageから取得したplanIdの配列を作成
      const planListStr = localStorage.getItem('planList')
      if (planListStr) {
        const planList: Plan[] = JSON.parse(planListStr)
        const planIdList = planList.map((plan) => plan.id)
        // planIdをもとにデータを並列で取得
        setPlanDataList(
          await Promise.all(
            planIdList.map(async (planId) => {
              const res = await fetch(`/api/plan?planId=${planId}`)
              const json = await res.json()
              return {
                planId: planId,
                name: json[0].plan_name,
                startDate: json[0].start_date,
                endDate: json[0].end_date,
                timestamp: '2022/09/04',
              }
            }),
          ),
        )
      }
    }
    fetchPlan()
  }, [])

  return (
    <>
      <div>
        <ContentLabel
          label='履歴'
          icon={<IconClock size={largerThanXs ? 42 : 34} color='#6466F1' />}
          short
        />
        {planDataList ? (
          <div className='mt-4'>
            {planDataList.map((plan) => {
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
        ) : null}
      </div>
    </>
  )
}
