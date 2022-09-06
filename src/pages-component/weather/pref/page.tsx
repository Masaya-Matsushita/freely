import { FC, useEffect, useState } from 'react'
import { Forecast } from './Forecast'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const Weather: FC<{ data: WeatherObj }> = (props) => {
  const [prefId, setPrefId] = useState('13')

  // prefIdに初期値を代入
  useEffect(() => {
    const localPrefId = localStorage.getItem('prefId')
    if (localPrefId) {
      setPrefId(localPrefId)
    }
  }, [])

  return (
    <>
      <PrefSelectBox prefId={prefId} setPrefId={setPrefId} />
      <Forecast data={props.data} prefId={prefId} />
    </>
  )
}
