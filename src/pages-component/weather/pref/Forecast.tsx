import { FC } from 'react'
import { Card } from 'src/component/Card'
import { WeatherData } from 'src/type/WeatherData'

/**
 * @package
 */
export const Forecast: FC<{ data: WeatherData }> = (props) => {
  return (
    <div>
      {props.data ? (
        <div>
          <Card>
            <div>県庁所在地: {props.data.name}</div>
          </Card>
          <div className='mt-4'>{props.data.time}発表</div>
        </div>
      ) : null}
    </div>
  )
}
