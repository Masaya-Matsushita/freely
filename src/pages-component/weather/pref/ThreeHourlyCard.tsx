import { FC } from 'react'
import { getWeatherIcon, getWindComment, getWindDirection } from 'src/lib/const'
import { ThreeHourly } from 'src/type/WeatherData'

export const ThreeHourlyCard: FC<{ data: ThreeHourly }> = (props) => {
  return (
    <div>
      <div className='flex h-[360px] w-24 flex-col items-center gap-3 bg-white py-4 text-lg text-dark-500'>
        <div className='w-full border-solid border-white border-b-gray-200 pb-1 text-center'>
          {props.data.time}
        </div>
        <div className='flex h-[72px] items-center'>
          <div>{getWeatherIcon(props.data.icon, 'small')}</div>
        </div>
        <div>
          {props.data.tempFeels}
          <span className='ml-[2px] text-sm'>℃</span>
        </div>
        <div>
          {props.data.humidity}
          <span className='ml-[2px] text-sm'>%</span>
        </div>
        <div>
          {props.data.rain['3h']}
          <span className='ml-[2px] text-sm'>mm</span>
        </div>
        <div className='mt-1 flex flex-col items-center -space-y-2'>
          <div>{getWindDirection(props.data.windDeg)}</div>
          <div className='text-sm'>{getWindComment(props.data.windDeg)}</div>
        </div>
        <div className='-mt-1'>
          {props.data.windSpeed}
          <span className='ml-[2px] text-sm'>m/s</span>
        </div>
      </div>
    </div>
  )
}
