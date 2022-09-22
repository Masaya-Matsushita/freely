import type { NextApiRequest, NextApiResponse } from 'next'
import { Spot } from 'src/type/Spot'
const url = require('url')

const readSpotList = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = await url.parse(req.url, true).query
  const data = await fetch(`http://0.0.0.0/spot-list?plan_id=${params.planId}`)
  const json = await data.json()
  // priorityの値で並べ替え
  const sortedData = json.sort((spot: Spot) => {
    if (spot.priority) {
      return -1
    } else {
      return 1
    }
  })
  res.status(200).json(sortedData)
}

export default readSpotList
