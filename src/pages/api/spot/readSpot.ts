import type { NextApiRequest, NextApiResponse } from 'next'
const url = require('url')

const readSpot = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = await url.parse(req.url, true).query
    const data = await fetch(
      `http://0.0.0.0/spot?plan_id=${params.planId}&spot_id=${params.spotId}`,
    )
    // エラー
    if (!data.ok) {
      throw new Error(String(data.status))
    }
    res.status(200).json(await data.json())
  } catch (error: any) {
    const errorCode = Number(error.message)
    res.status(errorCode).json(errorCode)
  }
}

export default readSpot
