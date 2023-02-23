import InMemoryCerealRepo from "../infra/in-memory-cereal-repo";
import GetAllCerealsUsecase from "./get-all-cereals-usecase";

test('シリアルの全取得が成功する', async () => {
  const repo = new InMemoryCerealRepo()
  const usecase = new GetAllCerealsUsecase(repo)

  repo.cereals.push({
    name: "test1", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })
  repo.cereals.push({
    name: "test2", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })
  repo.cereals.push({
    name: "test3", mfr: "A", type: "C", calories: 1, carbo: 2, cups: 3, fat: 4, fiber: 5, potass: 6, protein: 7, rating: 8, shelf: 9, sodium: 10, sugars: 11, vitamins: 12, weight: 13,
  })


  const cereals = await usecase.handle()

  expect(cereals.length).toBe(3)
  expect(cereals[0].name).toBe("test1")
  expect(cereals[1].name).toBe("test2")
  expect(cereals[2].name).toBe("test3")
})