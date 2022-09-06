import { FC, useEffect, useMemo, useState } from 'react'
import { Card } from 'src/component/Card'
import { prefList } from 'src/lib/const'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const Forecast: FC<{ data: WeatherObj; prefId: string }> = (props) => {
  const prefId = props.prefId
  const [weather, setWeather] = useState<any>()

  const dataList = useMemo(
    () => [
      { city: 'Sapporo', weather: props.data.weatherSapporo },
      { city: 'Aomori', weather: props.data.weatherAomori },
    ],
    [props.data],
  )

  useEffect(() => {
    const city = prefList.find((pref) => pref.id === prefId)?.city
    if (city) {
      const weather = dataList.find((data) => data.city === city)?.weather
      if (weather) {
        setWeather(weather)
      }
    }
  }, [prefId, dataList])

  return (
    <div>
      {weather ? (
        <div>
          <Card>
            <div>県庁所在地: {weather.city.name}</div>
            <div>タイムゾーン: {weather.list[3].dt_txt}</div>
            <div>天気アイコン: {weather.list[3].weather[0].icon}</div>
            <div>天気ひとこと: {weather.list[3].weather[0].description}</div>
            <div>風速: {weather.list[3].wind.speed}</div>
            <div>風向: {weather.list[3].wind.deg}</div>
            <div>気温: {weather.list[3].main.feels_like}</div>
            <div>最高気温: {weather.list[3].main.temp_max}</div>
            <div>最低気温: {weather.list[3].main.temp_min}</div>
            <div>湿度: {weather.list[3].main.humidity}</div>
          </Card>
          <div className='mt-4'>{weather.list[2].dt_txt}発表</div>
        </div>
      ) : null}
    </div>
  )
}
