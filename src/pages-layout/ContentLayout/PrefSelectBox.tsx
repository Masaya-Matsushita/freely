import { Select } from '@mantine/core'
import { IconMapPin } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { prefList } from 'src/lib/const'

/**
 * @package
 */
export const PrefSelectBox = () => {
  // TODO: 状態を渡す必要あり
  const [prefId, setPrefId] = useState<string | null>(null)

  const selectboxList = prefList.map((pref) => {
    return { value: pref.id, label: pref.name }
  })

  const handleChange = (val: string) => {
    setPrefId(val)
    localStorage.setItem('prefId', val)
  }

  useEffect(() => {
    setPrefId(localStorage.getItem('prefId'))
  }, [])

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
        searchable
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
      <hr className='mx-2 mt-8 h-[1px] border-0 bg-dark-100' />
    </div>
  )
}
