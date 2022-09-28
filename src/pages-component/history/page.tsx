import { IconClock } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { PlanCard } from './PlanCard'
import { ContentLabel } from 'src/component/ContentLabel'
import { useMediaQuery } from 'src/lib/mantine'

type Plan = { id: string; password: string }

/**
 * @package
 */
export type PlanData = {
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
  const catchError = useErrorHandler()
  const largerThanXs = useMediaQuery('xs')
  const [loading, setLoading] = useState(false)
  const [planDataList, setPlanDataList] = useState<(PlanData | null)[]>()

  // LocalStorageからplanIdを全て取得し、データをフェッチ
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        // LocalStorageから取得したplanIdの配列を作成
        const planListStr = localStorage.getItem('planList')
        if (planListStr) {
          setLoading(true)
          const planList: Plan[] = JSON.parse(planListStr)
          const planIdList = planList.map((plan) => plan.id)
          // planIdをもとにデータを並列で取得
          setPlanDataList(
            await Promise.all(
              planIdList.map(async (planId) => {
                const res = await fetch(`/api/plan/read?planId=${planId}`)
                // データが見つからない(=planIdが間違っている)場合、null
                if (!res.ok) return null
                const json = await res.json()
                // TODO: timestampの設定
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
          setLoading(false)
        } else {
          setPlanDataList([])
        }
      } catch (error) {
        catchError(error)
      }
    }
    fetchPlan()
  }, [catchError])

  return (
    <>
      <div>
        <ContentLabel
          label='履歴'
          icon={<IconClock size={largerThanXs ? 42 : 34} color='#6466F1' />}
          short
        />
        <PlanCard planDataList={planDataList} loading={loading} />
      </div>
    </>
  )
}
