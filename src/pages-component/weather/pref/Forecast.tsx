import { FC } from 'react'
import { Card } from 'src/component/Card'
import { getWeatherIcon } from 'src/lib/const'
import { WeatherData } from 'src/type/WeatherData'

/**
 * @package
 */
export const Forecast: FC<{ data: WeatherData }> = (props) => {
  console.log(props.data.weekly[0])

  return (
    <div>
      {props.data ? (
        <div>
          <Card>
            <div>県庁所在地: {props.data.name}</div>
            {getWeatherIcon(55)}
          </Card>
          <div className='mt-4'>{props.data.time}発表</div>
        </div>
      ) : null}
    </div>
  )
}
