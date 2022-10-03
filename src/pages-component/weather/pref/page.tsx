import { useRouter } from 'next/router'
import { FC } from 'react'
import { Forecast } from './Forecast'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { WeatherData } from 'src/type/WeatherData'

/**
 * @package
 */
export const Weather: FC<{ data: WeatherData }> = (props) => {
  const router = useRouter()

  // パスのクエリにplanIdが無いとき
  if (router.isReady && !router.query.plan_id) {
    throw new Error(
      '不正なパス遷移として検出されました。Top画面から入り直してください。',
    )
  }

  return (
    <>
      <div>
        <PrefSelectBox />
        <Forecast data={props.data} />
      </div>
    </>
  )
}
