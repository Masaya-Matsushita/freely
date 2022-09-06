import { FC, useEffect, useState } from 'react'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { SakeObj } from 'src/type/SakeObj'

/**
 * @package
 */
export const Sake: FC<{ data: SakeObj }> = (props) => {
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
        {props.data.sakeHokkaido.map((sake) => {
          return (
            <div key={sake.name}>
              <div>{sake.name}</div>
              <div>{sake.en}</div>
              {sake.makerUrl ? (
                <a
                  href={sake.makerUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {sake.makerName}
                </a>
              ) : (
                <div>{sake.makerName}</div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
