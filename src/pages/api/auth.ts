import type { NextApiRequest, NextApiResponse } from 'next'

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(
    `http://0.0.0.0/auth?planId=${req.body.planId}&password=${req.body.password}`,
  )
  res.status(200).json(await data.json())
}

export default auth
