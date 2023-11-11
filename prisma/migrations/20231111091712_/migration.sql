/*
  Warnings:

  - Added the required column `acceptedRodo` to the `UserAdditionalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAdditionalInfo" ADD COLUMN     "acceptedRodo" BOOLEAN NOT NULL;
