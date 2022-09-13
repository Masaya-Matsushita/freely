import { TextInput } from '@mantine/core'
import type { DateRangePickerValue } from '@mantine/dates'
import { DateRangePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendarMinus } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useRecoilValue } from 'recoil'
import { ButtonWithLinkArea } from 'src/component/ButtonWithLinkArea'
import { ContentLabel } from 'src/component/ContentLabel'
import { PasswordModal } from 'src/component/PasswordModal'
import { formatDate } from 'src/lib/func'
import { failedAlert, successAlert, useMediaQuery } from 'src/lib/mantine'
import { passwordState } from 'src/state/password'
import { planIdState } from 'src/state/planId'

type FormValues = {
  name: string
  dateRange: DateRangePickerValue
}

/**
 * @package
 */
export const Edit = () => {
  const router = useRouter()
  const planId = useRecoilValue(planIdState)
  const largerThanXs = useMediaQuery('xs')
  const catchError = useErrorHandler()
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const [fetchValue, setFetchValue] = useState(false)
  const password = useRecoilValue(passwordState)

  // フォームの初期値、バリデーション
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      dateRange: [null, null],
    },

    validate: {
      name: (value) =>
        !value.length
          ? 'プラン名をご入力ください'
          : value.length > 40
          ? '40字以内でご設定ください'
          : null,
      dateRange: (value) =>
        !value[0] || !value[1] ? '日程をご選択ください' : null,
    },
  })

  // データを取得し、フォームの初期値へ代入
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        if (form && planId) {
          setFetchValue(true)
          const res = await fetch(`/api/plan?planId=${planId}`)
          const json = await res.json()
          form.setFieldValue('name', json[0].plan_name)
          setFetchValue(false)
        }
      } catch (error) {
        catchError(error)
      }
    }
    fetchPlanData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId, catchError])

  // プランを更新
  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true)
      // 入力値を加工
      const startDate = formatDate(values.dateRange[0])
      const endDate = formatDate(values.dateRange[1])

      // APIと通信
      const res = await fetch('/api/updatePlan', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          password: password,
          plan_id: planId,
          plan_name: values.name,
          start_date: startDate,
          end_date: endDate,
        }),
      })
      const json: boolean = await res.json()

      if (json === true) {
        // 成功
        successAlert('更新しました！')
        router.push(`/${planId}/plan`)
      } else if (json === false) {
        // パスワード認証に失敗
        open()
        setLoading(false)
      } else {
        // 通信エラー
        throw new Error('サーバー側のエラーにより、プランの更新に失敗しました')
      }
    } catch (error) {
      catchError(error)
    }
  }

  // フォームの入力が不十分のとき
  const handleError = () => {
    failedAlert('作成失敗', '入力内容をご確認ください')
  }

  return (
    <>
      {planId ? (
        <div>
          <ContentLabel
            label='プランを更新'
            icon={
              <IconCalendarMinus
                size={largerThanXs ? 44 : 36}
                color='#6466F1'
              />
            }
          />
          <div className='flex justify-center'>
            <form
              onSubmit={form.onSubmit(handleSubmit, handleError)}
              className='mx-6 mt-12 max-w-md flex-1 rounded-lg bg-white px-6 pt-10 pb-4 shadow shadow-dark-100 xs:px-8 xs:pt-12'
            >
              <TextInput
                label='プラン名'
                placeholder={`${fetchValue ? '取得中...' : ''}`}
                size='md'
                disabled={fetchValue}
                {...form.getInputProps('name')}
              />
              <DateRangePicker
                label='日程'
                locale='ja'
                placeholder={`${fetchValue ? '取得中...' : '日付を選択'}`}
                firstDayOfWeek='sunday'
                inputFormat='YYYY/MM/DD'
                labelFormat='YYYY/MM'
                size='md'
                disabled={fetchValue}
                className='mt-3 xs:mt-4'
                {...form.getInputProps('dateRange')}
              />
              <div className='mt-12 xs:mt-14'>
                <ButtonWithLinkArea
                  text='更新'
                  type='submit'
                  planId={planId}
                  loading={loading}
                  disabled={fetchValue}
                  narrow
                />
              </div>
            </form>
          </div>
          <PasswordModal opened={opened} closeModal={close} planId={planId} />
        </div>
      ) : null}
    </>
  )
}
