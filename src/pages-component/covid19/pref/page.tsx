import { FC } from 'react'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { Covid19Data } from 'src/type/Covid19Data'

/**
 * @package
 */
export const Covid19: FC<{ data: Covid19Data }> = (props) => {
  const japanData = props.data.covid19Japan
  const prefData = props.data.covid19Pref

  return (
    <>
      <PrefSelectBox />
      <div className='space-y-4'>
        {japanData.errorInfo.errorFlag === '0' ? (
          <div>
            {japanData.itemList.map(({ date, infectedNum }) => {
              return (
                <div key={date}>
                  <div>{date}</div>
                  <div>{infectedNum}</div>
                </div>
              )
            })}
          </div>
        ) : null}
        {prefData.errorInfo.errorFlag === '0' ? (
          <div>
            {prefData.itemList.map(({ date, infectedNum }) => {
              return (
                <div key={date}>
                  <div>{date}</div>
                  <div>{infectedNum}</div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </>
  )
}
