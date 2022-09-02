import { Badge, UnstyledButton } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import useSWR from 'swr'
import { Spot } from 'src/type/Spot'

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

  // TODO: planページで動的パスを実現できる
  // useEffect(() => {
  // ページ遷移時にplanIdをブラウザに保存する
  // sessionStorage.setItem('planId', planId)
  // }, [])

  return (
    <>
      {/* {planData && spotData ? ( */}
      <div>
        <UnstyledButton className='mx-4 mt-8 rounded-md p-2 text-3xl font-bold text-dark-500 xs:mx-6 xs:text-4xl sm:mx-10'>
          {/* {planData.plan_name} */}
          東京観光
        </UnstyledButton>
        {typeof planId === 'string' ? (
          <div className='ml-4 mt-2 flex flex-col xxs:flex-row xs:ml-6 sm:ml-12'>
            {/* <DateBadge planId={planId} label={planData.start_date} /> */}
            <div className='mx-2 max-w-[180px] text-center font-bold text-main-400'>
              ~
            </div>
            {/* <DateBadge planId={planId} label={planData.end_date} /> */}
          </div>
        ) : null}
        {/* 世界地図背景
        <div className='absolute right-2 ml-16 hidden max-w-xs xxs:top-[106px] xxs:block xs:top-24 xs:max-w-md sm:right-12 md:max-w-xl lg:max-w-3xl'>
          <Image
            src='/WorldMap.png'
            width={largerThanSm ? '800px' : '500px'}
            height={largerThanSm ? '400px' : '300px'}
            alt=''
            className='opacity-10'
          />
        </div> */}
        <div className='ml-4 mt-12 text-3xl font-bold text-dark-500 xs:ml-6 sm:ml-10'>
          スポット一覧
        </div>
        <hr className='mx-2 h-[3px] border-0 bg-main-200 xs:mx-4 sm:mx-8' />
        <div className='mx-4 mt-6 mb-32 flex flex-wrap gap-x-3 gap-y-4 xs:mx-6 xs:mt-8 xs:gap-x-4 xs:gap-y-6 sm:ml-12 md:mt-10 md:ml-16 md:mr-8 md:gap-x-6 md:gap-y-8'>
          {/* {spotData.map((spot) => (
            <SpotCard key={spot.spot_id} data={spot} />
          ))} */}

          {/* 追加ボタン候補
          <div className='my-4 flex w-full items-center justify-center xxs:my-0 xxs:w-[calc(50vw-22px)] xs:w-[calc(50vw-32px)] sm:min-h-[155px] sm:w-[calc(50vw-186px)] md:min-h-[200px] md:w-[292px]'>
            <Button className='h-14 w-60 rounded-lg bg-white shadow-md shadow-dark-200 xxs:h-[18vw] xxs:w-[18vw] xs:rounded-2xl sm:h-[13vw] sm:w-[13vw] md:h-28 md:w-28'>
              <IconPlus size={44} color='#495057' />
            </Button>
          </div> */}
          <UnstyledButton className='flex h-[calc(55vw+25px)] w-full items-center justify-center rounded-xl  bg-slate-100 shadow shadow-dark-200 xxs:h-[calc(28vw+30px)] xxs:w-[calc(50vw-22px)] xs:h-[calc(28vw+35px)] xs:w-[calc(50vw-32px)] sm:h-[calc(28vw-50px)] sm:w-[calc(50vw-186px)] md:h-[217px] md:w-[292px]'>
            <IconPlus size={44} color='#495057' />
          </UnstyledButton>
        </div>
      </div>
      {/* ) : <div>取得中です</div>} */}
    </>
  )
}

const DateBadge: FC<{ planId: string; label: any }> = (props) => {
  return (
    <Link href={{ pathname: '/edit', query: { plan: props.planId } }} passHref>
      <Badge
        component='a'
        className='max-w-[180px] bg-main-300 py-3 px-6 text-sm text-main-500 hover:cursor-pointer sm:py-4'
      >
        {props.label}
      </Badge>
    </Link>
  )
}

const SpotCard: FC<{ data: Omit<Spot, 'plan_id'> }> = (props) => {
  return (
    <UnstyledButton className='rounded-xl shadow shadow-dark-200 xxs:w-[calc(50vw-22px)] xs:w-[calc(50vw-32px)] sm:w-[calc(50vw-186px)] md:w-[292px]'>
      {props.data.image ? (
        <Image
          // src={props.data.image}
          src='/Naoshima.JPG'
          height='900px'
          width='1600px'
          alt=''
          className='rounded-t-lg'
        />
      ) : (
        <Image
          // src={props.data.icon}
          src='/WorldMap.png'
          height='900px'
          width='1600px'
          alt=''
          className='rounded-t-lg'
        />
      )}
      <div className='flex h-10 items-center gap-2 xs:h-12 xs:gap-4'>
        {props.data.priority ? (
          <AiFillStar
            color='#f0dc00'
            size={26}
            className='ml-3 shrink-0 xs:ml-5'
          />
        ) : (
          <AiOutlineStar
            color='#AFAFAF'
            size={26}
            className='ml-3 shrink-0 xs:ml-5'
          />
        )}
        <div className='mr-2 max-h-[40px] overflow-hidden text-ellipsis text-sm font-bold text-dark-500'>
          {props.data.spot_name}
        </div>
      </div>
    </UnstyledButton>
  )
}
