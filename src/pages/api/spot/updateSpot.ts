import type { NextApiRequest, NextApiResponse } from 'next'

const updateSpot = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch('http://0.0.0.0/spot', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(req.body),
  })
  res.status(200).json(await data.json())
}

export default updateSpot
