import { Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

/**
 * @package
 */
export const Plan = () => {
  const router = useRouter()
  const planId = router.query.plan
  const [password, setPassword] = useState('')
  const [opened, handlers] = useDisclosure(false)
  const { data: planData, error: planError } = useSWR(
    `/api/plan?planId=${planId}`,
  )
  const { data: spotData, error: spotError } = useSWR(
    `/api/spot?planId=${planId}`,
  )
  console.log('plan:', planData)
  console.error('plan', planError)
  console.log('spot:', spotData)
  console.error('spot', spotError)

  const handleAuth = async () => {
    if (!localStorage.hasOwnProperty('planId')) {
      const authRes = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ planId: planId, password: password }),
      })
      const authJson = await authRes.json()
      console.log(authJson)
    }
  }

  // TODO: planページで動的パスを実現できる
  // useEffect(() => {
  // ページ遷移時にplanIdをブラウザに保存する
  // sessionStorage.setItem('planId', planId)
  // }, [])

  return (
    <div>
      <button onClick={() => handlers.open()}>open</button>
      <Modal
        opened={opened}
        onClose={() => handlers.close()}
        title='Introduce yourself!'
      >
        <TextInput
          placeholder='Password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          withAsterisk
        />
        <Button onClick={handleAuth}>auth</Button>
      </Modal>
    </div>
  )
}
