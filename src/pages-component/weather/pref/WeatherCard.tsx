import { FC } from 'react'
import { getWeatherComment, getWeatherIcon } from 'src/lib/const'
import { getDayOfWeek } from 'src/lib/func'
import { Weekly } from 'src/type/WeatherData'

/**
 * @package
 */
export const WeatherCard: FC<{ day: Weekly; label: string }> = (props) => {
  const dayOfWeek = getDayOfWeek(props.day.year, props.day.month, props.day.day)
  return (
    <div className='my-4 flex min-w-[240px] flex-col items-center rounded-md bg-white px-8 py-6 shadow-md'>
      <div className='flex items-center gap-1 text-lg text-dark-500'>
        <div className='font-bold'>{props.label}</div>
        <div className='text-xl'>
          {props.day.month}/{props.day.day}
        </div>
        <div
          className={`${
            dayOfWeek === '土'
              ? 'text-blue-500'
              : dayOfWeek === '日'
              ? 'text-red-500'
              : null
          }`}
        >
          ({dayOfWeek})
        </div>
      </div>
      <div className='flex h-28 items-center'>
        <div>{getWeatherIcon(props.day.code)}</div>
      </div>
      <div className='text-lg font-bold text-dark-500'>
        {getWeatherComment(props.day.code)}
      </div>
      <div className='mt-2 flex items-center gap-3'>
        <div className='text-xl text-red-500'>
          {props.day.tempMax}
          <span className='text-sm'>℃</span>
        </div>
        <div className='text-xl text-blue-500'>
          {props.day.tempMin}
          <span className='text-sm'>℃</span>
        </div>
      </div>
    </div>
  )
}
