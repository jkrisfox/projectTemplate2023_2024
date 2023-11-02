/*
  Warnings:

  - Added the required column `image_path` to the `Equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long_description` to the `Equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_description` to the `Equipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipments" ADD COLUMN     "image_path" TEXT NOT NULL,
ADD COLUMN     "long_description" TEXT NOT NULL,
ADD COLUMN     "short_description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "experience" DROP NOT NULL;
