import { Tabs } from '@mantine/core'
import { IconBottle, IconCloud, IconVirus } from '@tabler/icons'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { getPath } from 'src/lib/const'

type Props = {
  prefId: string
  planId: string | null
}

/**
 * @package
 */
export const LinkTab: FC<Props> = (props) => {
  const router = useRouter()

  return (
    <div>
      <Tabs
        defaultValue={router.pathname.slice(1).split('/')[0].toUpperCase()}
        value={router.query.activeTab as string}
        onTabChange={(value: 'WEATHER' | 'COVID19' | 'SAKE') =>
          router.push({
            pathname: getPath(value, props.prefId),
            query: { plan_id: props.planId },
          })
        }
        className='mx-2 mt-12 xxs:mt-16 xs:mx-4 xl:mx-auto xl:w-[1080px]'
      >
        <Tabs.List>
          <Tabs.Tab value='WEATHER' icon={<IconCloud />}>
            天気
          </Tabs.Tab>
          <Tabs.Tab value='COVID19' icon={<IconVirus />}>
            コロナ
          </Tabs.Tab>
          <Tabs.Tab value='SAKE' icon={<IconBottle />}>
            地酒
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  )
}
