"use client";

import { isUserNearParis } from "@/validation";
import { useSession } from "next-auth/react";
import { useState } from "react";
 
export default function Home() {
  const { data: session } = useSession();
  
  // État local pour les informations utilisateur
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    naissance: '',
    numero: '',
    adresse: '', // Ajoute un champ d'adresse
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      console.error('Utilisateur non connecté');
      return;
    }
    console.log("________________email :" + session.user?.email);

    try {
       const isValidAddress = await isUserNearParis(userData.adresse);
      
      if (!isValidAddress) {
        alert("Votre adresse doit être située à moins de 50 km de Paris.");
        return;
      }

      const response = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           nom: userData.nom,
          prenom: userData.prenom,
          naissance: userData.naissance,
          numero: userData.numero,
          adresse: userData.adresse,    
          
             }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      const updatedUser = await response.json();
      console.log('Utilisateur mis à jour:', updatedUser);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {session ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Bienvenue, {session.user?.name}!</h1>
            <p className="mt-2 text-lg">Votre e-mail: {session.user?.email}</p>

             <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={userData.nom}
                onChange={handleChange}
                required
                className="block mt-2 text-black"
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={userData.prenom}
                onChange={handleChange}
                required
                className="block mt-2 text-black"
              />
              <input
                type="text"
                name="naissance"
                placeholder="Date de naissance"
                value={userData.naissance}
                onChange={handleChange}
                className="block mt-2 text-black"
              />
              <input
                type="text"
                name="numero"
                placeholder="Numéro"
                value={userData.numero}
                onChange={handleChange}
                className="block mt-2 text-black"
              />
              <input
                type="text"
                name="adresse"
                placeholder="Adresse"
                value={userData.adresse}
                onChange={handleChange}
                required
                className="block mt-2 text-black"
              />
              <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Mettre à jour
              </button>
            </form>
          </div>
        ) : (
          <p className="text-lg">Veuillez vous connecter pour voir vos informations.</p>
        )}
      </div>
    </main>
  );
}
