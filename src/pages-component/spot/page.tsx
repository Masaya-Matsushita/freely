import { TextInput, Select } from '@mantine/core'
import { IconMapPin, IconUnlink } from '@tabler/icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useReducer, forwardRef } from 'react'
import { reducer, initialState, Icon } from './state'
import { ContentLabel } from 'src/component/ContentLabel'
import { StepperCard } from 'src/component/StepperCard'
import { useMediaQuery } from 'src/lib/mantine'
import 'dayjs/locale/ja'

type ItemProps = React.ComponentPropsWithoutRef<'div'> & {
  id: string
  image: string
  label: string
  description: string
}

const ICON_LIST = [
  {
    id: 'Spot',
    image: '/SpotIcon.svg',
    label: '観光',
    value: 'Spot',
    description: '史跡、娯楽、体験など',
  },

  {
    id: 'Restaurant',
    image: '/RestaurantIcon.svg',
    label: '食事',
    value: 'Restaurant',
    description: 'グルメ、カフェなど',
  },
  {
    id: 'Souvenir',
    image: '/SouvenirIcon.svg',
    label: '買い物',
    value: 'Souvenir',
    description: 'お土産、ショッピングなど',
  },
  {
    id: 'Hotel',
    image: '/HotelIcon.svg',
    label: '宿泊',
    value: 'Hotel',
    description: '旅館、ホテルなど',
  },
]

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <div className='flex items-center gap-4 py-1'>
        <Image src={image} alt='' height='25px' width='25px' />
        <div>
          <div className='text-base text-dark-500'>{label}</div>
          <div className='text-sm text-dark-300'>{description}</div>
        </div>
      </div>
    </div>
  ),
)

/**
 * @package
 */
export const Spot = () => {
  const router = useRouter()
  const mode = router.query.mode
  const largerThanXs = useMediaQuery('xs')
  const largerThanMd = useMediaQuery('md')
  const [state, dispatch] = useReducer(reducer, initialState)

  if (typeof mode !== 'string') {
    return
  }

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

  const STEPS = [
    {
      id: 0,
      text: `${
        mode === 'create'
          ? 'スポット名を入力してください'
          : '店名、観光地名、施設名など'
      }`,
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
        mode === 'create'
          ? 'アイコンor写真を設定してください。(両方を設定した場合は、写真が優先的に適用されます)'
          : '両方を設定した場合は、写真が優先的に適用されます'
      }`,
      children: (
        <Select
          placeholder='アイコンを選択'
          itemComponent={SelectItem}
          data={ICON_LIST}
          clearable
          value={state.icon}
          onChange={(e: Icon) =>
            dispatch({ type: 'icon', payload: { icon: e } })
          }
          onBlur={handleBlur}
          filter={(value, item) => item.id === value}
          maxDropdownHeight={400}
          size={largerThanMd ? 'md' : 'sm'}
          classNames={{ input: 'max-w-xs md:max-w-sm' }}
          styles={(theme) => ({
            item: {
              '&[data-selected]': {
                '&, &:hover': {
                  backgroundColor: theme.colors.indigo[1],
                  color: theme.colors.indigo[9],
                },
              },
            },
          })}
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
      <div>
        <ContentLabel
          label={`スポット${mode === 'create' ? '登録' : '更新'}`}
          icon={<IconMapPin size={largerThanXs ? 44 : 36} color='#6466F1' />}
        />
        <StepperCard active={state.active} stepList={STEPS} />
      </div>
    </>
  )
}
