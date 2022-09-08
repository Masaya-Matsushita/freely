import {
  CloseButton,
  Menu,
  Modal,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { NextLink } from '@mantine/next'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons'
import { FC } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'

type Props = {
  opened: boolean
  close: () => void
  planId: string
  spotId: number
  memoList: { id: number; text: string; marked: 'White' | 'Red' | 'Green' }[]
}

/**
 * @package
 */
export const MemoModal: FC<Props> = (props) => {
  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      withCloseButton={false}
      centered
      size='lg'
      classNames={{
        modal: 'p-0 pt-4 relative rounded-lg xs:mx-8 mx-4 max-w-[480px]',
      }}
    >
      <CloseButton
        title='閉じる'
        size='md'
        iconSize={32}
        onClick={props.close}
        className='absolute -top-8 right-3'
      />
      <div className='mx-4 mb-3 flex justify-between'>
        <div className='ml-2 text-xl text-dark-500'>東京スカイツリー</div>
        <Menu shadow='md' width={200} position='bottom-end' offset={3}>
          <Menu.Target>
            <UnstyledButton className='rounded-md'>
              <IconDots color='#999999' size={28} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconPencil color='#495057' size={20} />}
              component={NextLink}
              href={{
                pathname: `/${props.planId}/spot`,
                query: { spot_id: String(props.spotId) },
              }}
              className='text-dark-500'
            >
              編集
            </Menu.Item>
            <Menu.Item color='red' icon={<IconTrash size={20} />}>
              削除
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className='h-[360px] space-y-4 overflow-auto border-[1px] border-solid border-main-200 border-y-dark-100 bg-main-200 py-6 px-4'>
        {props.memoList.map((memo) => {
          return (
            <div key={memo.id} className='flex items-center gap-2'>
              <div className='flex-1 rounded-md bg-white'>
                <div
                  className={`mx-1 rounded-sm border-[0.1px] border-l-4 border-solid border-white p-2 text-sm text-dark-600
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
              <UnstyledButton className='rounded-md'>
                <IconTrash color='#fff' size={30} />
              </UnstyledButton>
            </div>
          )
        })}
      </div>
      <div className='mx-4 flex items-center gap-3 py-3'>
        <UnstyledButton className='mt-1 rounded-md'>
          <FaPen color={'#ff2626'} size={22} />
        </UnstyledButton>
        <TextInput
          placeholder='時間、料金、持ち物など'
          size={'sm'}
          classNames={{ input: 'rounded-2xl bg-slate-100' }}
          className='flex-1'
        />
        <UnstyledButton className='mt-1 rounded-md'>
          <AiOutlineSend color='#495057' size={26} />
        </UnstyledButton>
      </div>
    </Modal>
  )
}
