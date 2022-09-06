import type { NextApiRequest, NextApiResponse } from 'next'
const url = require('url')

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = await url.parse(req.url, true).query
  const data = await fetch('http://0.0.0.0/auth', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ plan_id: params.planId, password: params.password }),
  })
  res.status(200).json(await data.json())
}

export default auth
