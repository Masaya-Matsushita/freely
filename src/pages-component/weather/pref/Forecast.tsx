import { Carousel } from '@mantine/carousel'
import { Spoiler, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'
import { FC } from 'react'
import { ThreeHourlyList } from './ThreeHourlyList'
import { WeatherCard } from './WeatherCard'
import { WeeklyWeatherCard } from './WeeklyWeatherCard'
import { WeatherData } from 'src/type/WeatherData'

/**
 * @package
 */
export const Forecast: FC<{ data: WeatherData }> = (props) => {
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
            className='mx-auto mt-6 max-w-[95vw] sm:max-w-[calc(95vw-276px)] md:mt-10'
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
              <div className='flex w-[95vw] items-center justify-center border-[1px] border-solid border-slate-50 border-t-slate-200 sm:w-[calc(95vw-286px)]'>
                <IconChevronDown
                  color='#3b82f6'
                  stroke={3}
                  size={28}
                  className='mt-1'
                />
              </div>
            }
            hideLabel={
              <div className='flex w-[95vw] items-center justify-center border-[1px] border-solid border-slate-50 border-t-slate-200 sm:w-[calc(95vw-286px)]'>
                <IconChevronUp
                  color='#3b82f6'
                  stroke={3}
                  size={28}
                  className='mt-1'
                />
              </div>
            }
            className='mx-auto mt-4 w-[95vw] shadow-md sm:w-[calc(93vw-286px)]'
          >
            <div className='flex'>
              <div className='flex h-[340px] w-14 shrink-0 flex-col items-center bg-white pt-[18px] text-dark-500 shadow-lg'>
                <div>時刻</div>
                <div className='mt-[98px] md:mt-[88px]'>気温</div>
                <div className='mt-3 md:mt-[15.5px]'>降水</div>
                <div className='mt-3 md:mt-[15.5px]'>湿度</div>
                <div className='mt-10 md:mt-12'>風</div>
              </div>
              <ThreeHourlyList threeHourlyList={props.data.threeHourly} />
            </div>
          </Spoiler>
          <div className='mx-auto mt-8 w-[95vw] max-w-[1000px] xxs:w-[90vw] xs:w-[85vw] sm:mt-12 sm:w-[calc(90vw-286px)] md:mt-20 lg:w-[calc(85vw-286px)]'>
            <div className='ml-2 mb-1 text-dark-500 md:text-lg'>週間天気</div>
            {weeklyList.slice(2, 7).map((data) => {
              return (
                <div key={data.day}>
                  <WeeklyWeatherCard data={data} />
                </div>
              )
            })}
            <div className='mr-2 mt-6 text-end text-xs text-dark-400 md:text-sm'>
              <div>
                現在のデータ：
                <span className='mx-1 underline'>
                  {props.data.threeHourly[2].year}/
                  {props.data.threeHourly[2].month}/
                  {props.data.threeHourly[2].day}{' '}
                  {props.data.threeHourly[2].time}時発表
                </span>
                (最新)
              </div>
              <div className='mt-1 flex flex-col md:flex-row md:justify-end md:gap-3'>
                <div>取得元：Open Weather Map ( 3時間天気 )</div>
                <div>Open Meteo ( 3日間・週間天気 )</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
