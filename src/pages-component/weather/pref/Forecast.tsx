import { Carousel } from '@mantine/carousel'
import { Spoiler, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'
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
          <Spoiler
            maxHeight={208}
            showLabel={
              <UnstyledButton className='flex w-[95vw] items-center justify-center border-[1px] border-solid border-slate-50 border-t-slate-200 sm:w-[calc(95vw-286px)]'>
                <IconChevronDown
                  color='#3b82f6'
                  stroke={3}
                  size={28}
                  className='mt-1'
                />
              </UnstyledButton>
            }
            hideLabel={
              <UnstyledButton className='flex w-[95vw] items-center justify-center border-[1px] border-solid border-slate-50 border-t-slate-200 sm:w-[calc(95vw-286px)]'>
                <IconChevronUp
                  color='#3b82f6'
                  stroke={3}
                  size={28}
                  className='mt-1'
                />
              </UnstyledButton>
            }
            className='mx-auto mt-4 w-[95vw] shadow-lg sm:w-[calc(95vw-286px)]'
          >
            <div className='flex'>
              <div className='flex h-[340px] w-14 shrink-0 flex-col items-center bg-white pt-[18px] text-dark-500 shadow-lg'>
                <div>時刻</div>
                <div className='mt-[98px] md:mt-[88px]'>気温</div>
                <div className='mt-3 md:mt-[15.5px]'>降水</div>
                <div className='mt-3 md:mt-[15.5px]'>湿度</div>
                <div className='mt-10 md:mt-12'>風</div>
              </div>
              <div className='flex w-[calc(95vw-64px)] overflow-scroll sm:w-[calc(95vw-350px)]'>
                <div className='flex h-[340px] w-16 shrink-0 flex-col items-center bg-slate-200 pt-8 text-dark-500 md:w-20'>
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
                  if (data.time === 0) {
                    return (
                      <div
                        className='flex w-28 md:w-40'
                        key={data.day + data.time}
                      >
                        <div className='flex h-[340px] w-16 shrink-0 flex-col items-center bg-slate-200 pt-8 text-dark-500 md:w-20'>
                          <div className='text-lg'>
                            {data.month}/{data.day}
                          </div>
                          <div
                            className={`${
                              getDayOfWeek(
                                data.year,
                                data.month,
                                data.day + 1,
                              ) === '土'
                                ? 'text-blue-500'
                                : getDayOfWeek(
                                    data.year,
                                    data.month,
                                    data.day,
                                  ) === '日'
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
                    return (
                      <ThreeHourlyCard data={data} key={data.day + data.time} />
                    )
                  }
                })}
              </div>
            </div>
          </Spoiler>
          <div className='mt-4 mr-4 text-end text-sm text-dark-400 sm:mr-8 md:mr-12'>
            天気データ：{props.data.threeHourly[2].time}時発表
          </div>
        </div>
      ) : null}
    </div>
  )
}
