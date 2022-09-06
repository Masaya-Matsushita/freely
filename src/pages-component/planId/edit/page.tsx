import { TextInput } from '@mantine/core'
import type { DateRangePickerValue } from '@mantine/dates'
import { DateRangePicker } from '@mantine/dates'
import { IconCalendarMinus } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ButtonWithLinkArea } from 'src/component/ButtonWithLinkArea'
import { ContentLabel } from 'src/component/ContentLabel'
import { useMediaQuery } from 'src/lib/mantine'

/**
 * @package
 */
export const Edit = () => {
  const router = useRouter()
  const planId = router.query.planId
  const largerThanXs = useMediaQuery('xs')
  const [name, setName] = useState('')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([null, null])

  return (
    <>
      {typeof planId === 'string' ? (
        <div>
          <ContentLabel
            label='プランを更新'
            icon={
              <IconCalendarMinus
                size={largerThanXs ? 44 : 36}
                color='#6466F1'
              />
            }
          />
          <div className='flex justify-center'>
            <div className='mx-6 mt-12 max-w-md flex-1 rounded-lg bg-white px-6 pt-10 pb-4 shadow shadow-dark-100 xs:px-8 xs:pt-12'>
              <TextInput
                label='プラン名'
                placeholder='東京観光'
                value={name}
                size='md'
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <DateRangePicker
                label='日程'
                locale='ja'
                placeholder='日付を選択'
                value={dateRange}
                onChange={setDateRange}
                firstDayOfWeek='sunday'
                inputFormat='YYYY/MM/DD'
                labelFormat='YYYY/MM'
                size='md'
                className='mt-3 xs:mt-4'
              />
              <div className='mt-12 xs:mt-14'>
                <ButtonWithLinkArea
                  text='更新'
                  onClick={() => console.log('click')}
                  planId={planId}
                  low
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
