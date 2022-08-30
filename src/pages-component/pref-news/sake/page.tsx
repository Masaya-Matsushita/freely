import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { prefIdState } from 'src/state/prefId'
import { SakeObj } from 'src/type/SakeObj'

/**
 * @package
 */
export const Sake: FC<{ data: SakeObj }> = (props) => {
  const prefId = useRecoilValue(prefIdState)

  return (
    <div>
      {prefId && prefId !== 'null' ? (
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
      ) : null}
    </div>
  )
}
