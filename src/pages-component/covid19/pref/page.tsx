import { FC, useEffect, useState } from 'react'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { Covid19Obj } from 'src/type/Covid19Obj'

/**
 * @package
 */
export const Covid19: FC<{ data: Covid19Obj }> = (props) => {
  const hokkaido = props.data.covid19Hokkaido
  const japan = props.data.covid19Japan
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
        {hokkaido.errorInfo.errorFlag === '0' ? (
          <div>
            {hokkaido.itemList.map(({ date, infectedNum }) => {
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
