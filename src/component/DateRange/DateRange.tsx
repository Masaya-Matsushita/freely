import { Badge } from '@mantine/core'
import { FC } from 'react'

/**
 * @package
 */
export const DateRange: FC<{ dateList: string[]; short?: true }> = (props) => {
  return (
    <div
      className={`flex items-center ${
        props.short ? 'gap-[2px]' : 'gap-2 xs:gap-3'
      }`}
    >
      <DateBadge label={props.dateList[0]} short={props.short} />
      <div className='text-center font-bold text-main-400 xs:text-xl'>~</div>
      <DateBadge label={props.dateList[1]} short={props.short} />
    </div>
  )
}

const DateBadge: FC<{ label: string; short?: true }> = (props) => {
  return (
    <Badge
      className={`bg-main-300 py-3 text-main-500 hover:cursor-pointer xxs:max-w-[180px] xxs:px-4 xxs:tracking-wide xs:px-8 xs:py-4 xs:tracking-wider ${
        props.short ? 'text-xs xxs:text-sm' : 'px-3 text-sm'
      }`}
    >
      {props.label}
    </Badge>
  )
}
