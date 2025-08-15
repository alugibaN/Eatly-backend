/*
  Warnings:

  - You are about to alter the column `price` on the `Dishes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `price` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "Dishes" ALTER COLUMN "price" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "price" SET DATA TYPE DECIMAL(5,2);
