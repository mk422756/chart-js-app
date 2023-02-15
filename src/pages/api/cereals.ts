// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import GetCerealUsecase from "src/server/usecase/get-cereal-usecase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const usecase = new GetCerealUsecase()

  try {
    const cereals = await usecase.handle()
    res.status(200).json(cereals)
  } catch (e) {
    console.log(e)
    res.status(500).send("Internal Server Error")
  }
}
