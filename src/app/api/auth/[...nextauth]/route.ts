import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/authOptions"; // Importer les options depuis le fichier dédié

// Export du handler de NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
