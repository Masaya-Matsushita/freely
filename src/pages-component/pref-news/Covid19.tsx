import { ReactElement } from 'react'
import useSWR from 'swr'

/**
 * @package
 */
export const Covid19 = (): ReactElement => {
  // Access to fetch at 'https://opendata.corona.go.jp/api/Covid19JapanAll?date=20200509&dataName=%E5%8C%97%E6%B5%B7%E9%81%93' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
  const { data, error } = useSWR(
    'https://opendata.corona.go.jp/api/Covid19JapanAll?date=20200509&dataName=北海道',
  )
  console.log('data:', data)
  console.log('error:', error)

  return <div>Covid19 Data</div>
}
