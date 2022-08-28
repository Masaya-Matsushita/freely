import { FC } from 'react'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const Weather: FC<{ data: WeatherObj }> = (props) => {
  const tokyo = props.data.weatherTokyo
  const osaka = props.data.weatherOsaka

  if (tokyo) {
    console.log('tokyo:', tokyo)
    console.log('都道府県:', tokyo.city.name)
    console.log('時間:', tokyo.list[0].dt_txt)
    console.log('時間:', tokyo.list[0].weather[0].description)
    console.log('体感気温:', tokyo.list[0].main.feels_like)
  }

  if (osaka) {
    console.log('osaka:', osaka)
    console.log('都道府県:', osaka.city.name)
    console.log('時間:', osaka.list[0].dt_txt)
    console.log('時間:', osaka.list[0].weather[0].description)
    console.log('体感気温:', osaka.list[0].main.feels_like)
  }

  return (
    <div>
      {tokyo ? (
        <div>
          <div>{tokyo.city.name}</div>
          <div>{tokyo.list[0].dt_txt}</div>
          <div>{tokyo.list[0].weather[0].description}</div>
          <div>{tokyo.list[0].main.feels_like}</div>
        </div>
      ) : null}
      {osaka ? (
        <div>
          <div>{osaka.city.name}</div>
          <div>{osaka.list[0].dt_txt}</div>
          <div>{osaka.list[0].weather[0].description}</div>
          <div>{osaka.list[0].main.feels_like}</div>
        </div>
      ) : null}
    </div>
  )
}
