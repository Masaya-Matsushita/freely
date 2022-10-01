import { FC } from 'react'
import { getWeatherIcon, getWindComment, getWindDirection } from 'src/lib/const'
import { getDayOfWeek } from 'src/lib/func'
import { ThreeHourly } from 'src/type/WeatherData'

/**
 * @package
 */
export const ThreeHourlyList: FC<{ threeHourlyList: ThreeHourly[] }> = (
  props,
) => {
  // 今日の曜日
  const todayDayOfWeek = getDayOfWeek(
    props.threeHourlyList[0].year,
    props.threeHourlyList[0].month,
    props.threeHourlyList[0].day,
  )

  return (
    <div className='flex w-[calc(95vw-64px)] overflow-scroll sm:w-[calc(95vw-350px)]'>
      <div className='flex h-[340px] w-16 shrink-0 flex-col items-center bg-slate-200 pt-8 text-dark-500 md:w-20'>
        <div className='text-lg'>
          {props.threeHourlyList[0].month}/{props.threeHourlyList[0].day}
        </div>
        <div
          className={`${
            todayDayOfWeek === '土'
              ? 'text-blue-500'
              : todayDayOfWeek === '日'
              ? 'text-red-500'
              : null
          }`}
        >
          ({todayDayOfWeek})
        </div>
      </div>
      {props.threeHourlyList.map((data) => {
        if (data.time === 0) {
          return (
            <div className='flex w-28 md:w-40' key={data.day + data.time}>
              <div className='flex h-[340px] w-16 shrink-0 flex-col items-center bg-slate-200 pt-8 text-dark-500 md:w-20'>
                <div className='text-lg'>
                  {data.month}/{data.day}
                </div>
                <div
                  className={`${
                    getDayOfWeek(data.year, data.month, data.day + 1) === '土'
                      ? 'text-blue-500'
                      : getDayOfWeek(data.year, data.month, data.day) === '日'
                      ? 'text-red-500'
                      : null
                  }`}
                >
                  ({getDayOfWeek(data.year, data.month, data.day)})
                </div>
              </div>
              <ThreeHourlyCard data={data} />
            </div>
          )
        } else {
          return <ThreeHourlyCard data={data} key={data.day + data.time} />
        }
      })}
    </div>
  )
}

const ThreeHourlyCard: FC<{ data: ThreeHourly }> = (props) => {
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
