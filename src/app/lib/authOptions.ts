 import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/lib/prisma";

// Configuration de NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email || "",
              nom: user.name || "",
              prenom: user.name?.split(" ")[0] || "",
              naissance: "23/07/2001", // Remplacer par une valeur réelle
              numero: "55428615", // Remplacer par une valeur réelle
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
        return false;
      }
    },

    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user?.email || "" },
        select: {
          id: true,
          nom: true,
          prenom: true,
          naissance: true,
          numero: true,
          adresse: true,
        },
      });

      if (dbUser) {
        session.user.id = String(dbUser.id);
        session.user.nom = dbUser.nom || "";
        session.user.prenom = dbUser.prenom || "";
        session.user.naissance = dbUser.naissance || "";
        session.user.numero = dbUser.numero ? String(dbUser.numero) : "";
        session.user.adresse = dbUser.adresse || "";
      }

      return session;
    },
  },
};

// Exporter authOptions pour l'utiliser dans d'autres fichiers
export { authOptions };
