import { CloseButton, Modal, TextInput, UnstyledButton } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { FC, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'
import { SpotMenu } from './SpotMenu'
import { ConfirmDialog } from 'src/component/ConfirmDialog'

type Props = {
  opened: boolean
  close: () => void
  planId: string
  spotId: number
  spotName: string
  memoList: { id: number; text: string; marked: 'White' | 'Red' | 'Green' }[]
}

/**
 * @package
 */
export const MemoModal: FC<Props> = (props) => {
  const [marked, setMarked] = useState(false)
  const [value, setValue] = useState('')
  const [dialog, setDialog] = useState(false)

  const handleSubmit = () => {
    console.log(value)
  }

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
          {props.memoList.length ? (
            <div className='space-y-4 xs:space-y-5'>
              {props.memoList.map((memo) => {
                return (
                  <div
                    key={memo.id}
                    className='flex items-center gap-2 xs:gap-3'
                  >
                    <div className='flex-1 rounded-md bg-white'>
                      <div
                        className={`mx-1 rounded-sm border-[0.1px] border-l-4 border-solid border-white p-2 text-sm text-dark-600 xs:text-base
                  ${
                    memo.marked === 'Red'
                      ? 'border-l-red-500'
                      : memo.marked === 'Green'
                      ? 'border-l-green-400'
                      : null
                  }`}
                      >
                        {memo.text}
                      </div>
                    </div>
                    <UnstyledButton
                      onClick={() => setDialog(true)}
                      className='rounded-md p-[2px] hover:bg-slate-300'
                    >
                      <IconTrash color='#fff' size={30} />
                    </UnstyledButton>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='mt-36 text-center text-dark-300'>
              メモはありません
            </div>
          )}
        </div>
        <div className='mx-2 flex items-center gap-2 pt-3 pb-4 xxs:mx-4 xs:mx-6 xs:gap-4'>
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
            size={'sm'}
            classNames={{ input: 'rounded-2xl bg-slate-100' }}
            className='flex-1'
          />
          <UnstyledButton
            onClick={handleSubmit}
            className='mt-1 rounded-md py-1 px-2 hover:bg-slate-100'
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
