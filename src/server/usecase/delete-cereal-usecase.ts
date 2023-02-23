import { CerealRepo } from "../domain/cereal-repo"

export default class DeleteCerealUsecase {
  private repo: CerealRepo

  constructor(repo: CerealRepo) {
    this.repo = repo
  }

  async handle(name: string) {
    const cereal = await this.repo.getByName(name)
    await this.repo.delete(cereal)
  }
}
