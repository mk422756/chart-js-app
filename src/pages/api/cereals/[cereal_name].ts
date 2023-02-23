// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod";
import NotFoundError from "src/server/domain/error/not-found-error";
import PrismaCerealRepo from "src/server/infra/prisma-cereal-repo";
import DeleteCerealUsecase from "src/server/usecase/delete-cereal-usecase";
import GetCerealUsecase from "src/server/usecase/get-cereal-usecase";
import UpdateCerealUsecase from "src/server/usecase/update-cereal-usecase";

const putRequestSchema = z.object({
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

const cerealNameSchema = z.string()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cereal_name } = req.query
  const { method } = req;

  switch (method) {
    case 'GET':
      const getUsecase = new GetCerealUsecase(new PrismaCerealRepo())
      if (!cerealNameSchema.safeParse(String(cereal_name))) {
        res.status(400).send("Bad Request")
        break
      }
      try {
        const cereal = await getUsecase.handle(String(cereal_name))
        res.status(200).json(cereal)
      } catch (e) {
        console.log(e)
        if (e instanceof NotFoundError) {
          res.status(404).send("Not Found")
        } else {
          res.status(500).send("Internal Server Error")
        }
      }
      break;
    case 'PUT':
      const updateUsecase = new UpdateCerealUsecase(new PrismaCerealRepo())
      if (!putRequestSchema.safeParse(req.body) && !cerealNameSchema.safeParse(String(cereal_name))) {
        res.status(400).send("Bad Request")
        break
      }
      try {
        await updateUsecase.handle({
          name: String(cereal_name),
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
        if (e instanceof NotFoundError) {
          res.status(404).send("Not Found")
        } else {
          res.status(500).send("Internal Server Error")
        }
      }
      break;
    case 'DELETE':
      const deleteUsecase = new DeleteCerealUsecase(new PrismaCerealRepo())
      if (!cerealNameSchema.safeParse(String(cereal_name))) {
        res.status(400).send("Bad Request")
        break
      }
      try {
        await deleteUsecase.handle(String(cereal_name))
        res.status(200).send("Success")
      } catch (e) {
        console.log(e)
        if (e instanceof NotFoundError) {
          res.status(404).send("Not Found")
        } else {
          res.status(500).send("Internal Server Error")
        }
      }
      break;
    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
