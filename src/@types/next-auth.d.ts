// src/@types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Ajoutez l'ID de l'utilisateur
      name?: string | null;
      email?: string | null;
      image?: string | null;
      nom?: string; // Ajoutez le nom
      prenom?: string; // Ajoutez le prénom
      naissance?: string; // Ajoutez la date de naissance
      numero?: string; // Ajoutez le numéro de téléphone
      adresse?: string; // Ajoutez l'adresse
    };
  }
}
