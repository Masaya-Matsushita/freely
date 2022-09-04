import { PasswordInput, TextInput } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { IconCalendarMinus, IconMail } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useReducer } from 'react'
import { Notes } from './Notes'
import { reducer, initialState } from './state'
import { ContentLabel } from 'src/component/ContentLabel'
import { SimpleButton } from 'src/component/SimpleButton'
import { StepperCard } from 'src/component/StepperCard'
import { getPath } from 'src/lib/const'
import { useMediaQuery } from 'src/lib/mantine'
import 'dayjs/locale/ja'
import { Step } from 'src/type/Step'

/**
 * @package
 */
export const Create = () => {
  const router = useRouter()
  const largerThanXs = useMediaQuery('xs')
  const largerThanMd = useMediaQuery('md')
  const [state, dispatch] = useReducer(reducer, initialState)

  // フォームの入力箇所までactiveを進める
  const updateActive = () => {
    const valList = [
      state.name,
      state.dateRange[0],
      state.password2,
      state.email,
    ]
    const activeList: ('filled' | 'active' | 'blank')[] = [
      'active',
      'blank',
      'blank',
      'blank',
    ]
    // 未入力のフォーム以降は全てblank
    for (let i = 0; i < valList.length; i++) {
      if (!valList[i]) {
        break
      }
      activeList[i] = 'filled'
      activeList[i + 1] = 'active'
    }
    dispatch({ type: 'active', payload: { active: activeList } })
  }

  const stepList: Step[] = [
    {
      id: 0,
      text: '旅行のテーマを入力してください',
      children: (
        <TextInput
          placeholder='(例) 3泊4日で東京観光！'
          value={state.name}
          onChange={(e) =>
            dispatch({ type: 'name', payload: { name: e.currentTarget.value } })
          }
          onBlur={updateActive}
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
          value={state.dateRange}
          onChange={(e) =>
            dispatch({
              type: 'dateRange',
              payload: { dateRange: [e[0], e[1]] },
            })
          }
          onBlur={updateActive}
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
            value={state.password1}
            onChange={(e) =>
              dispatch({
                type: 'password1',
                payload: { password1: e.currentTarget.value },
              })
            }
            size={largerThanMd ? 'md' : 'sm'}
            classNames={{
              visibilityToggle: 'hidden',
              input: 'max-w-xs md:max-w-sm',
            }}
          />
          <PasswordInput
            placeholder='再度入力してください'
            value={state.password2}
            onChange={(e) =>
              dispatch({
                type: 'password2',
                payload: { password2: e.currentTarget.value },
              })
            }
            onBlur={updateActive}
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
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: 'email',
              payload: { email: e.currentTarget.value },
            })
          }
          onBlur={updateActive}
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
      <StepperCard
        label='簡単ステップで作成'
        active={state.active}
        stepList={stepList}
      />
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
      <Notes />
    </>
  )
}
