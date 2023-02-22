import Cereal from "../domain/cereal"
import { CerealRepo } from "../domain/cereal-repo"

export interface CreateCerealUsecaseInput {
  name: string
  mfr: string
  type: string
  calories: number
  protein: number
  fat: number
  sodium: number
  fiber: number
  carbo: number
  sugars: number
  potass: number
  vitamins: number
  shelf: number
  weight: number
  cups: number
  rating: number
}

export default class CreateCerealUsecase {
  private repo: CerealRepo

  constructor(repo: CerealRepo) {
    this.repo = repo
  }

  handle(input: CreateCerealUsecaseInput) {
    const cereal = new Cereal(input)
    return this.repo.create(cereal)
  }
}
