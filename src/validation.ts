// src/app/lib/validation.ts

const PARIS_COORDINATES = { lat: 48.8566, lng: 2.3522 }; // Latitude et longitude de Paris

// Fonction pour vérifier si l'adresse est à moins de 50 km de Paris
export async function isUserNearParis(address: string): Promise<boolean> {
//   const apiKey = process.env.ADRESSE_API_KEY; // Ajoutez votre clé API

  const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`);

  if (!response.ok) {
    throw new Error('Erreur lors de la vérification de l\'adresse');
  }

  const data = await response.json();
  if (!data.features || data.features.length === 0) {
    return false; // Aucune donnée retournée pour l'adresse
  }

  const userCoordinates = data.features[0].geometry.coordinates; // [lng, lat]
  const distance = calculateDistance(PARIS_COORDINATES.lat, PARIS_COORDINATES.lng, userCoordinates[1], userCoordinates[0]);

  return distance <= 50; // 50 km
}

// Fonction pour calculer la distance entre deux coordonnées
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = degreesToRadians(lat2 - lat1);
  const dLng = degreesToRadians(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;  
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
