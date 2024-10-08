// // src/app/api/auth/update.ts

// import { getServerSession } from "next-auth";
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/app/lib.prisma/prisma";
//  import { authOptions } from "../auth/[...nextauth]/route";
  
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//    if (req.method !== "PUT") {
//     return res.status(405).json({ message: "Méthode non autorisée." });
//   }

//    const session = await getServerSession(req, res, authOptions); 

//   // Vérifier si l'utilisateur est connecté
//   if (!session || !session.user?.email) {
//     return res.status(401).json({ message: "Utilisateur non connecté." });
//   }

//   try {
//     // Récupérer les données à mettre à jour depuis le corps de la requête
//     const { nom, prenom, naissance, numero } = req.body;

//     // Mettre à jour l'utilisateur dans la base de données avec Prisma
//     const updatedUser = await prisma.user.update({
//       where: { email: session.user.email },
//       data: {
//         nom: nom || undefined,
//         prenom: prenom || undefined,
//         naissance: naissance || undefined,
//         numero: numero || undefined,
//       },
//     });

//     // Retourner les données mises à jour de l'utilisateur
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
//     return res.status(500).json({ message: "Erreur serveur", error });
//   }
// }
