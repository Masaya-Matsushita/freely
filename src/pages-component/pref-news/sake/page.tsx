import { FC } from 'react'
import { SakeObj } from 'src/type/SakeObj'

/**
 * @package
 */
export const Sake: FC<{ data: SakeObj }> = (props) => {
  return (
    <div className='space-y-4'>
      {props.data.sakeHokkaido.map((sake) => {
        return (
          <div key={sake.name}>
            <div>{sake.name}</div>
            <div>{sake.en}</div>
            {sake.makerUrl ? (
              <a href={sake.makerUrl} target='_blank' rel='noopener noreferrer'>
                {sake.makerName}
              </a>
            ) : (
              <div>{sake.makerName}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
