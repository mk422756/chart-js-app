import { CerealRepo } from "../domain/cereal-repo"

export default class GetAllCerealsUsecase {
  private repo: CerealRepo

  constructor(repo: CerealRepo) {
    this.repo = repo
  }

  handle() {
    return this.repo.get()
  }
}
