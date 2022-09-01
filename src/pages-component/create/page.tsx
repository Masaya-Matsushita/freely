import { Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const Create = () => {
  const router = useRouter()
  const planId = router.query.plan
  const [password, setPassword] = useState('')
  const [opened, handlers] = useDisclosure(false)

  const handleSubmit = () => {
    if (!localStorage.hasOwnProperty('password')) {
      handlers.open()
    }
    console.log('編集しました。')
  }

  const handleAuth = async () => {
    const authRes = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ planId: planId, password: password }),
    })
    const authJson = await authRes.json()
    if (authJson) {
      localStorage.setItem('password', password)
      handleSubmit()
    } else {
      console.log('パスワードが違います。')
    }
  }

  return (
    <div>
      <div className='mt-20'>
        <SimpleButton
          text='作成する'
          onClick={() => {
            router.push({
              pathname: getPath('PLAN'),
              query: { plan: 'sample_id1' },
            })
          }}
        />
      </div>
      <Button onClick={handleSubmit}>submit</Button>
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
