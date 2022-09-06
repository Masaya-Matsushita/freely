import { FC, useEffect, useState } from 'react'
import { Forecast } from './Forecast'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { WeatherData } from 'src/type/WeatherData'

/**
 * @package
 */
export const Weather: FC<{ data: WeatherData }> = (props) => {
  const [prefId, setPrefId] = useState('')

  // prefIdに初期値を代入
  useEffect(() => {
    const localPrefId = localStorage.getItem('prefId')
    if (localPrefId) {
      setPrefId(localPrefId)
    }
  }, [])

  return (
    <>
      {prefId ? (
        <div>
          <PrefSelectBox prefId={prefId} setPrefId={setPrefId} />
          <Forecast data={props.data} />
        </div>
      ) : null}
    </>
  )
}
