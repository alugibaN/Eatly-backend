/*
  Warnings:

  - You are about to drop the column `timeReady` on the `Dishes` table. All the data in the column will be lost.
  - You are about to drop the column `TimeReady` on the `Restaurants` table. All the data in the column will be lost.
  - Added the required column `deliveryTime` to the `Dishes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryTime` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dishes" DROP COLUMN "timeReady",
ADD COLUMN     "deliveryTime" BIGINT NOT NULL,
ALTER COLUMN "name" SET DEFAULT '24 min',
ALTER COLUMN "rating" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Restaurants" DROP COLUMN "TimeReady",
ADD COLUMN     "deliveryTime" INTEGER NOT NULL;
