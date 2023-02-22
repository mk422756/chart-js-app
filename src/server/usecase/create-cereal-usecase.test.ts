import Cereal from "../domain/cereal";
import InMemoryCerealRepo from "../infra/in-memory-cereal-repo";
import CreateCerealUsecase from "./create-cereal-usecase";

test('シリアルの作成が成功する', async () => {
  const repo = new InMemoryCerealRepo()
  const usecase = new CreateCerealUsecase(repo)

  const cereal1 = new Cereal({
    name: "test1", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })
  const cereal2 = new Cereal({
    name: "test2", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })
  const cereal3 = new Cereal({
    name: "test3", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })
  await usecase.handle(cereal1)
  await usecase.handle(cereal2)
  await usecase.handle(cereal3)

  expect(repo.cereals.length).toBe(3)
  expect(repo.cereals[0].name).toBe("test1")
  expect(repo.cereals[1].name).toBe("test2")
  expect(repo.cereals[2].name).toBe("test3")
})