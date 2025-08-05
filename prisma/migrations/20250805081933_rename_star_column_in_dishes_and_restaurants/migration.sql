/*
  Warnings:

  - You are about to drop the column `star` on the `Dishes` table. All the data in the column will be lost.
  - You are about to drop the column `star` on the `Restaurants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dishes" RENAME COLUMN "star" TO "rating";
-- ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Restaurants" RENAME COLUMN "star" TO "rating";
-- ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;
