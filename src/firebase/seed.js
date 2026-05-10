import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

const ESTABLISHMENTS = [
  {
    name: "Noir Barber Club",
    category: "barbearia",
    address: "São Paulo - Rua Augusta, 1200",
    description: "Barbearia premium com mestres especializados em estilos clássicos e modernos.",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920&auto=format&fit=crop",
    rating: 4.9,
    ratingCount: 312,
    openTime: "09:00",
    closeTime: "19:00",
    active: true,
    ownerId: null,
    services: [
      { name: "Corte Masculino", duration: 45, price: 50 },
      { name: "Barba", duration: 35, price: 40 },
      { name: "Corte + Barba", duration: 60, price: 80 },
    ],
  },
  {
    name: "Royal Cuts",
    category: "barbearia",
    address: "São Paulo - Av. Paulista, 800",
    description: "Tradição e modernidade em cada corte.",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920&auto=format&fit=crop",
    rating: 4.7,
    ratingCount: 198,
    openTime: "09:00",
    closeTime: "19:00",
    active: true,
    ownerId: null,
    services: [
      { name: "Corte Masculino", duration: 45, price: 45 },
      { name: "Barba Clássica", duration: 30, price: 35 },
    ],
  },
  {
    name: "Gold Nails Studio",
    category: "manicure",
    address: "São Paulo - Rua Oscar Freire, 500",
    description: "Nail art de luxo com produtos importados.",
    imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1920&auto=format&fit=crop",
    rating: 5,
    ratingCount: 189,
    openTime: "09:00",
    closeTime: "19:00",
    active: true,
    ownerId: null,
    services: [
      { name: "Manicure Completa", duration: 60, price: 90 },
      { name: "Pedicure Spa", duration: 75, price: 120 },
      { name: "Nail Art Premium", duration: 90, price: 180 },
    ],
  },
  {
    name: "Spa Saint Tropez",
    category: "spa",
    address: "São Paulo - Rua Oscar Freire, 500",
    description: "Cuidado com a pele como você merece.",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1170&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1170&auto=format&fit=crop",
    rating: 5,
    ratingCount: 246,
    openTime: "09:00",
    closeTime: "19:00",
    active: true,
    ownerId: null,
    services: [
      { name: "Massagens Terapêuticas", duration: 50, price: 290 },
      { name: "Tratamentos Faciais", duration: 45, price: 220 },
      { name: "Day Spa", duration: 90, price: 580 },
    ],
  },
];

export async function seedDatabase() {
  let seeded = 0;

  for (const est of ESTABLISHMENTS) {
    // Verifica se já existe para não duplicar
    const q = query(
      collection(db, "establishments"),
      where("name", "==", est.name)
    );
    const existing = await getDocs(q);

    if (!existing.empty) {
      console.log(`Estabelecimento "${est.name}" já existe, pulando.`);
      continue;
    }

    const { services, ...estData } = est;

    const estRef = await addDoc(collection(db, "establishments"), {
      ...estData,
      createdAt: serverTimestamp(),
    });

    for (const svc of services) {
      await addDoc(collection(db, "services"), {
        ...svc,
        estId: estRef.id,
        active: true,
        createdAt: serverTimestamp(),
      });
    }

    console.log(`✅ Criado: ${est.name} (${estRef.id})`);
    seeded++;
  }

  console.log(`Seed concluído. ${seeded} estabelecimento(s) criado(s).`);
}
