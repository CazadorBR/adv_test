/*
  Warnings:

  - You are about to drop the column `adresse` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `adresse`,
    DROP COLUMN `numero`,
    MODIFY `nom` VARCHAR(255) NULL,
    MODIFY `prenom` VARCHAR(255) NULL,
    MODIFY `naissance` VARCHAR(255) NULL;
