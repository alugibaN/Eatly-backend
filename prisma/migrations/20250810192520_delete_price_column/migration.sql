/*
  Warnings:

  - You are about to drop the column `price` on the `Dishes` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dishes" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "price";
