// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod";
import PrismaCerealRepo from "src/server/infra/prisma-cereal-repo";
import CreateCerealUsecase from "src/server/usecase/create-cereal-usecase";
import GetAllCerealsUsecase from "src/server/usecase/get-all-cereals-usecase"

const postRequestSchema = z.object({
  name: z.string(),
  mfr: z.string(),
  type: z.number(),
  calories: z.number(),
  protein: z.number(),
  fat: z.number(),
  sodium: z.number(),
  fiber: z.number(),
  carbo: z.number(),
  sugars: z.number(),
  potass: z.number(),
  vitamins: z.number(),
  shelf: z.number(),
  weight: z.number(),
  cups: z.number(),
  rating: z.number(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const getUsecase = new GetAllCerealsUsecase(new PrismaCerealRepo())
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
      if (!postRequestSchema.safeParse(req.body)) {
        res.status(400).send("Bad Request")
        break
      }
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
