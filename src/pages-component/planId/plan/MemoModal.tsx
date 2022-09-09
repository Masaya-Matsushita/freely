import { CloseButton, Modal, TextInput, UnstyledButton } from '@mantine/core'
import { FC, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'
import { MemoCardList } from './MemoCardList'
import { SpotMenu } from './SpotMenu'
import { ConfirmDialog } from 'src/component/ConfirmDialog'

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
  const [marked, setMarked] = useState(false)
  const [value, setValue] = useState('')
  const [dialog, setDialog] = useState(false)

  // メモ追加
  const handleSubmit = () => {
    // 100字以上の場合、中断
    if (value.length > 100) return
    console.log(value)
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
          <SpotMenu planId={props.planId} spotId={props.spotId} />
        </div>
        <div className='h-[360px] overflow-auto border-[1px] border-solid border-main-200 border-y-dark-100 bg-main-200 py-6 pl-4 pr-3 xs:h-[400px] xs:px-6'>
          <MemoCardList spotId={props.spotId} open={() => setDialog(true)} />
        </div>
        <div className='mx-2 my-3 flex items-start gap-2 xxs:mx-4 xs:mx-6 xs:gap-4'>
          <UnstyledButton
            onClick={() => setMarked((prev) => !prev)}
            className='mt-1 rounded-md py-1 px-2 hover:bg-slate-100'
          >
            <FaPen color={marked ? '#ff2626' : '#999999'} size={22} />
          </UnstyledButton>
          <TextInput
            placeholder='時間、料金、持ち物など'
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            error={value.length > 100 ? '100字以内でご入力ください' : null}
            size={'sm'}
            classNames={{ input: 'rounded-2xl bg-slate-100' }}
            className='flex-1'
          />
          <UnstyledButton
            onClick={handleSubmit}
            className='mt-[1px] rounded-md py-1 px-2 hover:bg-slate-100'
          >
            <AiOutlineSend color='#495057' size={28} />
          </UnstyledButton>
        </div>
      </Modal>
      <ConfirmDialog
        name='メモ'
        opened={dialog}
        close={() => setDialog(false)}
        handleDelete={handleDelete}
      />
    </div>
  )
}
