// Données des zones régionales de JCI Madagascar (source: content/zone nord.pdf + content/Bureau national 2026.pdf)
export const zonesData = {
  nord: {
    label: "Zone Nord",
    vp: "Franco Joël ANDRIAMAMPIONONA",
    organisations: ["JCI Ambilobe", "JCI Antsiranana", "JCI Antsohihy", "JCI Nosy Be", "JCI Sambava"],
    bureauLocal: [
      { Name: "Guychard Dimisy", Role: "Président Local" },
      { Name: "ANDRIATSITOHAINA Charles", Role: "Immediat past président" },
      { Name: "ANDRIATSITOHAINA Charles", Role: "Secrétaire général local" },
      { Name: "ANDRIATSITOHAINA Charles", Role: "Trésorier local" },
      { Name: "ANDRIATSITOHAINA Charles", Role: "Conseiller juridique local" },
      { Name: "ANDRIATSITOHAINA Charles", Role: "Vice-président exécutif local" },
      { Name: "ANDRIATSITOHAINA Charles", Role: "Vice-président local" },
    ],
    contact: { ville: "Ambilobe", phone: "+261 32 00 000 00", email: "sglambilobe@jcimada.org" },
  },
  centre: {
    label: "Zone Centre",
    vp: "Anjarasoa RAKOTONARIVO",
    organisations: [],
    bureauLocal: [],
    contact: null,
  },
  sud: {
    label: "Zone Sud",
    vp: "Emilie RASOANINDRINA",
    organisations: [],
    bureauLocal: [],
    contact: null,
  },
}
