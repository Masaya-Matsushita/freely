import { NativeSelect } from '@mantine/core'
import { IconChevronDown, IconMapPin } from '@tabler/icons'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Covid19 } from './Covid19'
import { Sake } from './Sake'
import { Weather } from './Weather'
import { prefList } from 'src/lib/const'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const PrefNews: FC<{ weatherData: WeatherObj }> = (props) => {
  const [prefName, setPrefName] = useState('')
  const [prefId, setPrefId] = useState<number | undefined>()

  useEffect(() => {
    const strPrefId = localStorage.getItem('pref')
    if (strPrefId) {
      const numPrefId = Number(strPrefId)
      const selectedPref = prefList.filter((pref) => {
        return numPrefId === pref.id
      })
      setPrefName(selectedPref[0].name)
      setPrefId(numPrefId)
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPref = prefList.filter((pref) => {
      return e.currentTarget.value === pref.name
    })
    setPrefName(selectedPref[0].name)
    setPrefId(selectedPref[0].id)
    localStorage.setItem('pref', String(selectedPref[0].id))
  }

  return (
    <div>
      <NativeSelect
        data={prefList.map((pref) => pref.name)}
        placeholder='選択する'
        label='都道府県名'
        description='天気やコロナ情報などを自動で取得します。'
        icon={<IconMapPin size={20} />}
        rightSection={<IconChevronDown size={14} />}
        rightSectionWidth={40}
        value={prefName}
        onChange={handleChange}
        withAsterisk
        classNames={{ root: 'w-96 mt-12 ml-20' }}
      />
      <Weather data={props.weatherData} prefId={prefId} />
      {/* <Covid19 /> */}
      {/* <Sake /> */}
    </div>
  )
}
