/*
  Warnings:

  - You are about to drop the `projectmaincategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `projectsubcategory` DROP FOREIGN KEY `ProjectSubCategory_mainCategoryId_fkey`;

-- DropIndex
DROP INDEX `ProjectSubCategory_mainCategoryId_fkey` ON `projectsubcategory`;

-- AlterTable
ALTER TABLE `projectsubcategory` MODIFY `mainCategoryId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `projectmaincategory`;
