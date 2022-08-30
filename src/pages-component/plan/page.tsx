import useSWR from 'swr'

/**
 * @package
 */
export const Plan = () => {
  const { data: planData, error: planError } = useSWR('/api/plan')
  const { data: spotData, error: spotError } = useSWR('/api/spot')

  console.log('planData:', planData)
  console.log('planError:', planError)

  console.log('spotData:', spotData)
  console.log('spotError:', spotError)

  return <div></div>
}
