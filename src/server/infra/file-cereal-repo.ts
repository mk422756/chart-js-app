import { CerealRepo } from "../domain/cereal-repo"
import { cereals } from "../../constants/cereals"
import Cereal from "../domain/cereal"

export default class FileCerealRepo implements CerealRepo {

  async update(cereal: Cereal): Promise<void> { }
  async create(cereal: Cereal): Promise<void> { }
  async getByName(name: string): Promise<Cereal> {
    const ret = cereals.filter(cereal => cereal.name === name)
    if (ret.length === 0) {
      throw new Error("cereal not found")
    }
    return new Cereal({
      name: ret[0].name,
      mfr: ret[0].mfr,
      type: ret[0].type,
      calories: Number(ret[0].calories),
      protein: Number(ret[0].protein),
      fat: Number(ret[0].fat),
      sodium: Number(ret[0].sodium),
      fiber: Number(ret[0].fiber),
      carbo: Number(ret[0].carbo),
      sugars: Number(ret[0].sugars),
      potass: Number(ret[0].potass),
      vitamins: Number(ret[0].vitamins),
      shelf: Number(ret[0].shelf),
      weight: Number(ret[0].weight),
      cups: Number(ret[0].cups),
      rating: Number(ret[0].rating),
    })
  }
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
