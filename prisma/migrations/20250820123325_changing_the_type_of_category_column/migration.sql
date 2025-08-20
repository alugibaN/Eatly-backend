/*
  Warnings:

  - Changed the type of `category` on the `Dishes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Categories" ADD VALUE 'Pasta';
ALTER TYPE "Categories" ADD VALUE 'Breakfasts';
ALTER TYPE "Categories" ADD VALUE 'Lunches';

-- AlterTable
ALTER TABLE "Dishes" DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;
