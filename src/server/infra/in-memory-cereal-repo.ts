import { CerealRepo } from "../domain/cereal-repo"
import Cereal from "../domain/cereal"
import NotFoundError from "../domain/error/not-found-error"

export default class InMemoryCerealRepo implements CerealRepo {
  cereals: Cereal[] = []

  async delete(cereal: Cereal): Promise<void> {
    this.cereals = this.cereals.filter(c => c.name !== cereal.name)
  }

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

  async getByName(name: string): Promise<Cereal> {
    const arr = this.cereals.map(cereal => new Cereal(cereal))
    const ret = arr.filter((cereal: Cereal) => cereal.name === name)
    if (ret.length === 0) {
      throw new NotFoundError()
    }
    return ret[0]
  }

  async get(): Promise<Cereal[]> {
    return this.cereals.map(cereal => new Cereal(cereal))
  }
}
