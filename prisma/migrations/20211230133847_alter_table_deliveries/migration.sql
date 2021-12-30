-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_id_deliverman_fkey";

-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "id_deliverman" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_deliverman_fkey" FOREIGN KEY ("id_deliverman") REFERENCES "deliveryman"("id") ON DELETE SET NULL ON UPDATE CASCADE;
