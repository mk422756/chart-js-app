import { CerealRepo } from "../domain/cereal-repo"
import PrismaCerealRepo from "../infra/prisma-cereal-repo"

export default class GetCerealUsecase {
  private repo: CerealRepo

  constructor() {
    this.repo = new PrismaCerealRepo()
  }

  handle() {
    return this.repo.get()
  }
}
