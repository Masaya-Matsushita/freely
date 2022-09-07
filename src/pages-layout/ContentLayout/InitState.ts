import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { planIdState } from 'src/state/planId'
import { prefIdState } from 'src/state/prefId'

/**
 * @package
 */
export const InitState = () => {
  const setPlanId = useSetRecoilState(planIdState)
  const setPrefId = useSetRecoilState(prefIdState)

  useEffect(() => {
    // planIdにLocalStorageの値を代入
    const localPlanId = localStorage.getItem('planId')
    if (localPlanId) {
      setPlanId(localPlanId)
    }

    // prefIdにLocalStorageの値を代入
    const localPrefId = localStorage.getItem('prefId')
    if (localPrefId) {
      setPrefId(localPrefId)
    }
  }, [setPlanId, setPrefId])

  return null
}
