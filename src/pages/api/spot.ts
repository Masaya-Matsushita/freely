import type { NextApiRequest, NextApiResponse } from 'next'

const spot = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch('https://freely-backend.herokuapp.com/spots')
  res.status(200).json(await data.json())
}

export default spot
