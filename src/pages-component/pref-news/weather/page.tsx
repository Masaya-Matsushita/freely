import Image from 'next/image'
import { FC } from 'react'
import { Forecast } from './Forecast'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const Weather: FC<{ data: WeatherObj }> = (props) => {
  const prefId = localStorage.getItem('prefId')

  return (
    <div>
      {prefId && prefId !== 'null' ? (
        <Forecast data={props.data} prefId={prefId} />
      ) : (
        <div>
          <div className='relative mx-auto mt-12 h-36 w-36 opacity-70 xxs:mt-16 xxs:h-60 xxs:w-60 sm:mt-32 sm:h-80 sm:w-80'>
            <Image src='/DataImage.svg' alt='' layout='fill' />
          </div>
          <div className='mx-8 mt-2 text-center leading-7 text-dark-400 xxs:mx-16 xs:mt-8'>
            都道府県を選択すると、天気予報やコロナ情報などが取得できます。
          </div>
        </div>
      )}
    </div>
  )
}
