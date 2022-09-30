import { Select } from '@mantine/core'
import { IconMapPin } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LinkTab } from './LinkTab'
import { ContentLabel } from 'src/component/ContentLabel'
import { getPath, prefList } from 'src/lib/const'
import { useMediaQuery } from 'src/lib/mantine'
import { planIdState } from 'src/state/planId'
import { prefIdState } from 'src/state/prefId'

/**
 * @package
 */
export const PrefSelectBox = () => {
  const router = useRouter()
  const largerThanXs = useMediaQuery('xs')
  const planId = useRecoilValue(planIdState)
  const [prefId, setPrefId] = useRecoilState(prefIdState)

  // セレクトボックス用に加工した都道府県データ
  const selectPrefList = prefList.map((pref) => {
    return { value: pref.id, label: pref.name }
  })

  // 都道府県を選択
  const handleChange = (value: string) => {
    setPrefId(value)
    localStorage.setItem('prefId', value)
    router.push({
      pathname: getPath('WEATHER', value),
      query: { plan_id: planId },
    })
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
        value={prefId}
        onChange={handleChange}
        transition='pop-top-left'
        transitionDuration={80}
        transitionTimingFunction='ease'
        classNames={{
          root: 'max-w-md xs:mx-auto mx-8 xxs:mx-12 mt-12 xxs:mt-8',
        }}
      />
      <LinkTab prefId={prefId} planId={planId} />
    </div>
  )
}
