import { LoadingOverlay, UnstyledButton } from '@mantine/core'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useRecoilValue } from 'recoil'
import { useSWRConfig } from 'swr'
import { MemoModal } from './MemoModal'
import { PasswordModal } from 'src/component/PasswordModal'
import { passwordState } from 'src/state/password'
import { Spot } from 'src/type/Spot'

/**
 * @package
 */
export const SpotCard: FC<{ spot: Spot }> = (props) => {
  const [loading, setLoading] = useState(false)
  const [pwModal, setPwModal] = useState(false)
  const [memoModal, setMemoModal] = useState(false)
  const password = useRecoilValue(passwordState)

  const { mutate } = useSWRConfig()
  const catchError = useErrorHandler()

  // Priority変更
  const handleTogglePriority = async () => {
    try {
      setLoading(true)
      // API通信
      const res = await fetch('/api/spot/updatePriority', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          password: password,
          plan_id: props.spot.plan_id,
          spot_id: props.spot.spot_id,
          priority: !props.spot.priority,
        }),
      })

      // 404エラー
      if (res.status === 404) {
        throw new Error(
          '指定したプランが見つかりません。URLが誤っていないことをご確認ください。(404 Error)',
        )
      }
      // 404以外のエラー
      if (!res.ok) {
        throw new Error(
          'データの更新に失敗しました。時間を置いて再度お試しください。',
        )
      }

      const json: boolean = await res.json()
      if (json) {
        // 成功
        await mutate(`/api/spot/readSpotList?planId=${props.spot.plan_id}`)
        setLoading(false)
      } else {
        // パスワード認証に失敗
        setPwModal(true)
        setLoading(false)
      }
    } catch (error) {
      catchError(error)
    }
  }

  return (
    <div className='relative rounded-xl shadow shadow-dark-200 xxs:w-[calc(50vw-22px)] xs:w-[calc(50vw-32px)] sm:w-[calc(50vw-186px)] md:w-[292px]'>
      <LoadingOverlay
        visible={loading}
        loader={customLoader}
        overlayBlur={0.6}
        overlayOpacity={0.4}
        overlayColor='#c5c5c5'
        zIndex={10}
        className='rounded-xl'
      />
      {props.spot.image ? (
        <Image
          src={props.spot.image}
          height='900px'
          width='1600px'
          alt=''
          className='cursor-pointer rounded-t-lg'
          onClick={() => setMemoModal(true)}
        />
      ) : (
        <Image
          src={`/${props.spot.icon}Image.svg`}
          height='900px'
          width='1600px'
          alt=''
          className='cursor-pointer rounded-t-lg'
          onClick={() => setMemoModal(true)}
        />
      )}
      <div className='mb-1 flex h-8 items-center gap-1 xs:h-10 xs:gap-2'>
        <UnstyledButton
          onClick={handleTogglePriority}
          className='ml-3 rounded-md xs:ml-6'
        >
          {props.spot.priority ? (
            <AiFillStar color='#f0dc00' size={26} className='shrink-0' />
          ) : (
            <AiOutlineStar color='#AFAFAF' size={26} className='shrink-0' />
          )}
        </UnstyledButton>
        <UnstyledButton
          onClick={() => setMemoModal(true)}
          className='mr-2 flex-1 rounded-md p-[5px]'
        >
          <div className='max-h-[40px] overflow-hidden text-ellipsis text-sm font-bold text-dark-500'>
            {props.spot.spot_name}
          </div>
        </UnstyledButton>
      </div>
      <MemoModal
        opened={memoModal}
        close={() => setMemoModal(false)}
        planId={props.spot.plan_id}
        spotId={props.spot.spot_id}
        spotName={props.spot.spot_name}
        password={password}
      />
      <PasswordModal
        opened={pwModal}
        closeModal={() => setPwModal(false)}
        planId={props.spot.plan_id}
      />
    </div>
  )
}

const customLoader = (
  <svg
    width='48'
    height='48'
    viewBox='-10 -10 60 60'
    xmlns='http://www.w3.org/2000/svg'
    stroke='#6C6DE4'
  >
    <g fill='none' fillRule='evenodd'>
      <g transform='translate(1 1)' strokeWidth='5'>
        <circle strokeOpacity='.5' cx='18' cy='18' r='18' />
        <path d='M36 18c0-9.94-8.06-18-18-18'>
          <animateTransform
            attributeName='transform'
            type='rotate'
            from='0 18 18'
            to='360 18 18'
            dur='1s'
            repeatCount='indefinite'
          />
        </path>
      </g>
    </g>
  </svg>
)
