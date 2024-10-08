// // pages/api/auth/signup.ts
// import prisma from "@/app/lib.prisma/prisma";
// import { hash } from "bcrypt"; // Assurez-vous d'installer bcrypt
// import { NextApiRequest, NextApiResponse } from "next";
//  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//      const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: "Utilisateur déjà existant." });
//     }

//     // Hachez le mot de passe
//     const hashedPassword = await hash(password, 10);

//      const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return res.status(201).json(user);
//   }

//   return res.status(405).json({ message: "Method not allowed" });
// };

// export default handler;
