-- CreateTable
CREATE TABLE "cereals" (
    "name" VARCHAR,
    "mfr" VARCHAR,
    "type" VARCHAR,
    "calories" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "carbo" DOUBLE PRECISION,
    "sugars" DOUBLE PRECISION,
    "potass" DOUBLE PRECISION,
    "vitamins" DOUBLE PRECISION,
    "shelf" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "cups" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION,
    "id" SERIAL NOT NULL,

    CONSTRAINT "cereals_pkey" PRIMARY KEY ("id")
);

