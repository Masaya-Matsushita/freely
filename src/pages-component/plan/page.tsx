import { useState } from 'react'
import useSWR from 'swr'

/**
 * @package
 */
export const Plan = () => {
  // const { data, error } = useSWR('https://freely-backend.herokuapp.com/')

  const [data, setData] = useState<any>()

  const handleClick = async () => {
    const res = await fetch('https://freely-backend.herokuapp.com/')
    const json = await res.json()
    setData(json)
  }

  console.log(data)

  return (
    <div>
      <button onClick={handleClick}>fetch</button>
    </div>
  )
}
