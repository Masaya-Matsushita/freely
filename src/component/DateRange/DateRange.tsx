import { Badge } from '@mantine/core'
import { FC } from 'react'

/**
 * @package
 */
export const DateRange: FC<{ dateList: string[] }> = (props) => {
  return (
    <div className='flex w-36 flex-col xxs:w-full xxs:flex-row xxs:items-center'>
      <DateBadge label={props.dateList[0]} />
      <div className='text-center font-bold text-main-400 xxs:mx-2'>~</div>
      <DateBadge label={props.dateList[1]} />
    </div>
  )
}

const DateBadge: FC<{ label: string }> = (props) => {
  return (
    <Badge className='bg-main-300 py-3 px-4 text-sm text-main-500 hover:cursor-pointer xxs:max-w-[180px] xs:px-6 sm:py-4'>
      {props.label}
    </Badge>
  )
}
