/*
  Warnings:

  - Added the required column `img` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "img" TEXT NOT NULL;
