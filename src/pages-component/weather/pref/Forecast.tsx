import { Carousel } from '@mantine/carousel'
import { FC } from 'react'
import { WeatherCard } from './WeatherCard'
import { getWeatherIcon, getWindComment, getWindDirection } from 'src/lib/const'
import { WeatherData } from 'src/type/WeatherData'

/**
 * @package
 */
export const Forecast: FC<{ data: WeatherData }> = (props) => {
  const threeHourlyList = props.data.threeHourly
  const weeklyList = props.data.weekly

  return (
    <div>
      {props.data ? (
        <div>
          <Carousel
            slideSize='33.333%'
            breakpoints={[
              { maxWidth: 'lg', slideSize: '40%' },
              { maxWidth: 'xs', slideSize: '45%' },
            ]}
            controlsOffset='xl'
            align='start'
            dragFree
            className='mx-auto mt-6 max-w-[95vw] sm:max-w-[calc(95vw-276px)]'
          >
            <Carousel.Slide>
              <WeatherCard day={weeklyList[0]} label='今日' />
            </Carousel.Slide>
            <Carousel.Slide>
              <WeatherCard day={weeklyList[1]} label='明日' />
            </Carousel.Slide>
            <Carousel.Slide>
              <WeatherCard day={weeklyList[2]} label='明後日' />
            </Carousel.Slide>
          </Carousel>
          <div className='flex'>
            <div className='flex h-72 w-24 justify-center bg-gray-200 pt-8 text-lg text-dark-500'>
              今日
            </div>
            <div className='flex h-72 w-24 flex-col items-center gap-[6px] bg-white py-2 text-lg text-dark-500'>
              <div>{threeHourlyList[0].time}</div>
              <div className='flex h-16 items-center'>
                <div>{getWeatherIcon(threeHourlyList[0].icon, 'small')}</div>
              </div>
              <div>
                {threeHourlyList[0].tempFeels}
                <span className='ml-[2px] text-sm'>℃</span>
              </div>
              <div>
                {threeHourlyList[0].humidity}
                <span className='ml-[2px] text-sm'>%</span>
              </div>
              <div>
                {threeHourlyList[0].rain['3h']}
                <span className='ml-[2px] text-sm'>mm</span>
              </div>
              <div className='mt-1 flex flex-col items-center -space-y-2'>
                <div>{getWindDirection(threeHourlyList[0].windDeg)}</div>
                <div className='text-sm'>
                  {getWindComment(threeHourlyList[0].windDeg)}
                </div>
              </div>
              <div className='-mt-1'>
                {threeHourlyList[0].windSpeed}
                <span className='ml-[2px] text-sm'>m/s</span>
              </div>
            </div>
          </div>
          <div className='mt-4'>{props.data.time}発表</div>
        </div>
      ) : null}
    </div>
  )
}
