import { FC } from 'react'
import { Covid19Obj } from 'src/type/Covid19Obj'

/**
 * @package
 */
export const Covid19: FC<{ data: Covid19Obj }> = (props) => {
  const hokkaido = props.data.covid19Hokkaido
  const japan = props.data.covid19Japan

  return (
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
  )
}
