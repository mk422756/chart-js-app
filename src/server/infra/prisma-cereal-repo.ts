import { CerealRepo } from "../domain/cereal-repo"
import Cereal from "../domain/cereal"
import { prisma } from "./prisma"

export default class PrismaCerealRepo implements CerealRepo {
  async create(cereal: Cereal): Promise<void> {
    await prisma.cereals.create({
      data: {
        name: cereal.name,
        mfr: cereal.mfr,
        type: cereal.type,
        calories: cereal.calories,
        protein: cereal.protein,
        fat: cereal.fat,
        sodium: cereal.sodium,
        fiber: cereal.fiber,
        carbo: cereal.carbo,
        sugars: cereal.sugars,
        potass: cereal.potass,
        vitamins: cereal.vitamins,
        shelf: cereal.shelf,
        weight: cereal.weight,
        cups: cereal.cups,
        rating: cereal.rating,
      }
    })
  }

  async get(): Promise<Cereal[]> {
    const cereals = await prisma.cereals.findMany()
    return cereals.map((cereal) => {
      return new Cereal({
        name: cereal.name || "",
        mfr: cereal.mfr || "",
        type: cereal.type || "",
        calories: Number(cereal.calories),
        protein: Number(cereal.protein),
        fat: Number(cereal.fat),
        sodium: Number(cereal.sodium),
        fiber: Number(cereal.fiber),
        carbo: Number(cereal.carbo),
        sugars: Number(cereal.sugars),
        potass: Number(cereal.potass),
        vitamins: Number(cereal.vitamins),
        shelf: Number(cereal.shelf),
        weight: Number(cereal.weight),
        cups: Number(cereal.cups),
        rating: Number(cereal.rating),
      })
    })
  }
}
