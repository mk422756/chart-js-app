import { Cereal } from "src/types/cereal"

export interface Option {
  type: string[]
}

export interface CerealRepo {
  get(option?: Option): Promise<Cereal[]>
}
