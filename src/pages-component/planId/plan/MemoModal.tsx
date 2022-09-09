import {
  CloseButton,
  Loader,
  Modal,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { FC, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { AiOutlineSend } from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'
import useSWR, { useSWRConfig } from 'swr'
import { MemoCardList } from './MemoCardList'
import { SpotMenu } from './SpotMenu'
import { ConfirmDialog } from 'src/component/ConfirmDialog'
import { PasswordModal } from 'src/component/PasswordModal'

type Props = {
  opened: boolean
  close: () => void
  planId: string
  spotId: number
  spotName: string
}

/**
 * @package
 */
export const MemoModal: FC<Props> = (props) => {
  const [memo, setMemo] = useState('')
  const [marked, setMarked] = useState<'White' | 'Red' | 'Green'>('White')
  const [loading, setLoading] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const catchError = useErrorHandler()
  const { mutate } = useSWRConfig()
  const strSpotId = String(props.spotId)
  const memoListUrl = `/api/memoList?plan_id=${props.planId}&spot_id=${strSpotId}`

  // メモ取得
  // TODO: 全スポットごとに個別でAPIを叩くのはリクエストが多すぎる？
  // NOTE: メモを一括で取得 & クライアント側で取得データをスポットごとに加工　とすべき？
  const { data, error } = useSWR(memoListUrl)

  // 取得時のエラー
  if (error) {
    console.log('memoError', error)
  }

  // メモ追加
  const handleSubmit = async () => {
    try {
      // 100字以上の場合、中断
      if (memo.length > 100) return

      setLoading(true)
      // パスワードを取得
      const password = localStorage.getItem('password')
      // API通信
      const res = await fetch('/api/createMemo', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          password: password,
          plan_id: props.planId,
          spot_id: strSpotId,
          text: memo,
          marked: marked,
        }),
      })
      const json: boolean = await res.json()
      if (json === true) {
        await mutate(memoListUrl)
        setMemo('')
        setMarked('White')
        setLoading(false)
      } else if (json === false) {
        // パスワード認証に失敗
        setPasswordModal(true)
        setLoading(false)
      } else {
        // 通信エラー
        throw new Error('サーバー側のエラーにより、メモの追加に失敗しました')
      }
    } catch (error) {
      catchError(error)
    }
  }

  // メモ削除
  const handleDelete = () => {
    console.log('メモ削除')
  }

  return (
    <div>
      <Modal
        opened={props.opened}
        onClose={props.close}
        withCloseButton={false}
        centered
        size='lg'
        classNames={{
          modal: 'p-0 pt-4 relative rounded-lg xs:mx-8 xxs:mx-4 max-w-[450px]',
        }}
      >
        <CloseButton
          title='閉じる'
          size='md'
          iconSize={32}
          onClick={props.close}
          className='absolute -top-8 right-3 hover:bg-dark-500'
        />
        <div className='mx-2 mb-3 flex items-center justify-between gap-1 xxs:mx-4'>
          <div className='ml-2 text-xl text-dark-500'>
            {props.spotName.length < 10
              ? props.spotName
              : props.spotName.slice(0, 10) + '...'}
          </div>
          <SpotMenu planId={props.planId} spotId={strSpotId} />
        </div>
        <div className='h-[360px] overflow-auto border-[1px] border-solid border-main-200 border-y-dark-100 bg-main-200 py-6 pl-4 pr-3 xs:h-[400px] xs:px-6'>
          <MemoCardList
            spotId={props.spotId}
            open={() => setDialog(true)}
            memoList={data}
          />
        </div>
        <div className='mx-2 my-3 flex items-start gap-2 xxs:mx-4 xs:mx-6 xs:gap-4'>
          <UnstyledButton
            onClick={() =>
              setMarked((prev) => (prev === 'White' ? 'Red' : 'White'))
            }
            className='mt-1 rounded-md py-1 px-2 hover:bg-slate-100'
          >
            <FaPen color={marked === 'Red' ? '#ff2626' : '#999999'} size={22} />
          </UnstyledButton>
          <TextInput
            placeholder='時間、料金、持ち物など'
            value={memo}
            onChange={(e) => setMemo(e.currentTarget.value)}
            error={memo.length > 100 ? '100字以内でご入力ください' : null}
            disabled={loading}
            size={'sm'}
            classNames={{ input: 'rounded-2xl bg-slate-100' }}
            className='flex-1'
          />
          {!loading ? (
            <UnstyledButton
              onClick={handleSubmit}
              className='mt-[1px] rounded-md py-1 px-2 hover:bg-slate-100'
            >
              <AiOutlineSend color='#495057' size={28} />
            </UnstyledButton>
          ) : (
            <Loader size={26} className='mx-[9px] mt-[6px] mb-2' />
          )}
        </div>
      </Modal>
      <ConfirmDialog
        name='メモ'
        opened={dialog}
        close={() => setDialog(false)}
        handleDelete={handleDelete}
      />
      <PasswordModal
        opened={passwordModal}
        closeModal={() => setPasswordModal(false)}
        planId={props.planId}
        clear
      />
    </div>
  )
}
