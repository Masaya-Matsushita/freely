import { FC, useEffect, useState } from 'react'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { Covid19Data } from 'src/type/Covid19Data'

/**
 * @package
 */
export const Covid19: FC<{ data: Covid19Data }> = (props) => {
  const japan = props.data.covid19Japan
  const pref = props.data.covid19Pref
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
          <div className='space-y-4'>
            {japan.errorInfo.errorFlag === '0' ? (
              <div>
                {japan.itemList.map(({ date, infectedNum }) => {
                  return (
                    <div key={date}>
                      <div>{date}</div>
                      <div>{infectedNum}</div>
                    </div>
                  )
                })}
              </div>
            ) : null}
            {pref.errorInfo.errorFlag === '0' ? (
              <div>
                {pref.itemList.map(({ date, infectedNum }) => {
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
        </div>
      ) : null}
    </>
  )
}
