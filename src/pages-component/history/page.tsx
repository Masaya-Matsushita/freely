import { UnstyledButton } from '@mantine/core'
import { IconClock } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { ContentLabel } from 'src/component/ContentLabel'
import { DateRange } from 'src/component/DateRange'
import { useMediaQuery } from 'src/lib/mantine'

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
  const largerThanXs = useMediaQuery('xs')
  const [planDataList, setPlanDataList] = useState<PlanData[]>()

  // LocalStorageからplanIdを全て取得し、データをフェッチ
  useEffect(() => {
    const fetchPlan = async () => {
      const planListStr = localStorage.getItem('planList')
      if (planListStr) {
        const planList = JSON.parse(planListStr)
        const planIdList: string[] = planList.map(
          (e: { id: string; password: string }) => e.id,
        )
        setPlanDataList(
          await Promise.all(
            planIdList.map(async (planId) => {
              const res = await fetch(`/api/plan?plan_id=${planId}`)
              const json = await res.json()
              return {
                planId: json.plan_id,
                name: json.name,
                startDate: json.start_date,
                endDate: json.end_date,
                timestamp: '2022/09/04',
              }
            }),
          ),
        )
        // let dataList: PlanData[] = []
        // for (let i = 0; i < planIdList.length; i++) {
        //   const res = await fetch(`/api/plan?plan_id=${planIdList[i]}`)
        //   const json = await res.json()
        //   dataList.push({
        //     planId: json.plan_id,
        //     name: json.name,
        //     startDate: json.start_date,
        //     endDate: json.end_date,
        //     timestamp: '2022/09/04',
        //   })
        // }
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
                    onClick={() => console.log('click')}
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
