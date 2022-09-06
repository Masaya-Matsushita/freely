import { Select } from '@mantine/core'
import { IconMapPin } from '@tabler/icons'
import { Dispatch, FC, SetStateAction } from 'react'
import { LinkTab } from './LinkTab'
import { ContentLabel } from 'src/component/ContentLabel'
import { prefList } from 'src/lib/const'
import { useMediaQuery } from 'src/lib/mantine'

type Props = {
  prefId: string
  setPrefId: Dispatch<SetStateAction<string>>
}

/**
 * @package
 */
export const PrefSelectBox: FC<Props> = (props) => {
  const largerThanXs = useMediaQuery('xs')

  // セレクトボックス用に加工した都道府県データ
  const selectPrefList = prefList.map((pref) => {
    return { value: pref.id, label: pref.name }
  })

  // 都道府県を選択
  const handleChange = (value: string) => {
    props.setPrefId(value)
    localStorage.setItem('prefId', value)
  }

  return (
    <div>
      <ContentLabel
        label='旅先の情報'
        icon={<IconMapPin size={largerThanXs ? 44 : 36} color='#6466F1' />}
      />
      <Select
        data={selectPrefList}
        label='都道府県名'
        value={props.prefId}
        onChange={handleChange}
        transition='pop-top-left'
        transitionDuration={80}
        transitionTimingFunction='ease'
        classNames={{
          root: 'max-w-md xs:mx-auto mx-8 xxs:mx-12 mt-12 xxs:mt-8',
        }}
      />
      <LinkTab />
    </div>
  )
}
