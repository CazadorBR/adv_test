/*
  Warnings:

  - You are about to alter the column `nom` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `prenom` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `naissance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `adresse` VARCHAR(191) NULL,
    ADD COLUMN `numero` VARCHAR(191) NULL,
    MODIFY `nom` VARCHAR(191) NULL,
    MODIFY `prenom` VARCHAR(191) NULL,
    MODIFY `naissance` VARCHAR(191) NULL;
