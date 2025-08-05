/*
  Warnings:

  - You are about to drop the column `restauran` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `restaurant` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dishes" ALTER COLUMN "cost" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "restauran",
ADD COLUMN     "restaurant" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "dishID" TEXT NOT NULL,
    "restaurantID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userID_dishID_restaurantID_key" ON "Favorites"("userID", "dishID", "restaurantID");

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_dishID_fkey" FOREIGN KEY ("dishID") REFERENCES "Dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES "Restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
