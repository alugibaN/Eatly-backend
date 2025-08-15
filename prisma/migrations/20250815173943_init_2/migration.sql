/*
  Warnings:

  - You are about to drop the column `amount` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `deliverStatus` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `dishes` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `total` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeliverStatus" AS ENUM ('inProcessing', 'delivered', 'completed');

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "amount",
DROP COLUMN    "deliverStatus",
DROP COLUMN    "dishes",
DROP COLUMN    "price",
ADD  COLUMN    "items" TEXT[],
ADD  COLUMN    "total" DOUBLE PRECISION NOT NULL,
DROP COLUMN    "status",
ADD  COLUMN    "status" "DeliverStatus" NOT NULL;




