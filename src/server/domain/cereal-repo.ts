import { Cereal } from "src/types/cereal"

export interface CerealRepo {
  get(): Promise<Cereal[]>
}
