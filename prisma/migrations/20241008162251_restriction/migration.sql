-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_vendorId_fkey";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
