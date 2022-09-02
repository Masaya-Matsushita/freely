import { Paper, PasswordInput, TextInput } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import type { DateRangePickerValue } from '@mantine/dates'
import { IconCalendarMinus, IconCheck, IconMail } from '@tabler/icons'
import { useRouter } from 'next/router'
import { FC, ReactNode, useState } from 'react'
import { ContentLabel } from 'src/component/ContentLabel'
import { SimpleButton } from 'src/component/SimpleButton'
import { getPath } from 'src/lib/const'
import 'dayjs/locale/ja'
import { useMediaQuery } from 'src/lib/mantine'

/**
 * @package
 */
export const Create = () => {
  const router = useRouter()
  const [active, setActive] = useState(2)
  const [planName, setPlanName] = useState('')
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([null, null])
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const largerThanXs = useMediaQuery('xs')
  const largerThanMd = useMediaQuery('md')

  return (
    <>
      <ContentLabel
        label='プラン作成'
        icon={
          <IconCalendarMinus size={largerThanXs ? 44 : 36} color='#6466F1' />
        }
      />
      <Paper
        shadow='xs'
        radius='lg'
        p='md'
        className='mx-4 mt-12 pt-8 pb-20 xs:mx-auto xs:mt-20 xs:w-[550px] xs:pt-12 xs:pb-28 md:w-[650px] md:pt-16'
      >
        <div className='mx-auto mb-12 max-w-[450px] xs:text-lg md:mb-16 md:max-w-[550px]'>
          簡単ステップで作成
        </div>
        <Step active={active} number={1} text='旅行のテーマを入力してください'>
          <TextInput
            placeholder='(例) 3泊4日で東京観光！'
            value={planName}
            onChange={(e) => setPlanName(e.currentTarget.value)}
            size={largerThanMd ? 'md' : 'sm'}
            classNames={{ input: 'max-w-xs md:max-w-sm' }}
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
            size={largerThanMd ? 'md' : 'sm'}
            classNames={{ input: 'max-w-xs md:max-w-sm' }}
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
            size={largerThanMd ? 'md' : 'sm'}
            classNames={{
              visibilityToggle: 'hidden',
              input: 'mt-2 max-w-xs md:max-w-sm md:mt-3',
            }}
          />
        </Step>
        <Step
          active={active}
          number={4}
          text='メールアドレスを登録すると、共有パスワードを忘れた際に再設定できます(任意)'
          label='Option'
          icon={<IconMail size={28} color='#495057' />}
        >
          <TextInput
            placeholder='example@mail.com'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            size={largerThanMd ? 'md' : 'sm'}
            classNames={{ input: 'max-w-xs md:max-w-sm' }}
          />
        </Step>
      </Paper>
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

const Step: FC<{
  active: number
  number: number
  text: string
  children: ReactNode
  label?: string
  icon?: ReactNode
}> = (props) => {
  const num = props.number

  return (
    <div className='mt-2 flex items-start justify-center gap-2 xxs:gap-4 md:mt-6 md:gap-10'>
      <div className='flex flex-col items-center gap-2 md:gap-4'>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full xxs:h-14 xxs:w-14 md:h-16 md:w-16 ${
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
                <div className='text-xl font-bold text-dark-500 xxs:text-2xl'>
                  {num}
                </div>
              )}
            </div>
          )}
        </div>
        <div
          className={`h-40 w-[2px] rounded-sm xs:h-48 md:h-52 md:w-[3px] ${
            props.active > num ? 'bg-main-400' : 'bg-main-300'
          }`}
        ></div>
      </div>
      <div className='flex max-w-xs flex-1 flex-col gap-1 md:max-w-sm md:gap-2'>
        <div className='text-xl font-bold tracking-wide text-dark-500 md:text-2xl'>
          {props.label ? `${props.label}` : `Step ${num}`}
        </div>
        <div className='mb-4 text-sm text-dark-300 md:mb-6 md:text-base'>
          {props.text}
        </div>
        {props.children}
      </div>
    </div>
  )
}
