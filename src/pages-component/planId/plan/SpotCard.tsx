import { UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import { FC } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MemoModal } from './MemoModal'
import { Spot } from 'src/type/Spot'

/**
 * @package
 */
export const SpotCard: FC<{ spot: Spot }> = (props) => {
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
        planId={props.spot.plan_id}
        spotId={props.spot.spot_id}
        spotName={props.spot.spot_name}
      />
    </div>
  )
}
