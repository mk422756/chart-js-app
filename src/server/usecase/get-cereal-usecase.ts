import { CerealRepo } from "../domain/cereal-repo"
import FileCerealRepo from "../infra/file-cereal-repo"

export default class GetCerealUsecase {
  private repo: CerealRepo

  constructor() {
    this.repo = new FileCerealRepo()
  }

  handle() {
    return this.repo.get()
  }
}
