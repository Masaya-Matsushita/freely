import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { sortAndSavePlanList } from 'src/lib/func'
import { passwordState } from 'src/state/password'
import { planIdState } from 'src/state/planId'
import { prefIdState } from 'src/state/prefId'

/**
 * @package
 */
export const InitState = () => {
  const { query } = useRouter()
  const planId = query.planId ? query.planId : query.plan_id
  const setPlanId = useSetRecoilState(planIdState)
  const setPrefId = useSetRecoilState(prefIdState)
  const setPassword = useSetRecoilState(passwordState)

  // planId, prefId, password それぞれを GlobalState と LocalStorage へ設定
  useEffect(() => {
    if (typeof planId !== 'string') return
    // planIdをセット
    setPlanId(planId)

    // TODO: エラー確認しながら二重条件式のリファクタリング
    const planListStr = localStorage.getItem('planList')
    if (!planListStr) {
      // planListがまだ無いとき
      sortAndSavePlanList(planId, '')
    } else {
      const planList: { id: string; password: string }[] =
        JSON.parse(planListStr)
      const index = planList.findIndex((plan) => plan.id === planId)
      if (index === -1) {
        // 現在のplanがplanListに無いとき
        sortAndSavePlanList(planId, '')
      } else {
        // 現在のplanがplanListにあるとき
        const currentPlanPassword = planList[index].password
        sortAndSavePlanList(planId, currentPlanPassword)
        setPassword(currentPlanPassword)
      }
    }

    const localPrefId = localStorage.getItem('prefId')
    if (localPrefId) {
      // prefIdをセット
      setPrefId(localPrefId)
    } else {
      // 初期値13(東京)をprefIdにセット
      localStorage.setItem('prefId', '13')
      setPrefId('13')
    }
  }, [planId, setPlanId, setPrefId, setPassword])

  return null
}
