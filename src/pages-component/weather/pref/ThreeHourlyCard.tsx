import { FC } from 'react'
import { getWeatherIcon, getWindComment, getWindDirection } from 'src/lib/const'
import { ThreeHourly } from 'src/type/WeatherData'

export const ThreeHourlyCard: FC<{ data: ThreeHourly }> = (props) => {
  return (
    <div className='mx-1 flex h-[340px] flex-col items-center gap-3 bg-slate-50 py-3 text-dark-500 md:mx-2 md:text-lg'>
      <div className='w-full border-solid border-slate-50 border-b-gray-200 pb-1 text-center'>
        {props.data.time}
      </div>
      <div className='flex h-[72px] items-center'>
        <div>{getWeatherIcon(props.data.icon, 'small')}</div>
      </div>
      <div>
        {props.data.tempFeels}
        <span className='ml-[2px] text-xs'>℃</span>
      </div>
      <div>
        {props.data.rain['3h']}
        <span className='ml-[2px] text-xs'>mm</span>
      </div>
      <div>
        {props.data.humidity}
        <span className='ml-[2px] text-xs'>%</span>
      </div>
      <div className='mt-1 flex flex-col items-center -space-y-2'>
        <div>{getWindDirection(props.data.windDeg)}</div>
        <div className='text-xs'>{getWindComment(props.data.windDeg)}</div>
      </div>
      <div className='-mt-1'>
        {props.data.windSpeed}
        <span className='ml-[2px] text-xs'>m/s</span>
      </div>
    </div>
  )
}
