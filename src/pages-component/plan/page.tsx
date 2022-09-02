import { Badge, UnstyledButton } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
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
        <UnstyledButton className='mx-4 mt-8 rounded-md p-2 text-3xl font-bold text-dark-500 xs:mx-6'>
          {/* {planData.plan_name} */}
          東京観光
        </UnstyledButton>
        {typeof planId === 'string' ? (
          <div className='ml-4 mt-4 flex flex-col xxs:flex-row xs:ml-6'>
            <DateBadge planId={planId} />
            <div className='mx-2 max-w-[180px] text-center font-bold text-main-400'>
              ~
            </div>
            <DateBadge planId={planId} />
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
        <div className='mx-4 mt-12 text-3xl font-bold text-dark-500'>
          スポット一覧
        </div>
        <hr className='mx-2 h-[3px] border-0 bg-main-200' />
        <div className='mx-4 mt-6 flex flex-wrap gap-x-3 gap-y-4 xs:mx-6 xs:gap-x-4 xs:gap-y-6 sm:ml-12 md:ml-16 md:mr-8 md:gap-x-6 md:gap-y-8'>
          <SpotCard />
          <SpotCard />
          <SpotCard />
          <SpotCard />
          {/* 追加ボタン候補
          <div className='my-4 flex w-full items-center justify-center xxs:my-0 xxs:w-[calc(50vw-22px)] xs:w-[calc(50vw-32px)] sm:min-h-[155px] sm:w-[calc(50vw-186px)] md:min-h-[200px] md:w-[292px]'>
            <Button className='h-14 w-60 rounded-lg bg-white shadow-md shadow-dark-200 xxs:h-[18vw] xxs:w-[18vw] xs:rounded-2xl sm:h-[13vw] sm:w-[13vw] md:h-28 md:w-28'>
              <IconPlus size={44} color='#495057' />
            </Button>
          </div> */}
          <UnstyledButton className='flex h-[calc(55vw+25px)] w-full items-center justify-center rounded-xl  bg-slate-100 shadow shadow-dark-200 xxs:h-[calc(28vw+30px)] xxs:w-[calc(50vw-22px)] xs:h-[calc(28vw+25px)] xs:w-[calc(50vw-32px)] sm:h-[calc(28vw-60px)] sm:w-[calc(50vw-186px)] md:h-[207px] md:w-[292px]'>
            <IconPlus size={44} color='#495057' />
          </UnstyledButton>
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
        className='max-w-[180px] bg-main-300 py-3 px-6 text-sm text-main-500 hover:cursor-pointer'
      >
        2022/08/20
      </Badge>
    </Link>
  )
}

const SpotCard = () => {
  return (
    <UnstyledButton className='rounded-xl shadow shadow-dark-200 xxs:w-[calc(50vw-22px)] xs:w-[calc(50vw-32px)] sm:w-[calc(50vw-186px)] md:w-[292px]'>
      <Image
        src='/Naoshima.JPG'
        height={'900px'}
        width={'1600px'}
        alt=''
        className='rounded-t-lg'
      />
      <div className='flex h-10 items-center gap-2 xs:h-12 xs:gap-4'>
        <AiOutlineStar
          color='#AFAFAF'
          size={26}
          className='ml-3 shrink-0 xs:ml-5'
        />
        {/* <AiFillStar
          color='#f0dc00'
          size={26}
          className='ml-3 shrink-0 xs:ml-5'
        /> */}
          築地市場
        </div>
      </div>
    </UnstyledButton>
  )
}
