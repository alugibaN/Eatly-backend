/*
  Warnings:

  - You are about to drop the column `cost` on the `Dishes` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Dishes` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `price` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Dishes" DROP COLUMN "cost",
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
