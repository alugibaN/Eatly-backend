/*
  Warnings:

  - Changed the column `category` on the `Dishes` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.
  - Changed the column `category` on the `Restaurants` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
-- ALTER TABLE "Dishes" ALTER COLUMN "category" SET DATA TYPE "Categories"[];
ALTER TABLE "Dishes" 
ALTER COLUMN "category" TYPE "Categories"[]
USING "category"::text::"Categories"[];
-- AlterTable
-- ALTER TABLE "Restaurants" ALTER COLUMN "category" SET DATA TYPE "Categories"[];
ALTER TABLE "Restaurants" 
ALTER COLUMN "category" TYPE "Categories"[]
USING "category"::text::"Categories"[];