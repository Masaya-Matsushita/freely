import type { NextApiRequest, NextApiResponse } from 'next'
const url = require('url')

const memoList = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = await url.parse(req.url, true).query
  const data = await fetch(`http://0.0.0.0/memo-list?spot_id=${params.spot_id}`)
  res.status(200).json(await data.json())
}

export default memoList
