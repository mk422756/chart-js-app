import { CerealRepo } from "../domain/cereal-repo"
import Cereal from "../domain/cereal"

export default class InMemoryCerealRepo implements CerealRepo {
  cereals: Cereal[] = []

  async update(cereal: Cereal): Promise<void> {
    this.cereals = this.cereals.map(c => {
      if (c.name === cereal.name) {
        return cereal
      }
      return c
    })
  }

  async create(cereal: Cereal): Promise<void> {
    this.cereals.push(cereal)
  }

  async get(): Promise<Cereal[]> {
    return JSON.parse(JSON.stringify(this.cereals))
  }
}
