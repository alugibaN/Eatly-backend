/*
  Warnings:

  - You are about to drop the column `restauranеID` on the `Dishes` table. All the data in the column will be lost.
  - Added the required column `restaurantID` to the `Dishes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dishes" DROP CONSTRAINT "Dishes_restauranеID_fkey";

-- AlterTable
ALTER TABLE "Dishes" DROP COLUMN "restauranеID",
ADD COLUMN     "restaurantID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Dishes" ADD CONSTRAINT "Dishes_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES "Restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
