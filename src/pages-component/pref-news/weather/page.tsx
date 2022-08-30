import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { Forecast } from './Forecast'
import { prefIdState } from 'src/state/prefId'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const Weather: FC<{ data: WeatherObj }> = (props) => {
  const prefId = useRecoilValue(prefIdState)

  return (
    <div>
      {prefId && prefId !== 'null' ? (
        <Forecast data={props.data} prefId={prefId} />
      ) : null}
    </div>
  )
}
