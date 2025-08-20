-- AlterTable
-- ALTER TABLE "Dishes" ALTER COLUMN "category" SET NOT NULL,
-- ALTER COLUMN "category" SET DATA TYPE "Categories";


-- BEGIN;
-- CREATE TYPE "Categories_new" AS ENUM ('Pickup', 'Burger', 'Sushi', 'Pizza', 'Asian', 'Donut', 'IceCream', 'Spicy');
-- ALTER TABLE "Dishes" ALTER COLUMN "category" TYPE "Categories_new" USING ("category"::text::"Categories_new");
-- ALTER TYPE "Categories" RENAME TO "Categories_old";
-- ALTER TYPE "Categories_new" RENAME TO "Categories";
-- DROP TYPE "Categories_old";
-- COMMIT;
ALTER TABLE "Dishes" 
ALTER COLUMN "category" TYPE "Categories"
USING "category"::text::"Categories";