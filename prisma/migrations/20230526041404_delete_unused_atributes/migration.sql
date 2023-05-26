/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_responsibleId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "responsibleId",
DROP COLUMN "status";

-- DropEnum
DROP TYPE "status";
