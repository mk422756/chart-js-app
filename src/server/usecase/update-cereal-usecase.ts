import Cereal from "../domain/cereal"
import { CerealRepo } from "../domain/cereal-repo"

export interface UpdateCerealUsecaseInput {
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

export default class UpdateCerealUsecase {
  private repo: CerealRepo

  constructor(repo: CerealRepo) {
    this.repo = repo
  }

  async handle(input: UpdateCerealUsecaseInput) {
    const cereal = await this.repo.getByName(input.name)
    const updated = cereal.update(input)
    await this.repo.update(updated)
  }
}
