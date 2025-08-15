/*
  Warnings:

  - Changed the type of `category` on the `Dishes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Restaurants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE   "Categories" AS ENUM ('Pickup', 'Burger', 'Sushi', 'Pizza', 'Asian', 'Donat', 'Ice', 'Spacy');

-- AlterTable
ALTER TABLE   "Dishes" DROP COLUMN "category",
ADD COLUMN    "category" "Categories" NOT NULL;

-- AlterTable
ALTER TABLE    "Restaurants" DROP COLUMN "category",
ADD COLUMN     "category" "Categories" NOT NULL;

-- DropEnum
DROP TYPE      "CategoryDishOrRest";
