import { useRouter } from 'next/router'
import { FC } from 'react'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { SakeData } from 'src/type/SakeData'

/**
 * @package
 */
export const Sake: FC<{ data: SakeData }> = (props) => {
  const router = useRouter()

  // パスのクエリにplanIdが無いとき
  if (router.isReady && !router.query.plan_id) {
    throw new Error(
      '不正なパス遷移として検出されました。Top画面から入り直してください。',
    )
  }

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
