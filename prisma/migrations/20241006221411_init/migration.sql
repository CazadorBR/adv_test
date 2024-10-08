-- CreateTable
CREATE TABLE `Personne` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NULL,
    `prenom` VARCHAR(191) NULL,
    `naissance` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,

    UNIQUE INDEX `Personne_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
