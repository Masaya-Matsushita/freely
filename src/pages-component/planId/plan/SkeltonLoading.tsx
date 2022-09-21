import { Skeleton } from '@mantine/core'
import { FC } from 'react'

/**
 * @package
 */
export const SkeletonLoading = () => {
  return (
    <div className='flex-1 pt-2'>
      <SkeletonDisplay className='ml-5 h-9 w-64 rounded-3xl xxs:w-80 xs:h-12 xs:w-[420px] sm:ml-11' />
      <SkeletonDisplay className='mt-[14px] ml-6 h-7 w-56 rounded-3xl xxs:w-72 xs:ml-8 xs:mt-4 xs:h-9 xs:w-[350px] sm:ml-14 sm:mt-5' />
      <SkeletonDisplay className='mt-[34px] ml-4 h-8 w-40 rounded-3xl xxs:mt-10 xs:mt-11 xs:h-9 xs:w-48 sm:ml-11 sm:mt-[52px]' />
      <SkeletonDisplay className='mx-3 mt-1 h-[3px] xs:mx-5 xs:mt-[6px] sm:mx-9' />
      <div className='mx-4 mt-6 flex flex-wrap gap-x-3 gap-y-4 xs:mx-6 xs:mt-8 xs:gap-x-4 xs:gap-y-6 sm:ml-12 md:mt-10 md:ml-16 md:mr-8 md:gap-x-6 md:gap-y-8'>
        <SkeltonSpotCard />
        <SkeltonSpotCard />
        <SkeltonSpotCard />
        <SkeltonSpotCard />
        <SkeltonSpotCard />
        <SkeltonSpotCard />
        <SkeltonSpotCard />
        <SkeltonSpotCard />
      </div>
    </div>
  )
}

const SkeletonDisplay: FC<{ className: string }> = (props) => {
  return (
    <Skeleton
      className={props.className}
      sx={{
        '&, &:before': {
          backgroundColor: '#fff',
        },
        '&, &:after': {
          backgroundColor: '#e4e7ec',
        },
      }}
    />
  )
}

const SkeltonSpotCard = () => {
  return (
    <Skeleton
      className='h-[calc(55vw+25px)] w-full rounded-xl xxs:h-[calc(28vw+30px)] xxs:w-[calc(50vw-22px)] xs:h-[calc(28vw+35px)] xs:w-[calc(50vw-32px)] sm:h-[calc(28vw-50px)] sm:w-[calc(50vw-186px)] md:h-[217px] md:w-[292px]'
      sx={{
        '&, &:before': {
          backgroundColor: '#fff',
        },
        '&, &:after': {
          backgroundColor: '#e4e7ec',
        },
      }}
    />
  )
}
