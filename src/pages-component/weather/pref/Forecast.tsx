import { Carousel } from '@mantine/carousel'
import { FC } from 'react'
import { ThreeHourlyCard } from './ThreeHourlyCard'
import { WeatherCard } from './WeatherCard'
import { getDayOfWeek } from 'src/lib/func'
import { WeatherData } from 'src/type/WeatherData'

/**
 * @package
 */
export const Forecast: FC<{ data: WeatherData }> = (props) => {
  const threeHourlyList = props.data.threeHourly
  const weeklyList = props.data.weekly

  const todayDayOfWeek = getDayOfWeek(
    threeHourlyList[0].year,
    threeHourlyList[0].month,
    threeHourlyList[0].day,
  )

  console.log(threeHourlyList)

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
          <div className='flex w-[100vw] overflow-scroll sm:w-[calc(100vw-276px)]'>
            <div className='flex h-[360px] w-24 shrink-0 flex-col items-center bg-gray-200 pt-8 text-dark-500'>
              <div className='text-lg'>
                {threeHourlyList[0].month}/{threeHourlyList[0].day}
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
            {threeHourlyList.map((data) => {
              if (data.time === 21) {
                return (
                  <div className='flex' key={data.day + data.time}>
                    <ThreeHourlyCard data={data} />
                    <div className='flex h-[360px] w-24 shrink-0 flex-col items-center bg-gray-200 pt-8 text-dark-500'>
                      <div className='text-lg'>
                        {data.month}/{data.day + 1}
                      </div>
                      <div
                        className={`${
                          getDayOfWeek(data.year, data.month, data.day + 1) ===
                          '土'
                            ? 'text-blue-500'
                            : getDayOfWeek(
                                data.year,
                                data.month,
                                data.day + 1,
                              ) === '日'
                            ? 'text-red-500'
                            : null
                        }`}
                      >
                        ({getDayOfWeek(data.year, data.month, data.day + 1)})
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <ThreeHourlyCard data={data} key={data.day + data.time} />
                )
              }
            })}
          </div>
          <div className='mt-4'>{props.data.time}発表</div>
        </div>
      ) : null}
    </div>
  )
}
