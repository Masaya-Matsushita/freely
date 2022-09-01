import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * @package
 */
export const Plan = () => {
  // useEffect(() => {
  // ページ遷移時にplanIdをブラウザに保存する
  // sessionStorage.setItem('planId', planId)
  // }, [])

  const router = useRouter()
  const planId = router.query.plan

  const handleClick = async () => {
    const planRes = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ planId: planId }),
    })
    const planJson = await planRes.json()
    console.log('plan:', planJson)
    const spotRes = await fetch('/api/spot', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ planId: planId }),
    })
    const spotJson = await spotRes.json()
    console.log('spot:', spotJson)
  }

  return <button onClick={handleClick}>btn</button>
}
