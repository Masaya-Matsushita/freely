import { TextInput } from '@mantine/core'
import { IconCamera, IconMapPin, IconUnlink } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { IconSelectBox } from './IconSelectBox'
import { reducer, initialState } from './state'
import { ButtonWithLinkArea } from 'src/component/ButtonWithLinkArea'
import { ContentLabel } from 'src/component/ContentLabel'
import { StepperCard } from 'src/component/StepperCard'
import { useMediaQuery } from 'src/lib/mantine'
import { Step } from 'src/type/Step'
import { ImageDropzone } from './ImageDropzone'

/**
 * @package
 */
export const Spot = () => {
  const router = useRouter()
  const mode = router.query.mode
  const planId = router.query.plan
  const largerThanXs = useMediaQuery('xs')
  const largerThanMd = useMediaQuery('md')
  const [state, dispatch] = useReducer(reducer, initialState)

  // フォームの入力状況からactiveの値を判断
  const handleBlur = () => {
    const valList = [state.name, state.icon, state.image, state.url]
    const activeList: ('filled' | 'active' | 'blank')[] = [
      'active',
      'blank',
      'blank',
    ]
    // 未入力のフォーム以降は全てblank
    for (let i = 0; i < valList.length; i++) {
      if (!valList[i]) {
        if (i === 1) {
          if (valList[i + 1]) {
          } else {
            break
          }
        } else {
          break
        }
      }
      activeList[i] = 'filled'
      activeList[i + 1] = 'active'
    }
    dispatch({ type: 'active', payload: { active: activeList } })
  }

  // 更新の場合、入力箇所までactiveを進める
  useEffect(() => {
    handleBlur()
  }, [])

  const stepList: Step[] = [
    {
      id: 0,
      text: `${
        mode === 'create'
          ? 'スポット名を入力してください'
          : '店名、観光地名、施設名など'
      }`,
      label: `${mode === 'create' ? '' : 'スポット名'}`,
      icon: <IconMapPin size={30} color='#495057' />,
      children: (
        <TextInput
          placeholder='(例) 東京スカイツリー'
          value={state.name}
          onChange={(e) =>
            dispatch({ type: 'name', payload: { name: e.currentTarget.value } })
          }
          onBlur={handleBlur}
          size={largerThanMd ? 'md' : 'sm'}
          classNames={{ input: 'max-w-xs md:max-w-sm' }}
        />
      ),
    },
    {
      id: 1,
      text: `${
        String(mode) === 'create'
          ? 'アイコン or 写真を設定してください（両方を設定した場合は、写真が優先的に適用されます）'
          : '両方を設定した場合は、写真が優先的に適用されます'
      }`,
      label: `${mode === 'create' ? '' : 'アイコン or 写真'}`,
      icon: <IconCamera size={28} color='#495057' />,
      longer: true,
      children: (
        <IconSelectBox
          largerThanMd={largerThanMd}
          handleBlur={handleBlur}
          icon={state.icon}
          dispatch={dispatch}
        />
      ),
    },
    {
      id: 2,
      text: 'スポットのURLを設定すると便利です(任意)',
      label: 'Option',
      icon: <IconUnlink size={28} color='#495057' />,
      children: (
        <TextInput
          placeholder='(例) https://www.tokyo-skytree.jp'
          value={state.url}
          onChange={(e) =>
            dispatch({ type: 'url', payload: { url: e.currentTarget.value } })
          }
          onBlur={handleBlur}
          size={largerThanMd ? 'md' : 'sm'}
          classNames={{ input: 'max-w-xs md:max-w-sm' }}
        />
      ),
    },
  ]

  return (
    <>
      {typeof mode === 'string' && typeof planId === 'string' ? (
        <div>
          <ImageDropzone />
          {/* <ContentLabel
            label={`スポット${mode === 'create' ? '登録' : '更新'}`}
            icon={<IconMapPin size={largerThanXs ? 44 : 36} color='#6466F1' />}
          />
          <StepperCard active={state.active} stepList={stepList} />
          <div className='mt-20 text-center'>
            <ButtonWithLinkArea
              text={mode === 'create' ? '登録する' : '更新する'}
              onClick={() => console.log('click')}
              planId={planId}
            />
          </div> */}
        </div>
      ) : null}
    </>
  )
}
