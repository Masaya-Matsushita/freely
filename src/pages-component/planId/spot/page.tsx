import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCamera, IconMap, IconMapPin } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { IconSelectBox } from './IconSelectBox'
import { ImageDropzone } from './ImageDropzone'
import { ButtonWithLinkArea } from 'src/component/ButtonWithLinkArea'
import { Card } from 'src/component/Card'
import { ContentLabel } from 'src/component/ContentLabel'
import { Stepper } from 'src/component/Stepper'
import { useMediaQuery } from 'src/lib/mantine'
import { planIdState } from 'src/state/planId'
import { Step } from 'src/type/Step'

type Icon = 'Spot' | 'Restaurant' | 'Souvenir' | 'Hotel' | null

/**
 * @package
 */
export type FormValues = {
  name: string
  icon: Icon
  image: string
}

/**
 * @package
 */
export const Spot = () => {
  const router = useRouter()
  const mode = router.query.mode
  const planId = useRecoilValue(planIdState)
  const largerThanXs = useMediaQuery('xs')
  const largerThanMd = useMediaQuery('md')
  const [active, setAcitive] = useState<('filled' | 'active' | 'blank')[]>([
    'active',
    'blank',
    'blank',
  ])

  // フォームの初期値、バリデーション
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      icon: null,
      image: '',
    },

    validate: {
      name: (value) =>
        !value.length
          ? 'スポット名をご入力ください'
          : value.length > 40
          ? '40字以内でご設定ください'
          : null,

      icon: (value: Icon, values: FormValues) =>
        !value && !values.image
          ? 'アイコンか写真のどちらか一方を設定してください'
          : null,
      image: (value, values) =>
        !value && !values.icon
          ? 'アイコンか写真のどちらか一方を設定してください'
          : null,
    },
  })

  // フォームの入力箇所までactiveを進める
  const updateActive = () => {
    const valList = [form.values.name, form.values.icon, form.values.image]
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
    setAcitive(activeList)
  }

  // 「mode=editの場合のマウント時」または「画像選択時」
  useEffect(() => {
    updateActive()
  }, [form.values.image])

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
          onBlur={updateActive}
          size={largerThanMd ? 'md' : 'sm'}
          classNames={{ input: 'max-w-xs md:max-w-sm' }}
          {...form.getInputProps('name')}
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
            form={form}
            largerThanMd={largerThanMd}
            updateActive={updateActive}
          />
          <div className='mt-8 mb-1 text-center text-dark-300 xs:text-lg'>
            OR
          </div>
          <ImageDropzone
            form={form}
            handleStep={updateActive}
            error={form.errors.image}
          />
        </div>
      ),
    },
  ]

  const handleError = () => {
    console.log('失敗しました。入力値をご確認ください。')
  }

  const handleSubmit = (values: typeof form.values) => {
    console.log(values)
  }

  return (
    <>
      {planId && typeof mode === 'string' ? (
        <div>
          <ContentLabel
            label={`スポット${mode === 'create' ? '登録' : '更新'}`}
            icon={<IconMapPin size={largerThanXs ? 44 : 36} color='#6466F1' />}
          />
          <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
            <Card fit>
              {stepList.map((step) => {
                return (
                  <Stepper
                    key={step.id}
                    active={active[step.id]}
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
                planId={planId}
                text={mode === 'create' ? '登録する' : '更新する'}
                type='submit'
              />
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}
