/*
  Warnings:

  - Added the required column `old_price` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "old_price" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "trainings_old_price_idx" ON "trainings"("old_price");
