import { ReactElement } from 'react'
import useSWR from 'swr'

/**
 * @package
 */
export const WeatherData = (): ReactElement => {
  const { data: tokyoData, error: tokyoError } = useSWR(
    'https://api.openweathermap.org/data/2.5/forecast?q=Tokyo,JP&appid=sample_appid&lang=ja&units=metric',
  )

  const { data: osakaData, error: osakaError } = useSWR(
    'https://api.openweathermap.org/data/2.5/forecast?q=Osaka,JP&appid=sample_appid&lang=ja&units=metric',
  )

  if (tokyoError) {
    console.log('tokyoError:', tokyoError)
  }

  if (osakaError) {
    console.log('osakaError:', osakaError)
  }

  if (tokyoData) {
    console.log('tokyoData:', tokyoData)
    console.log('都道府県:', tokyoData.city.name)
    console.log('時間:', tokyoData.list[0].dt_txt)
    console.log('時間:', tokyoData.list[0].weather[0].description)
    console.log('体感気温:', tokyoData.list[0].main.feels_like)
  }

  if (osakaData) {
    console.log('osakaData:', osakaData)
    console.log('都道府県:', osakaData.city.name)
    console.log('時間:', osakaData.list[0].dt_txt)
    console.log('時間:', osakaData.list[0].weather[0].description)
    console.log('体感気温:', osakaData.list[0].main.feels_like)
  }

  return (
    <div>
      {tokyoData ? (
        <div>
          <div>{tokyoData.city.name}</div>
          <div>{tokyoData.list[0].dt_txt}</div>
          <div>{tokyoData.list[0].weather[0].description}</div>
          <div>{tokyoData.list[0].main.feels_like}</div>
        </div>
      ) : null}
      {osakaData ? (
        <div>
          <div>{osakaData.city.name}</div>
          <div>{osakaData.list[0].dt_txt}</div>
          <div>{osakaData.list[0].weather[0].description}</div>
          <div>{osakaData.list[0].main.feels_like}</div>
        </div>
      ) : null}
    </div>
  )
}
