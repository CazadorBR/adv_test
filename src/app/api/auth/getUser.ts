 import prisma from '@/app/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  const email = session.user?.email;

  try {
     const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return res.status(500).json({ message: "Erreur du serveur" });
  }
}
