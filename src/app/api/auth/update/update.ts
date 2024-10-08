import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
 import { isUserNearParis } from "@/validation";
 import prisma from "@/app/lib/prisma";
 import { authOptions } from "@/app/lib/authOptions"; // Importer authOptions
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Méthode non autorisée." });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Utilisateur non connecté." });
  }

  const { nom, prenom, naissance, numero, adresse } = req.body;  // Récupérer l'adresse depuis le body

  // Valider l'adresse si nécessaire avant la mise à jour
  try {
    // Valider l'adresse avec la fonction `isUserNearParis` (assurez-vous qu'elle est bien appelée ici)
    const isNearParis = await isUserNearParis(adresse);
    if (!isNearParis) {
      return res.status(400).json({ message: "L'adresse n'est pas à moins de 50 km de Paris." });
    }
    console.log("Données reçues pour mise à jour :", { nom, prenom, naissance, numero, adresse });

    // Mettre à jour l'utilisateur dans la base de données
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        nom: nom || undefined,
        prenom: prenom || undefined,
        naissance: naissance || undefined,
        numero: numero || undefined,
        adresse: adresse || undefined,  // Mise à jour de l'adresse
      },

      
    });
    console.log("Utilisateur mis à jour :", updatedUser);


    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
}
