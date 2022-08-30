import { Select, Tabs } from '@mantine/core'
import { IconBottle, IconCloud, IconMapPin, IconVirus } from '@tabler/icons'
import Image from 'next/image'
import { NextRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { prefList } from 'src/lib/const'
import { prefIdState } from 'src/state/prefId'

/**
 * @package
 */
export const PrefSelectBox: FC<{ router: NextRouter; planId: string }> = (
  props,
) => {
  const [prefId, setPrefId] = useRecoilState(prefIdState)

  const selectboxList = prefList.map((pref) => {
    return { value: pref.id, label: pref.name }
  })

  const handleChange = (val: string) => {
    setPrefId(val)
    localStorage.setItem('prefId', val)
  }

  useEffect(() => {
    setPrefId(localStorage.getItem('prefId'))
  }, [setPrefId])

  return (
    <div>
      <div className='mt-16 flex items-center justify-center gap-2'>
        <IconMapPin size={24} color='#6466F1' />
        <div className='text-xl font-bold tracking-wider text-dark-600 xxs:text-2xl'>
          旅先の情報
        </div>
      </div>
      <hr className='mt-3 h-[2px] w-24 rounded-sm border-0 bg-main-400 xxs:mt-5 xxs:h-[3px] xxs:w-28' />
      <Select
        data={selectboxList}
        placeholder='選択する'
        label='都道府県名'
        clearable
        value={prefId}
        onChange={handleChange}
        transition='pop-top-left'
        transitionDuration={80}
        transitionTimingFunction='ease'
        classNames={{
          root: 'max-w-md xs:mx-auto mx-8 xxs:mx-12 mt-12 xxs:mt-8',
        }}
      />
      {prefId && prefId !== 'null' ? (
        <Tabs
          value={props.router.query.activeTab as string}
          onTabChange={(value) =>
            props.router.push({
              pathname: `/pref-news/${value}`,
              query: { plan: props.planId },
            })
          }
          className='mx-2 mt-12'
        >
          <Tabs.List>
            <Tabs.Tab value='weather' icon={<IconCloud />}>
              天気
            </Tabs.Tab>
            <Tabs.Tab value='covid19' icon={<IconVirus />}>
              コロナ
            </Tabs.Tab>
            <Tabs.Tab value='sake' icon={<IconBottle />}>
              地酒
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      ) : (
        <div>
          <div className='relative mx-auto mt-12 h-36 w-36 opacity-70 xxs:mt-16 xxs:h-60 xxs:w-60 sm:mt-32 sm:h-80 sm:w-80'>
            <Image src='/DataImage.svg' alt='' layout='fill' />
          </div>
          <div className='mx-8 mt-2 text-center leading-7 text-dark-400 xxs:mx-16 xs:mt-8'>
            都道府県を選択すると、天気予報やコロナ情報などが取得できます。
          </div>
        </div>
      )}
    </div>
  )
}
