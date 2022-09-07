import { FC } from 'react'
import { Forecast } from './Forecast'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { WeatherData } from 'src/type/WeatherData'

/**
 * @package
 */
export const Weather: FC<{ data: WeatherData }> = (props) => {
  return (
    <>
      <div>
        <PrefSelectBox />
        <Forecast data={props.data} />
      </div>
    </>
  )
}
