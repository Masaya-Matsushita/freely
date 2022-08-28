import { ReactElement } from 'react'
import useSWR from 'swr'

/**
 * @package
 */
export const SakeData = (): ReactElement => {
  // Access to fetch at 'https://www.sakenote.com/api/v1/sakes?token=bff1a8c0a8ebf7757a35001216ff3e8d0919f16e&prefecture_code=13' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled
  const { data, error } = useSWR(
    'https://www.sakenote.com/api/v1/sakes?token=sample_token&prefecture_code=13',
  )
  console.log('data:', data)
  console.log('error:', error)

  return <div>Sake Data</div>
}
