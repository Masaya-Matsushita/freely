import type { NextApiRequest, NextApiResponse } from 'next'
const url = require('url')

const readMemo = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = await url.parse(req.url, true).query
  const data = await fetch(
    `${process.env.API_URL}/memo-list?plan_id=${params.plan_id}&spot_id=${params.spot_id}`,
  )
  res.status(200).json(await data.json())
}

export default readMemo
