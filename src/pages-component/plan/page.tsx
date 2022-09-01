import { Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
  const [value, setValue] = useState('')
  const [opened, handlers] = useDisclosure(false)

  const handleFetch = async () => {
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

  const handleAuth = async () => {
    if (!localStorage.hasOwnProperty('planId')) {
      const authRes = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ planId: planId, password: value }),
      })
      const authJson = await authRes.json()
      console.log(authJson)
    }
  }

  return (
    <div>
      <button onClick={handleFetch}>fetch</button>
      <button onClick={() => handlers.open()}>open</button>
      <Modal
        opened={opened}
        onClose={() => handlers.close()}
        title='Introduce yourself!'
      >
        <TextInput
          placeholder='Password'
          label='Password'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          withAsterisk
        />
        <Button onClick={handleAuth}>auth</Button>
      </Modal>
    </div>
  )
}
