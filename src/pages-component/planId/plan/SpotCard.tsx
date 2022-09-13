import { Loader, UnstyledButton } from '@mantine/core'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useSWRConfig } from 'swr'
import { MemoModal } from './MemoModal'
import { PasswordModal } from 'src/component/PasswordModal'
import { Spot } from 'src/type/Spot'

/**
 * @package
 */
export const SpotCard: FC<{ spot: Spot }> = (props) => {
  const [loading, setLoading] = useState(false)
  const [pwModal, setPwModal] = useState(false)
  const [memoModal, setMemoModal] = useState(false)
  const password = localStorage.getItem('password')
  const { mutate } = useSWRConfig()
  const catchError = useErrorHandler()

  // Priority変更
  const handleTogglePriority = async () => {
    try {
      setLoading(true)
      // API通信
      const res = await fetch('/api/updatePriority', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          password: password,
          plan_id: props.spot.plan_id,
          spot_id: props.spot.spot_id,
          priority: !props.spot.priority,
        }),
      })
      const json: boolean = await res.json()

      if (json === true) {
        // 成功
        mutate(`/api/spotList?planId=${props.spot.plan_id}`)
        setLoading(false)
      } else if (json === false) {
        // パスワード認証に失敗
        setPwModal(true)
        setLoading(false)
      } else {
        // 通信エラー
        throw new Error('サーバー側のエラーにより、メモの追加に失敗しました')
      }
    } catch (error) {
      catchError(error)
    }
  }

  return (
    <div>
      <UnstyledButton
        onClick={() => setMemoModal(true)}
        className='rounded-xl shadow shadow-dark-200 xxs:w-[calc(50vw-22px)] xs:w-[calc(50vw-32px)] sm:w-[calc(50vw-186px)] md:w-[292px]'
      >
        {props.spot.image ? (
          <Image
            src={props.spot.image}
            height='900px'
            width='1600px'
            alt=''
            className='rounded-t-lg'
          />
        ) : (
          <Image
            src={`/${props.spot.icon}Image.svg`}
            height='900px'
            width='1600px'
            alt=''
            className='rounded-t-lg'
          />
        )}
        <div className='flex h-10 items-center gap-2 xs:h-12 xs:gap-4'>
          {loading ? (
            <Loader size={24} />
          ) : (
            <div>
              {props.spot.priority ? (
                <AiFillStar
                  color='#f0dc00'
                  size={26}
                  className='ml-3 shrink-0 xs:ml-5'
                  onClick={handleTogglePriority}
                />
              ) : (
                <AiOutlineStar
                  color='#AFAFAF'
                  size={26}
                  className='ml-3 shrink-0 xs:ml-5'
                  onClick={handleTogglePriority}
                />
              )}
            </div>
          )}
          <div className='mr-2 max-h-[40px] overflow-hidden text-ellipsis text-sm font-bold text-dark-500'>
            {props.spot.spot_name}
          </div>
        </div>
      </UnstyledButton>
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
