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
            {/* <div>タイムゾーン: {props.data.daily[3].datetime}</div>
            <div>天気アイコン:{props.data.daily[3].icon}</div>
            <div>天気ひとこと: {props.data.daily[3].description}</div>
            <div>風速: {props.data.daily[3].windSpeed}</div>
            <div>風向: {props.data.daily[3].windDeg}</div>
            <div>気温: {props.data.daily[3].tempFeels}</div>
            <div>最高気温: {props.data.daily[3].tempMax}</div>
            <div>最低気温: {props.data.daily[3].tempMin}</div>
            <div>湿度: {props.data.daily[3].humidity}</div> */}
          </Card>
          <div className='mt-4'>{props.data.time}発表</div>
        </div>
      ) : null}
    </div>
  )
}
