import { FC } from 'react'
import { Covid19 } from './Covid19'
import { Sake } from './Sake'
import { Weather } from './Weather'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const PrefNews: FC<{ weatherData: WeatherObj }> = (props) => {
  return (
    <div>
      <Weather data={props.weatherData} />
      {/* <Covid19 /> */}
      {/* <Sake /> */}
    </div>
  )
}
