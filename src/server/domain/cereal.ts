import { z } from "zod"

const Schema = z.object({
  name: z.string(),
  mfr: z.string().regex(/[AGKNPQR]/),
  type: z.string().regex(/[CH]/),
  calories: z.number(),
  protein: z.number(),
  fat: z.number(),
  sodium: z.number(),
  fiber: z.number(),
  carbo: z.number(),
  sugars: z.number(),
  potass: z.number(),
  vitamins: z.number(),
  shelf: z.number(),
  weight: z.number(),
  cups: z.number(),
  rating: z.number(),
})

type Schema = z.infer<typeof Schema>

export default class Cereal {
  name: string
  mfr: string
  type: string
  calories: number
  protein: number
  fat: number
  sodium: number
  fiber: number
  carbo: number
  sugars: number
  potass: number
  vitamins: number
  shelf: number
  weight: number
  cups: number
  rating: number

  constructor(schema: Schema) {
    Schema.parse(schema)
    this.name = schema.name
    this.mfr = schema.mfr
    this.type = schema.type
    this.calories = schema.calories
    this.protein = schema.fat
    this.fat = schema.fat
    this.sodium = schema.sodium
    this.fiber = schema.fiber
    this.carbo = schema.carbo
    this.sugars = schema.sugars
    this.potass = schema.potass
    this.vitamins = schema.vitamins
    this.shelf = schema.shelf
    this.weight = schema.weight
    this.cups = schema.cups
    this.rating = schema.rating
  }
}
