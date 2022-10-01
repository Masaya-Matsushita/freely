import { Divider } from '@mantine/core'
import { FC } from 'react'
import { getWeatherComment, getWeatherIcon } from 'src/lib/const'
import { getDayOfWeek } from 'src/lib/func'
import { useMediaQuery } from 'src/lib/mantine'
import { Weekly } from 'src/type/WeatherData'

/**
 * @package
 */
export const WeeklyWeatherCard: FC<{ data: Weekly }> = (props) => {
  const largerThanMd = useMediaQuery('md')

  return (
    <div className='shadow-md'>
      <div className='flex items-center justify-between bg-white py-2 px-3 xxs:px-5 xs:px-10 lg:px-16 lg:py-3'>
        <div className='flex items-center text-dark-500 xs:gap-1 lg:gap-2'>
          <div className='w-6 text-lg xs:text-xl lg:text-2xl'>
            {props.data.day}
          </div>
          <div
            className={`xs:text-lg lg:text-xl ${
              getDayOfWeek(
                props.data.year,
                props.data.month,
                props.data.day,
              ) === '土'
                ? 'text-blue-500'
                : getDayOfWeek(
                    props.data.year,
                    props.data.month,
                    props.data.day,
                  ) === '日'
                ? 'text-red-500'
                : null
            }`}
          >
            ({getDayOfWeek(props.data.year, props.data.month, props.data.day)})
          </div>
        </div>
        <div className='flex items-center gap-1 xxs:gap-3 xs:gap-6 lg:gap-8'>
          <div className='flex w-20 justify-center xxs:w-28 xs:w-32 lg:w-36'>
            {getWeatherIcon(props.data.code, 'small')}
          </div>
          {largerThanMd ? (
            <div className='w-20 text-sm text-dark-400 xxs:w-28 xs:w-32 lg:w-40 lg:text-base'>
              {getWeatherComment(props.data.code)}
            </div>
          ) : null}
          <div className='w-10 text-lg text-red-500 xs:text-xl lg:w-14 lg:text-2xl'>
            {props.data.tempMax}
            <span className='text-xs xs:text-sm lg:text-base'>℃</span>
          </div>
          <div className='w-10 text-lg text-blue-500 xs:text-xl lg:w-14 lg:text-2xl'>
            {props.data.tempMin}
            <span className='text-xs xs:text-sm lg:text-base'>℃</span>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  )
}
