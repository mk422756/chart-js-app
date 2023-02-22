import { CerealRepo } from "../domain/cereal-repo"
import { cereals } from "../../constants/cereals"
import Cereal from "../domain/cereal"

export default class FileCerealRepo implements CerealRepo {
  async update(cereal: Cereal): Promise<void> { }
  async create(cereal: Cereal): Promise<void> { }

  async get(): Promise<Cereal[]> {
    return cereals.map((cereal) => {
      return new Cereal({
        name: cereal.name,
        mfr: cereal.mfr,
        type: cereal.type,
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
