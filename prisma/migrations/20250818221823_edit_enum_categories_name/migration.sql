/*
  Warnings:

  - The values [Donat,Ice] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('Pickup', 'Burger', 'Sushi', 'Pizza', 'Asian', 'Donut', 'IceCream', 'Spicy');
ALTER TABLE "Restaurants" ALTER COLUMN "category" TYPE "Categories_new"[] USING ("category"::text::"Categories_new"[]);
ALTER TABLE "Dishes" ALTER COLUMN "category" TYPE "Categories_new"[] USING ("category"::text::"Categories_new"[]);
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;
