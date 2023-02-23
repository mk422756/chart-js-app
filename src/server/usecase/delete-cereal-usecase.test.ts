import Cereal from "../domain/cereal";
import InMemoryCerealRepo from "../infra/in-memory-cereal-repo";
import DeleteCerealUsecase from "./delete-cereal-usecase";

test('シリアルの削除が成功する', async () => {
  const repo = new InMemoryCerealRepo()
  const usecase = new DeleteCerealUsecase(repo)

  repo.cereals.push(new Cereal({
    name: "test1", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  }))

  await usecase.handle("test1")
  expect(repo.cereals.length).toBe(0)
})