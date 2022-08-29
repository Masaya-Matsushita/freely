import { Card } from '@mantine/core'
import { FC } from 'react'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const Weather: FC<{ data: WeatherObj; prefId: string | null }> = (
  props,
) => {
  const tokyo = props.data.weatherTokyo
  const osaka = props.data.weatherOsaka

  console.log(props.prefId)

  return (
    <div className='space-y-4'>
      {tokyo ? (
        <Card>
          <div>都道府県名: {tokyo.city.name}</div>
          <div>タイムゾーン: {tokyo.list[0].dt_txt}</div>
          <div>天気アイコン: {tokyo.list[0].weather[0].icon}</div>
          <div>天気ひとこと: {tokyo.list[0].weather[0].description}</div>
          <div>風速: {tokyo.list[0].wind.speed}</div>
          <div>風向: {tokyo.list[0].wind.deg}</div>
          <div>気温: {tokyo.list[0].main.feels_like}</div>
          <div>最高気温: {tokyo.list[0].main.temp_max}</div>
          <div>最低気温: {tokyo.list[0].main.temp_min}</div>
          <div>湿度: {tokyo.list[0].main.humidity}</div>
        </Card>
      ) : null}
      {osaka ? (
        <Card>
          <div>都道府県名: {osaka.city.name}</div>
          <div>タイムゾーン: {osaka.list[3].dt_txt}</div>
          <div>天気アイコン: {osaka.list[3].weather[0].icon}</div>
          <div>天気ひとこと: {osaka.list[3].weather[0].description}</div>
          <div>風速: {osaka.list[3].wind.speed}</div>
          <div>風向: {osaka.list[3].wind.deg}</div>
          <div>気温: {osaka.list[3].main.feels_like}</div>
          <div>最高気温: {osaka.list[3].main.temp_max}</div>
          <div>最低気温: {osaka.list[3].main.temp_min}</div>
          <div>湿度: {osaka.list[3].main.humidity}</div>
        </Card>
      ) : null}
    </div>
  )
}
