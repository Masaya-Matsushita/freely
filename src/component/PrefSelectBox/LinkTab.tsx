import { Tabs } from '@mantine/core'
import { IconBottle, IconCloud, IconVirus } from '@tabler/icons'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { getPath } from 'src/lib/const'

/**
 * @package
 */
export const LinkTab: FC<{ prefId: string }> = (props) => {
  const router = useRouter()

  return (
    <div>
      <Tabs
        defaultValue={router.pathname.slice(1).split('/')[0].toUpperCase()}
        value={router.query.activeTab as string}
        onTabChange={(value: 'WEATHER' | 'COVID19' | 'SAKE') =>
          router.push(getPath(value, props.prefId))
        }
        className='mx-2 mt-12'
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
