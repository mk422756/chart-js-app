import InMemoryCerealRepo from "../infra/in-memory-cereal-repo";
import GetCerealUsecase from "./get-cereal-usecase";

test('シリアルの個別取得が成功する', async () => {
  const repo = new InMemoryCerealRepo()
  const usecase = new GetCerealUsecase(repo)

  repo.cereals.push({
    name: "test1", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })
  repo.cereals.push({
    name: "test2", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })
  repo.cereals.push({
    name: "test3", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })

  const cereal = await usecase.handle("test1")

  expect(cereal.name).toBe("test1")
  expect(cereal.calories).toBe(1)
  expect(cereal.carbo).toBe(2)
})

test('シリアルが取得できない場合はErrorが投げられる', async () => {
  const repo = new InMemoryCerealRepo()
  const usecase = new GetCerealUsecase(repo)

  repo.cereals.push({
    name: "test1", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })

  expect(() => usecase.handle("test2")).toThrow();
})