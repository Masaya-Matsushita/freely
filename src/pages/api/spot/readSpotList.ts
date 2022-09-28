import type { NextApiRequest, NextApiResponse } from 'next'
import { Spot } from 'src/type/Spot'
const url = require('url')

const readSpotList = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = await url.parse(req.url, true).query
  const data = await fetch(`http://0.0.0.0/spot-list?plan_id=${params.planId}`)
  const spotList: Spot[] = await data.json()
  // spot_idの値で並べ替え
  spotList.sort((a, b) => {
    if (a.spot_id < b.spot_id) return -1
    if (a.spot_id > b.spot_id) return 1
    return 0
  })
  // priorityの値で並べ替え
  let firstSpotList: Spot[] = []
  let secondSpotList: Spot[] = []
  spotList.forEach((spot) => {
    if (spot.priority) {
      firstSpotList = [...firstSpotList, spot]
    } else {
      secondSpotList = [...secondSpotList, spot]
    }
  })
  res.status(200).json([...firstSpotList, ...secondSpotList])
}

export default readSpotList
