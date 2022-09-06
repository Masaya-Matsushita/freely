import { Button, Modal, PasswordInput, Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { FC, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'

type Props = {
  opened: boolean
  closeModal: () => void
  planId: string
}

/**
 * @package
 */
export const PasswordModal: FC<Props> = (props) => {
  const handleError = useErrorHandler()
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [popover, { open, close }] = useDisclosure(false)

  // localStorageにpasswordを保存
  const savePassword = (planId: string) => {
    const pwListJson = localStorage.getItem('pwList')
    if (pwListJson) {
      // 既に別のプランを編集したことがある場合
      const pwList = JSON.parse(pwListJson)
      pwList[planId] = password
      localStorage.setItem('pwList', JSON.stringify(pwList))
    } else {
      // 初めてプランを編集する場合
      localStorage.setItem('pwList', JSON.stringify({ planId: password }))
    }
  }

  // パスワード認証
  const handleAuth = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ planId: props.planId, password: password }),
      })
      const json = await res.json()
      if (json) {
        savePassword(props.planId)
        props.closeModal()
      } else {
        setPasswordError('パスワードが間違っています。')
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <Modal
      opened={props.opened}
      onClose={props.closeModal}
      title='共有パスワードを入力してください'
      padding='xl'
      classNames={{ title: 'text-dark-500', modal: 'bg-main-100 xxs:mx-2' }}
      className='mt-32'
    >
      <div className='mt-8 flex flex-col items-end px-2 xs:px-4'>
        <Popover
          width={200}
          position='bottom'
          withArrow
          shadow='md'
          opened={popover}
        >
          <Popover.Target>
            <span
              onMouseEnter={open}
              onMouseLeave={close}
              className='text-sm font-bold text-main-400 underline'
            >
              ？ 共有パスワードとは
            </span>
          </Popover.Target>
          <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
            <div className='text-sm text-dark-500'>
              プラン作成者が設定したパスワードです。認証後に共同編集ができます。
            </div>
          </Popover.Dropdown>
        </Popover>
        <PasswordInput
          placeholder='Password'
          label='共有パスワード'
          value={password}
          error={passwordError}
          onChange={(e) => setPassword(e.currentTarget.value)}
          withAsterisk
          className='mt-2 min-w-full xs:px-4'
        />
        <Button
          onClick={handleAuth}
          className='mt-4 h-10 w-28 bg-main-500 font-bold hover:bg-main-500 xs:mr-4'
        >
          認証
        </Button>
      </div>
    </Modal>
  )
}
