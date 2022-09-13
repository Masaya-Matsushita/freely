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

    // 「現在のplanIdを先頭とする配列」をLocalStorageに保存
    const planIdList = localStorage.getItem('planIdList')
    if (!planIdList) {
      // planIdListがまだ無い場合
      localStorage.setItem('planIdList', JSON.stringify([planId]))
      return
    }
    // 「現在のplanIdを先頭とする配列」を作成し、上書き
    const prevList: string[] = JSON.parse(planIdList)
    const trimmedList = prevList.filter((item) => item !== planId)
    const newList = [planId, ...trimmedList]
    localStorage.setItem('planIdList', JSON.stringify(newList))

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
