import { Cereal } from "src/types/cereal"
import { getBaseUrl } from "src/util/baseurl"

export default class CerealClient {
  async fetch(): Promise<Cereal[]> {
    const response = await fetch(`${getBaseUrl()}/api/cereals`)
    const cereals = await response.json()
    return cereals.map((cereal: any): Cereal => {
      return this.responseToCereal(cereal)
    })
  }

  private responseToCereal(res: any): Cereal {
    return {
      name: res.name,
      mfr: res.mfr,
      type: res.type,
      calories: Number(res.calories),
      protein: Number(res.protein),
      fat: Number(res.fat),
      sodium: Number(res.sodium),
      fiber: Number(res.fiber),
      carbo: Number(res.carbo),
      sugars: Number(res.sugars),
      potass: Number(res.potass),
      vitamins: Number(res.vitamins),
      shelf: Number(res.shelf),
      weight: Number(res.weight),
      cups: Number(res.cups),
      rating: Number(res.rating),
    }
  }
}
