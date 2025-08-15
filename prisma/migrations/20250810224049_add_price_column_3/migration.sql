/*
  Warnings:

  - Added the required column `price` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dishes" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
UPDATE "Dishes" SET price = cost WHERE price IS NULL;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
