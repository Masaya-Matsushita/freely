import type { NextApiRequest, NextApiResponse } from 'next'

const spot = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(`http://0.0.0.0/spot?planId=${req.body.planId}`)
  res.status(200).json(await data.json())
}

export default spot
