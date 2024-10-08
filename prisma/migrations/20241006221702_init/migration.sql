/*
  Warnings:

  - You are about to drop the `Personne` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Personne`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NULL,
    `prenom` VARCHAR(191) NULL,
    `naissance` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
