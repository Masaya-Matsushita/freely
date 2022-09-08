import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { planIdState } from 'src/state/planId'
import { prefIdState } from 'src/state/prefId'

/**
 * @package
 */
export const InitState = () => {
  const router = useRouter()
  const planId = router.query.planId
  const setPlanId = useSetRecoilState(planIdState)
  const setPrefId = useSetRecoilState(prefIdState)

  useEffect(() => {
    if (typeof planId !== 'string') return
    // planIdをセット
    setPlanId(planId)
    // 現在のplanIdをローカルストレージに保存
    const localPlanId = localStorage.getItem('planId')
    if (!localPlanId || localPlanId !== planId) {
      localStorage.setItem('planId', planId)
    }

    const localPrefId = localStorage.getItem('prefId')
    if (localPrefId) {
      // prefIdをセット
      setPrefId(localPrefId)
    } else {
      // 初期値13(東京)をローカルストレージに保存
      localStorage.setItem('prefId', '13')
      setPrefId('13')
    }
  }, [planId, setPlanId, setPrefId])

  return null
}
