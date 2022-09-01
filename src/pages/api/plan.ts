import type { NextApiRequest, NextApiResponse } from 'next'

const plan = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(`http://0.0.0.0/plan?planId=${req.body.planId}`)
  res.status(200).json(await data.json())
}

export default plan
