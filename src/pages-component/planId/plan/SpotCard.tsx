import { UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import { FC } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MemoModal } from './MemoModal'
import { Spot } from 'src/type/Spot'

type Props = { spot: Spot; planId: string }

const memoList: {
  id: number
  text: string
  marked: 'White' | 'Red' | 'Green'
}[] = [
  {
    id: 1,
    text: '入場料3,100円',
    marked: 'White',
  },
  {
    id: 2,
    text: 'お土産購入忘れずに',
    marked: 'Red',
  },
  {
    id: 3,
    text: '初日が悪天候みたいなので、2日目の午後へ予定変更',
    marked: 'White',
  },
  {
    id: 4,
    text: 'この場所は訪れました！',
    marked: 'Green',
  },
]

/**
 * @package
 */
export const SpotCard: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <UnstyledButton
        onClick={open}
        className='rounded-xl shadow shadow-dark-200 xxs:w-[calc(50vw-22px)] xs:w-[calc(50vw-32px)] sm:w-[calc(50vw-186px)] md:w-[292px]'
      >
        {props.spot.image ? (
          <Image
            src={props.spot.image}
            height='900px'
            width='1600px'
            alt=''
            className='rounded-t-lg'
          />
        ) : (
          <Image
            src={`/${props.spot.icon}Image.svg`}
            height='900px'
            width='1600px'
            alt=''
            className='rounded-t-lg'
          />
        )}
        <div className='flex h-10 items-center gap-2 xs:h-12 xs:gap-4'>
          {props.spot.priority ? (
            <AiFillStar
              color='#f0dc00'
              size={26}
              className='ml-3 shrink-0 xs:ml-5'
            />
          ) : (
            <AiOutlineStar
              color='#AFAFAF'
              size={26}
              className='ml-3 shrink-0 xs:ml-5'
            />
          )}
          <div className='mr-2 max-h-[40px] overflow-hidden text-ellipsis text-sm font-bold text-dark-500'>
            {props.spot.spot_name}
          </div>
        </div>
      </UnstyledButton>
      <MemoModal
        opened={opened}
        close={close}
        planId={props.planId}
        spotId={1}
        spotName='東京スカイツリー'
        memoList={memoList}
      />
    </div>
  )
}
