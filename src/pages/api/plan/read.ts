import type { NextApiRequest, NextApiResponse } from 'next'
const url = require('url')

const readPlan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = await url.parse(req.url, true).query
    const data = await fetch(
      `${process.env.API_URL}/plan?plan_id=${params.planId}`,
    )
    // エラー
    if (!data.ok) {
      throw new Error(String(data.status))
    }
    res.status(200).json(await data.json())
  } catch (error: any) {
    // TODO: この実装は良いか(サーバー側のstatus codeをerror.messageに入れてそのまま返す)
    const errorCode = Number(error.message)
    res.status(errorCode).json(errorCode)
  }
}

export default readPlan
