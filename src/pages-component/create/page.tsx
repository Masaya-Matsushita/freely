import { PasswordInput, TextInput } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import {
  IconCalendar,
  IconCalendarMinus,
  IconKey,
  IconMap,
} from '@tabler/icons'
import { useRouter } from 'next/router'
import { useReducer } from 'react'
import { Notes } from './Notes'
import { reducer, initialState } from './state'
import { Card } from 'src/component/Card'
import { ContentLabel } from 'src/component/ContentLabel'
import { SimpleButton } from 'src/component/SimpleButton'
import { Stepper } from 'src/component/Stepper'
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
    const valList = [state.name, state.dateRange[0], state.password2]
    const activeList: ('filled' | 'active' | 'blank')[] = [
      'active',
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

  // Stepperの要素
  const stepList: Step[] = [
    {
      id: 0,
      icon: <IconMap size={largerThanMd ? 30 : 24} color='#495057' />,
      label: 'プラン名',
      text: '後から変更も可能です',
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
      icon: <IconCalendar size={largerThanMd ? 30 : 24} color='#495057' />,
      label: '日程を選択',
      text: '後から変更も可能です',
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
      icon: <IconKey size={largerThanMd ? 30 : 24} color='#495057' />,
      label: 'パスワード(任意)',
      text: '他のメンバーと共同で編集する場合のみ設定してください',
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
  ]

  return (
    <>
      <ContentLabel
        label='プラン作成'
        icon={
          <IconCalendarMinus size={largerThanXs ? 44 : 36} color='#6466F1' />
        }
      />
      <Card>
        {stepList.map((step) => {
          return (
            <Stepper
              key={step.id}
              active={state.active[step.id]}
              step={{
                id: step.id,
                icon: step.icon,
                label: step.label,
                text: step.text,
                longer: step.longer,
              }}
            >
              {step.children}
            </Stepper>
          )
        })}
      </Card>
      <div className='flex justify-center py-20'>
        <SimpleButton
          text='作成する'
          onClick={() => {
            router.push(getPath('PLAN', 'sample_id1'))
          }}
        />
      </div>
      <Notes />
    </>
  )
}
