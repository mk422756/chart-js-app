// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import NotFoundError from "src/server/domain/error/not-found-error";
import PrismaCerealRepo from "src/server/infra/prisma-cereal-repo";
import GetCerealUsecase from "src/server/usecase/get-cereal-usecase";
import UpdateCerealUsecase from "src/server/usecase/update-cereal-usecase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cereal_name } = req.query
  const { method } = req;

  switch (method) {
    case 'GET':
      const getUsecase = new GetCerealUsecase(new PrismaCerealRepo())
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
    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
