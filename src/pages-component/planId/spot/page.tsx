import { TextInput } from '@mantine/core'
import { IconCamera, IconMap, IconMapPin } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { useRecoilValue } from 'recoil'
import { IconSelectBox } from './IconSelectBox'
import { ImageDropzone } from './ImageDropzone'
import { reducer, initialState } from './state'
import { ButtonWithLinkArea } from 'src/component/ButtonWithLinkArea'
import { Card } from 'src/component/Card'
import { ContentLabel } from 'src/component/ContentLabel'
import { Stepper } from 'src/component/Stepper'
import { useMediaQuery } from 'src/lib/mantine'
import { planIdState } from 'src/state/planId'
import { Step } from 'src/type/Step'

/**
 * @package
 */
export const Spot = () => {
  const router = useRouter()
  const mode = router.query.mode
  const planId = useRecoilValue(planIdState)
  const largerThanXs = useMediaQuery('xs')
  const largerThanMd = useMediaQuery('md')
  const [state, dispatch] = useReducer(reducer, initialState)

  // フォームの入力箇所までactiveを進める
  const updateActive = () => {
    const valList = [state.name, state.icon, state.image]
    const activeList: ('filled' | 'active' | 'blank')[] = [
      'active',
      'blank',
      'blank',
    ]
    // 未入力のフォーム以降は全てblank
    for (let i = 0; i < valList.length; i++) {
      // 対象のステップ要素が空のとき(=要素が空 & image以外 & icon以外またはimageが無い)
      if (!valList[i] && i !== 2 && (i !== 1 || !valList[2])) {
        break
      }
      activeList[i] = 'filled'
      activeList[i + 1] = 'active'
    }
    dispatch({ type: 'active', payload: { active: activeList } })
  }

  // 「mode=editの場合のマウント時」または「画像選択時」
  useEffect(() => {
    updateActive()
  }, [state.image])

  // Stepperの要素
  const stepList: Step[] = [
    {
      id: 0,
      icon: <IconMap size={largerThanMd ? 30 : 24} color='#495057' />,
      label: 'スポット名',
      text: '店名、観光地名、施設名など',
      children: (
        <TextInput
          placeholder='(例) 東京スカイツリー'
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
      icon: <IconCamera size={largerThanMd ? 30 : 24} color='#495057' />,
      label: 'アイコン or 写真',
      text: '両方を設定した場合は、写真が優先的に適用されます',
      longer: true,
      children: (
        <div>
          <IconSelectBox
            largerThanMd={largerThanMd}
            updateActive={updateActive}
            icon={state.icon}
            dispatch={dispatch}
          />
          <div className='mt-8 mb-1 text-center text-dark-300 xs:text-lg'>
            OR
          </div>
          <ImageDropzone
            image={state.image}
            dispatch={dispatch}
            handleStep={updateActive}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      {planId && typeof mode === 'string' ? (
        <div>
          <ContentLabel
            label={`スポット${mode === 'create' ? '登録' : '更新'}`}
            icon={<IconMapPin size={largerThanXs ? 44 : 36} color='#6466F1' />}
          />
          <Card fit>
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
          <div className='mt-20 text-center'>
            <ButtonWithLinkArea
              text={mode === 'create' ? '登録する' : '更新する'}
              onClick={() => console.log('click')}
              planId={planId}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
