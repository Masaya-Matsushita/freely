import { FC, useEffect, useState } from 'react'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { SakeData } from 'src/type/SakeData'

/**
 * @package
 */
export const Sake: FC<{ data: SakeData }> = (props) => {
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
            {props.data.map((sake) => {
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
        </div>
      ) : null}
    </>
  )
}
