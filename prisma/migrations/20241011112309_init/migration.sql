/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the `Vendor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_vendorId_fkey";

-- DropIndex
DROP INDEX "Items_vendorId_key";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "vendorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Vendor";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
