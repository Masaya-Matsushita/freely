import { Button, Modal, PasswordInput, Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { FC, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useSetRecoilState } from 'recoil'
import { sortAndSavePlanList } from 'src/lib/func'
import { successAlert } from 'src/lib/mantine'
import { passwordState } from 'src/state/password'

type Props = {
  opened: boolean
  closeModal: () => void
  planId: string
  clear?: true
}

/**
 * @package
 */
export const PasswordModal: FC<Props> = (props) => {
  const [value, setValue] = useState('')
  const [valueError, setValueError] = useState('')
  const [popover, { open, close }] = useDisclosure(false)
  const setPassword = useSetRecoilState(passwordState)

  const catchError = useErrorHandler()

  // パスワード認証
  const handleAuth = async () => {
    try {
      // APIと通信
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ plan_id: props.planId, password: value }),
      })
      const json: boolean = await res.json()

      if (json === true) {
        // 認証成功
        sortAndSavePlanList(props.planId, value)
        setPassword(value)
        setValue('')
        props.closeModal()
        successAlert('認証成功')
      } else if (json === false) {
        // 認証失敗
        setValueError('パスワードが間違っています')
      } else {
        // 通信エラー
        throw new Error('サーバー側のエラーにより、認証が失敗しました')
      }
    } catch (error) {
      catchError(error)
    }
  }

  return (
    <Modal
      opened={props.opened}
      onClose={props.closeModal}
      title='共有パスワードを入力してください'
      overlayOpacity={props.clear ? 0.3 : 1}
      overlayBlur={props.clear ? 1.5 : 0}
      centered
      classNames={{
        title: 'text-dark-500 mt-[2px]',
        modal: 'bg-main-100 xxs:mx-2 p-6 xs:p-10',
      }}
    >
      <div className='mt-6 flex flex-col items-end'>
        <Popover
          width={200}
          position='top'
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
              共有パスワードとは
            </span>
          </Popover.Target>
          <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
            <div className='text-sm text-dark-500'>
              プラン作成者が設定したパスワードです。認証後に共同編集ができます。
            </div>
          </Popover.Dropdown>
        </Popover>
        <PasswordInput
          placeholder='入力する'
          value={value}
          error={valueError}
          onChange={(e) => setValue(e.currentTarget.value)}
          withAsterisk
          className='mt-2 min-w-full'
        />
        <Button
          onClick={handleAuth}
          className='mt-4 h-10 w-28 bg-main-500 font-bold hover:bg-main-500'
        >
          認証
        </Button>
      </div>
    </Modal>
  )
}
