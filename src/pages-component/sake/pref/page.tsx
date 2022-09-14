import { FC } from 'react'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { SakeData } from 'src/type/SakeData'

/**
 * @package
 */
export const Sake: FC<{ data: SakeData }> = (props) => {
  return (
    <>
      <PrefSelectBox />
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
    </>
  )
}
