/*
  Warnings:

  - Added the required column `price` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "rate" INTEGER NOT NULL;
