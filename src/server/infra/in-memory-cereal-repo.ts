import { CerealRepo } from "../domain/cereal-repo"
import Cereal from "../domain/cereal"

export default class InMemoryCerealRepo implements CerealRepo {
  cereals: Cereal[] = []
  async create(cereal: Cereal): Promise<void> {
    this.cereals.push(cereal)
  }

  async get(): Promise<Cereal[]> {
    return JSON.parse(JSON.stringify(this.cereals))
  }
}
