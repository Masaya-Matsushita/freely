import { Select } from '@mantine/core'
import { IconMapPin } from '@tabler/icons'
import { FC, useEffect, useState } from 'react'
import { Weather } from './Weather'
import { prefList } from 'src/lib/const'
import { WeatherObj } from 'src/type/WeatherObj'

/**
 * @package
 */
export const PrefNews: FC<{ weatherData: WeatherObj }> = (props) => {
  const [prefId, setPrefId] = useState<string | null>(null)

  const selectboxData = prefList.map((pref) => {
    return { value: String(pref.id), label: pref.name }
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
      <Select
        data={selectboxData}
        placeholder='選択する'
        label='都道府県名'
        description='天気やコロナ情報などを自動で取得します。'
        searchable
        clearable
        icon={<IconMapPin size={20} />}
        value={prefId}
        onChange={handleChange}
        transition='pop-top-left'
        transitionDuration={80}
        transitionTimingFunction='ease'
        withAsterisk
        classNames={{ root: 'w-96 mt-12 ml-20' }}
      />
      <Weather data={props.weatherData} prefId={prefId} />
      {/* <Covid19 /> */}
      {/* <Sake /> */}
    </div>
  )
}
