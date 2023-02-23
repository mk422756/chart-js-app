import Cereal from "./cereal"

export interface CerealRepo {
  get(): Promise<Cereal[]>
  getByName(name: string): Promise<Cereal>
  create(cereal: Cereal): Promise<void>
  update(cereal: Cereal): Promise<void>
  delete(cereal: Cereal): Promise<void>
}
