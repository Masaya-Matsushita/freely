import { TextInput } from '@mantine/core'
import type { DateRangePickerValue } from '@mantine/dates'
import { DateRangePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendarMinus } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useRecoilValue } from 'recoil'
import { ButtonWithLinkArea } from 'src/component/ButtonWithLinkArea'
import { ContentLabel } from 'src/component/ContentLabel'
import { PasswordModal } from 'src/component/PasswordModal'
import { formatDate } from 'src/lib/const'
import { failedAlert, successAlert, useMediaQuery } from 'src/lib/mantine'
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

  // フォームの入力が不十分のとき
  const handleError = () => {
    failedAlert('作成失敗', '入力内容をご確認ください')
  }

  // プランを更新
  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true)
      // 入力値を加工
      const startDate = formatDate(values.dateRange[0])
      // TODO: date型にする
      const endDate = formatDate(values.dateRange[1])
      const password = localStorage.getItem('password')

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
        successAlert('登録しました！')
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

  return (
    <>
      {planId ? (
        <div>
          <PasswordModal opened={opened} closeModal={close} planId={planId} />
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
                placeholder='東京観光'
                size='md'
                {...form.getInputProps('name')}
              />
              <DateRangePicker
                label='日程'
                locale='ja'
                placeholder='日付を選択'
                firstDayOfWeek='sunday'
                inputFormat='YYYY/MM/DD'
                labelFormat='YYYY/MM'
                size='md'
                className='mt-3 xs:mt-4'
                {...form.getInputProps('dateRange')}
              />
              <div className='mt-12 xs:mt-14'>
                <ButtonWithLinkArea
                  text='更新'
                  onClick={() => console.log('click')}
                  planId={planId}
                  loading={loading}
                  low
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}
