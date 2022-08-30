import type { NextApiRequest, NextApiResponse } from 'next'

const plan = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch('https://freely-backend.herokuapp.com/plans')
  res.status(200).json(await data.json())
}

export default plan
