import { CerealRepo } from "../domain/cereal-repo"

export default class GetCerealUsecase {
  private repo: CerealRepo

  constructor(repo: CerealRepo) {
    this.repo = repo
  }

  handle(name: string) {
    return this.repo.getByName(name)
  }
}
