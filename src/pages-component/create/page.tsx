import { PasswordInput, TextInput } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import type { DateRangePickerValue } from '@mantine/dates'
import { IconCalendarMinus, IconMail } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ContentLabel } from 'src/component/ContentLabel'
import { SimpleButton } from 'src/component/SimpleButton'
import { StepperCard } from 'src/component/StepperCard'
import { getPath } from 'src/lib/const'
import { useMediaQuery } from 'src/lib/mantine'
import 'dayjs/locale/ja'

/**
 * @package
 */
export const Create = () => {
  const router = useRouter()
  const [active, setActive] = useState([false, false, false, false])
  const [planName, setPlanName] = useState('')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([null, null])
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const largerThanXs = useMediaQuery('xs')
  const largerThanMd = useMediaQuery('md')

  // フォームの入力状況からactiveの値を判断
  const handleBlur = () => {
    const valList = [planName, dateRange[0], password2, email]
    const activeList = [false, false, false, false]
    // 未入力のフォーム以降は全てfalse
    for (let i = 0; i < valList.length; i++) {
      if (!valList[i]) {
        break
      }
      activeList[i] = true
    }
    setActive(activeList)
  }

  const STEPS = [
    {
      id: 0,
      text: '旅行のテーマを入力してください',
      children: (
        <TextInput
          placeholder='(例) 3泊4日で東京観光！'
          value={planName}
          onChange={(e) => setPlanName(e.currentTarget.value)}
          onBlur={handleBlur}
          size={largerThanMd ? 'md' : 'sm'}
          classNames={{ input: 'max-w-xs md:max-w-sm' }}
        />
      ),
    },
    {
      id: 1,
      text: '日程を選択してください',
      children: (
        <DateRangePicker
          locale='ja'
          placeholder='日付を選択'
          value={dateRange}
          onChange={setDateRange}
          onBlur={handleBlur}
          firstDayOfWeek='sunday'
          inputFormat='YYYY/MM/DD'
          labelFormat='YYYY/MM'
          size={largerThanMd ? 'md' : 'sm'}
          classNames={{ input: 'max-w-xs md:max-w-sm' }}
        />
      ),
    },
    {
      id: 2,
      text: '共有パスワードを設定してください',
      children: (
        <div>
          <PasswordInput
            placeholder='半角英数6~20文字'
            value={password1}
            onChange={(e) => setPassword1(e.currentTarget.value)}
            size={largerThanMd ? 'md' : 'sm'}
            classNames={{
              visibilityToggle: 'hidden',
              input: 'max-w-xs md:max-w-sm',
            }}
          />
          <PasswordInput
            placeholder='再度入力してください'
            value={password2}
            onChange={(e) => setPassword2(e.currentTarget.value)}
            onBlur={handleBlur}
            size={largerThanMd ? 'md' : 'sm'}
            classNames={{
              visibilityToggle: 'hidden',
              input: 'mt-2 max-w-xs md:max-w-sm md:mt-3',
            }}
          />
        </div>
      ),
    },
    {
      id: 3,
      text: 'メールアドレスを登録すると、共有パスワードを忘れた際に再設定できます(任意)',
      label: 'Option',
      icon: <IconMail size={28} color='#495057' />,
      children: (
        <TextInput
          placeholder='example@mail.com'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          onBlur={handleBlur}
          size={largerThanMd ? 'md' : 'sm'}
          classNames={{ input: 'max-w-xs md:max-w-sm' }}
        />
      ),
    },
  ]

  return (
    <>
      <ContentLabel
        label='プラン作成'
        icon={
          <IconCalendarMinus size={largerThanXs ? 44 : 36} color='#6466F1' />
        }
      />
      <StepperCard active={active} stepList={STEPS} />
      <div className='flex justify-center py-20'>
        <SimpleButton
          text='作成する'
          onClick={() => {
            router.push({
              pathname: getPath('PLAN'),
              query: { plan: 'sample_id1' },
            })
          }}
        />
      </div>
    </>
  )
}
