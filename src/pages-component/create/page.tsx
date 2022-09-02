import { Paper, PasswordInput, TextInput } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import type { DateRangePickerValue } from '@mantine/dates'
import { IconCheck, IconMail } from '@tabler/icons'
import { useRouter } from 'next/router'
import { FC, ReactNode, useState } from 'react'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'
import 'dayjs/locale/ja'

/**
 * @package
 */
export const Create = () => {
  const router = useRouter()
  const [active, setActive] = useState(1)
  const [planName, setPlanName] = useState('')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([null, null])
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')

  return (
    <>
      <Paper shadow='xs' radius='md' p='md' className='mx-4'>
        <div className='my-8'>簡単ステップで作成</div>
        <Step active={active} number={1} text='旅行のテーマを入力してください'>
          <TextInput
            placeholder='(例) 3泊4日で東京観光！'
            value={planName}
            onChange={(e) => setPlanName(e.currentTarget.value)}
            classNames={{ input: 'h-10' }}
          />
        </Step>
        <Step active={active} number={2} text='日程を選択してください'>
          <DateRangePicker
            locale='ja'
            placeholder='日付を選択'
            value={dateRange}
            onChange={setDateRange}
            firstDayOfWeek='sunday'
            inputFormat='YYYY/MM/DD'
            labelFormat='YYYY/MM'
          />
        </Step>
        <Step
          active={active}
          number={3}
          text='共有パスワードを設定してください'
        >
          <PasswordInput
            placeholder='半角英数6~20文字'
            value={password1}
            onChange={(e) => setPassword1(e.currentTarget.value)}
            classNames={{ visibilityToggle: 'hidden' }}
          />
          <PasswordInput
            placeholder='再度入力してください'
            value={password2}
            onChange={(e) => setPassword2(e.currentTarget.value)}
            classNames={{ visibilityToggle: 'hidden', input: 'mt-2' }}
          />
        </Step>
        <Step
          active={active}
          number={4}
          text='メールアドレスを登録すると、共有パスワ
ードを忘れた際に再設定できます(任意)'
          icon={<IconMail size={28} color='#495057' />}
        >
          <TextInput
            placeholder='example@mail.com'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            classNames={{ input: 'h-10' }}
          />
        </Step>
      </Paper>
      <div className='mt-20 flex justify-center'>
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

const Step: FC<{
  active: number
  number: number
  text: string
  children: ReactNode
  icon?: ReactNode
}> = (props) => {
  const num = props.number

  return (
    <div className='mt-2 flex items-start gap-6'>
      <div className='flex flex-col items-center gap-2'>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            props.active === num ? 'border-solid border-main-500' : null
          } ${props.active > num ? 'bg-main-500' : 'bg-main-300'}`}
        >
          {props.active > num ? (
            <IconCheck color='#fff' size={32} />
          ) : (
            <div>
              {props.icon ? (
                <div className='flex items-center justify-center'>
                  {props.icon}
                </div>
              ) : (
                <div className='text-2xl font-bold text-dark-500'>{num}</div>
              )}
            </div>
          )}
        </div>
        <div
          className={`h-48 w-[2px] rounded-sm ${
            props.active > num ? 'bg-main-500' : 'bg-main-300'
          }`}
        ></div>
      </div>
      <div className='flex flex-1 flex-col gap-1'>
        <div className='text-xl font-bold tracking-wide text-dark-500'>
          Step {num}
        </div>
        <div className='mb-4 text-sm text-dark-300'>{props.text}</div>
        {props.children}
      </div>
    </div>
  )
}
