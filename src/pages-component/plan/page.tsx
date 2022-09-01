import { Badge, Card, UnstyledButton } from '@mantine/core'
import { IconStar } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import useSWR from 'swr'

/**
 * @package
 */
export const Plan = () => {
  const router = useRouter()
  const planId = router.query.plan
  // const { data: planData, error: planError } = useSWR(
  //   `/api/plan?planId=${planId}`,
  // )
  // const { data: spotData, error: spotError } = useSWR(
  //   `/api/spot?planId=${planId}`,
  // )

  // console.log('plan', planData)
  // console.log('spot', spotData)
  // if (planError || spotError) {
  //   console.log('plan', planError)
  //   console.log('spot', spotError)
  // }

  // TODO: planページで動的パスを実現できる
  // useEffect(() => {
  // ページ遷移時にplanIdをブラウザに保存する
  // sessionStorage.setItem('planId', planId)
  // }, [])

  return (
    <>
      {/* {planData ? ( */}
      <div>
        <UnstyledButton className='mx-4 mt-8 rounded-md p-2 text-3xl font-bold text-dark-500'>
          {/* {planData.plan_name} */}
          東京観光
        </UnstyledButton>
        {typeof planId === 'string' ? (
          <div className='ml-4 mt-4'>
            <DateBadge planId={planId} />
            <span className='mx-2 font-bold text-main-400'>~</span>
            <DateBadge planId={planId} />
          </div>
        ) : null}
        <div className='mx-4 mt-12 text-3xl font-bold text-dark-500'>
          スポット一覧
        </div>
        <hr className='mx-2 h-[3px] border-0 bg-main-200' />
        <div className='mx-4 mt-6 flex flex-wrap gap-x-2 gap-y-4 xs:justify-center xs:gap-x-4 xs:gap-y-6 md:justify-start'>
          <SpotCard />
          <SpotCard />
          <SpotCard />
        </div>
      </div>
      {/* ) : null} */}
    </>
  )
}

const DateBadge: FC<{ planId: string }> = (props) => {
  return (
    <Link href={{ pathname: '/edit', query: { plan: props.planId } }} passHref>
      <Badge
        component='a'
        className='bg-main-300 py-3 px-6 text-sm text-main-500 hover:cursor-pointer'
      >
        2022/08/20
      </Badge>
    </Link>
  )
}

const SpotCard = () => {
  return (
    <UnstyledButton className='w-[168px] grow rounded-xl border-[1px] border-solid border-main-300 shadow-md xs:w-60 xs:grow-0'>
      <Image
        src='/Naoshima.JPG'
        height={'900px'}
        width={'1600px'}
        alt=''
        className='rounded-t-lg'
      />
      <div className='flex h-10 items-center gap-2'>
        <IconStar
          stroke={3}
          size={24}
          color='#ffec00'
          className='ml-3 shrink-0'
        />
        <div className='mr-2 max-h-[40px] overflow-hidden text-ellipsis text-sm font-bold leading-4 text-dark-500'>
          築地市場
        </div>
      </div>
    </UnstyledButton>
  )
}
