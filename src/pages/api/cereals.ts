// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import PrismaCerealRepo from "src/server/infra/prisma-cereal-repo";
import CreateCerealUsecase from "src/server/usecase/create-cereal-usecase";
import GetCerealUsecase from "src/server/usecase/get-cereal-usecase"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const getUsecase = new GetCerealUsecase(new PrismaCerealRepo())
      try {
        const cereals = await getUsecase.handle()
        res.status(200).json(cereals)
      } catch (e) {
        console.log(e)
        res.status(500).send("Internal Server Error")
      }
      break;
    case 'POST':
      const createUsecase = new CreateCerealUsecase(new PrismaCerealRepo())
      try {
        await createUsecase.handle({
          name: req.body.name,
          mfr: req.body.mfr,
          type: req.body.type,
          calories: req.body.calories,
          protein: req.body.protein,
          fat: req.body.fat,
          sodium: req.body.sodium,
          fiber: req.body.fiber,
          carbo: req.body.carbo,
          sugars: req.body.sugars,
          potass: req.body.potass,
          vitamins: req.body.vitamins,
          shelf: req.body.shelf,
          weight: req.body.weight,
          cups: req.body.cups,
          rating: req.body.rating,
        })
        res.status(200).send("Success")
      } catch (e) {
        console.log(e)
        res.status(500).send("Internal Server Error")
      }
      break;
    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
