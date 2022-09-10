import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconCamera, IconMap, IconMapPin } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useRecoilValue } from 'recoil'
import { IconSelectBox } from './IconSelectBox'
import { ImageDropzone } from './ImageDropzone'
import { ButtonWithLinkArea } from 'src/component/ButtonWithLinkArea'
import { Card } from 'src/component/Card'
import { ContentLabel } from 'src/component/ContentLabel'
import { PasswordModal } from 'src/component/PasswordModal'
import { Stepper } from 'src/component/Stepper'
import { failedAlert, successAlert, useMediaQuery } from 'src/lib/mantine'
import { planIdState } from 'src/state/planId'
import { Step } from 'src/type/Step'

type Icon = 'Spot' | 'Restaurant' | 'Souvenir' | 'Hotel' | null

/**
 * @package
 */
export type SpotValues = {
  spot_name: string
  icon: Icon
  image: string
}

/**
 * @package
 */
export const Spot = () => {
  const router = useRouter()
  const planId = useRecoilValue(planIdState)
  const spotId = router.query.spotId
  const catchError = useErrorHandler()
  const largerThanXs = useMediaQuery('xs')
  const largerThanMd = useMediaQuery('md')
  const [initValue, setInitValue] = useState(false)
  const [loading, setLoading] = useState(false)
  const [opened, { open, close }] = useDisclosure(false)
  const [active, setAcitive] = useState<('filled' | 'active' | 'blank')[]>([
    'active',
    'blank',
    'blank',
  ])

  // フォームの初期値、バリデーション
  const form = useForm<SpotValues>({
    initialValues: {
      spot_name: '',
      icon: null,
      image: '',
    },

    validate: {
      spot_name: (value) =>
        !value.length
          ? 'スポット名をご入力ください'
          : value.length > 40
          ? '40字以内でご設定ください'
          : null,

      icon: (value: Icon, values: SpotValues) =>
        !value && !values.image ? 'どちらか一方を設定してください' : null,
      image: (value, values) =>
        !value && !values.icon ? 'どちらか一方を設定してください' : null,
    },
  })

  // フォームの入力箇所までactiveを進める
  const updateActive = () => {
    const valList = [form.values.spot_name, form.values.icon, form.values.image]
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

  // spotIdがあるとき、データを取得しフォームの初期値へ代入
  const fetchSpotData = useCallback(async () => {
    if (planId && spotId) {
      const res = await fetch(`/api/spot?planId=${planId}&spotId=${spotId}`)
      form.setValues(await res.json())
      setInitValue(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId, spotId])

  useEffect(() => {
    fetchSpotData()
  }, [fetchSpotData])

  // 取得したspotのデータを初期値に設定時 & 画像選択時
  useEffect(() => {
    updateActive()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValue, form.values.image])

  // Stepperの要素
  const stepList: Step[] = [
    {
      id: 0,
      icon: <IconMap size={largerThanMd ? 30 : 24} color='#495057' />,
      label: 'スポット名',
      text: '店名、観光地名、施設名など',
      children: (
        <TextInput
          placeholder={`${spotId ? '' : '(例) 東京スカイツリー'}`}
          onBlur={updateActive}
          size={largerThanMd ? 'md' : 'sm'}
          classNames={{ input: 'max-w-xs md:max-w-sm' }}
          {...form.getInputProps('spot_name')}
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
          <div className='mt-8 mb-2 text-center text-dark-300 xs:text-lg'>
            OR
          </div>
          <ImageDropzone form={form} error={form.errors.image} />
        </div>
      ),
    },
  ]

  const handleError = () => {
    failedAlert('登録失敗', '入力内容をご確認ください')
  }

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true)
      // パスワードを取得
      const password = localStorage.getItem('password')
      // APIと通信
      const res = await fetch('/api/createSpot', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          password: password,
          plan_id: planId,
          spot_name: values.spot_name,
          icon: values.icon,
          image: values.image,
        }),
      })
      const json: boolean = await res.json()

      if (json === true) {
        // 成功
        successAlert('登録しました！')
        router.push(`/${planId}/plan`)
      } else if (json === false) {
        // パスワード認証に失敗
        open()
        setLoading(false)
      } else {
        // 通信エラー
        throw new Error(
          'サーバー側のエラーにより、スポットの登録に失敗しました',
        )
      }
    } catch (error) {
      catchError(error)
    }
  }

  return (
    <>
      {planId ? (
        <div>
          <PasswordModal opened={opened} closeModal={close} planId={planId} />
          <ContentLabel
            label={`スポット${spotId ? '更新' : '登録'}`}
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
                text={spotId ? '更新する' : '登録する'}
                type='submit'
                loading={loading}
              />
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}
