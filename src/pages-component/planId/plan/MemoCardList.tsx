import { Skeleton, UnstyledButton } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { FC } from 'react'

type Memo = {
  spot_id: number
  memo_id: number
  text: string
  marked: 'White' | 'Red' | 'Green'
}

type Props = {
  spotId: number
  open: (memoId: number) => void
  memoList: Memo[]
}

/**
 * @package
 */
export const MemoCardList: FC<Props> = (props) => {
  // 取得中
  if (!props.memoList) {
    return (
      <div className='space-y-4 opacity-80 xs:space-y-5'>
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
      </div>
    )
  }

  // メモが空のとき
  if (!props.memoList.length) {
    return (
      <div className='mt-36 text-center text-dark-300'>メモはありません</div>
    )
  }

  return (
    <div className='space-y-4 xs:space-y-5'>
      {props.memoList.map((memo) => {
        return (
          <div key={memo.memo_id} className='flex items-center gap-2 xs:gap-3'>
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
              onClick={() => props.open(memo.memo_id)}
              className='rounded-md p-[2px] hover:bg-slate-300'
            >
              <IconTrash color='#fff' size={30} />
            </UnstyledButton>
          </div>
        )
      })}
    </div>
  )
}

const SkeltonCard = () => {
  return (
    <div className='flex w-full gap-3'>
      <Skeleton
        className='h-[38px] flex-1 rounded-lg xs:h-[42px]'
        sx={{
          '&, &:before': {
            backgroundColor: '#c1c8d9',
          },
          '&, &:after': {
            backgroundColor: '#e1e5f0',
          },
        }}
      />
      <Skeleton
        className='h-[38px] w-[38px] rounded-md xs:h-[42px] xs:w-[42px]'
        sx={{
          '&, &:before': {
            backgroundColor: '#c1c8d9',
          },
          '&, &:after': {
            backgroundColor: '#e1e5f0',
          },
        }}
      />
    </div>
  )
}
