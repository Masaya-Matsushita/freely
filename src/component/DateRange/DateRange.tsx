import { Badge } from '@mantine/core'
import { FC } from 'react'
import { getDayOfWeek } from 'src/lib/func'

/**
 * @package
 */
export const DateRange: FC<{ dateList: string[]; short?: true }> = (props) => {
  return (
    <div
      className={`flex items-center gap-[1px] ${
        props.short ? '' : 'xxs:gap-1 xs:gap-3'
      }`}
    >
      <DateBadge label={props.dateList[0]} short={props.short} />
      <div className='text-center font-bold text-main-400 xs:text-xl'>~</div>
      <DateBadge label={props.dateList[1]} short={props.short} />
    </div>
  )
}

const DateBadge: FC<{ label: string; short?: true }> = (props) => {
  const date = props.label.split('/').map((item) => Number(item))
  return (
    <Badge
      className={`bg-main-300 py-3 px-2 text-xs text-main-500 hover:cursor-pointer xxs:max-w-[220px] xxs:px-4 xxs:tracking-wide xs:px-8 xs:py-4 xs:tracking-wider ${
        props.short ? 'xs:text-sm' : 'xxs:text-sm'
      }`}
    >
      {props.label + ' (' + getDayOfWeek(date[0], date[1], date[2]) + ')'}
    </Badge>
  )
}
