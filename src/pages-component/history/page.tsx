import { UnstyledButton } from '@mantine/core'
import { IconClock } from '@tabler/icons'
import { ContentLabel } from 'src/component/ContentLabel'
import { DateRange } from 'src/component/DateRange'
import { useMediaQuery } from 'src/lib/mantine'

/**
 * @package
 */
export const History = () => {
  const largerThanXs = useMediaQuery('xs')

  const planList = [
    {
      planId: 'foo',
      name: '東京観光',
      startDate: '2022/09/10',
      endDate: '2022/09/14',
      timestamp: '2022/09/04',
    },
    {
      planId: 'bar',
      name: '東京観光',
      startDate: '2022/09/10',
      endDate: '2022/09/14',
      timestamp: '2022/09/04',
    },
    {
      planId: 'baz',
      name: '東京観光',
      startDate: '2022/09/10',
      endDate: '2022/09/14',
      timestamp: '2022/09/04',
    },
  ]

  return (
    <>
      <div>
        <ContentLabel
          label='履歴'
          icon={<IconClock size={largerThanXs ? 42 : 34} color='#6466F1' />}
          short
        />
        <div className='mt-4'>
          {planList.map((plan) => {
            return (
              <div key={plan.planId} className='flex justify-center'>
                <UnstyledButton
                  onClick={() => console.log('click')}
                  className='mx-6 mt-6 max-w-xl flex-1 rounded-lg bg-white p-6 pt-4 pb-8 shadow-sm shadow-dark-100 xs:mx-10 xs:mt-8 xs:px-8'
                >
                  <div className='text-right text-sm tracking-wide text-dark-400 xs:text-base'>
                    最終更新日：{plan.timestamp}
                  </div>
                  <div className='mt-4 mb-5 text-2xl font-bold text-dark-500 xs:text-3xl'>
                    {plan.name}
                  </div>
                  <DateRange dateList={[plan.startDate, plan.endDate]} />
                </UnstyledButton>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
