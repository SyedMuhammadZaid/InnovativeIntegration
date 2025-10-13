/*
  Warnings:

  - You are about to drop the column `Challenge` on the `casestudy` table. All the data in the column will be lost.
  - You are about to drop the column `Result` on the `casestudy` table. All the data in the column will be lost.
  - You are about to drop the column `Solution` on the `casestudy` table. All the data in the column will be lost.
  - Added the required column `challenge` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solution` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `casestudy` DROP COLUMN `Challenge`,
    DROP COLUMN `Result`,
    DROP COLUMN `Solution`,
    ADD COLUMN `challenge` TEXT NOT NULL,
    ADD COLUMN `result` JSON NOT NULL,
    ADD COLUMN `solution` TEXT NOT NULL;
