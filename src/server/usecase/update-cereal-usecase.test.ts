import Cereal from "../domain/cereal";
import InMemoryCerealRepo from "../infra/in-memory-cereal-repo";
import UpdateCerealUsecase from "./update-cereal-usecase";

test('シリアルの更新が成功する', async () => {
  const repo = new InMemoryCerealRepo()
  const usecase = new UpdateCerealUsecase(repo)

  repo.cereals.push(new Cereal({
    name: "test1", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  }))

  await usecase.handle({
    name: "test1", mfr: "A", type: "C", calories: 999, carbo: 999, cups: 999, fat: 999, fiber: 999, potass: 999, protein: 999, rating: 999, shelf: 999, sodium: 999, sugars: 999, vitamins: 999, weight: 999,
  })

  expect(repo.cereals[0].name).toBe("test1")
  expect(repo.cereals[0].calories).toBe(999)
  expect(repo.cereals[0].carbo).toBe(999)
})