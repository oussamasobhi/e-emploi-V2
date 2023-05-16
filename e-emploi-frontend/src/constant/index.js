export const API_BASE_URL = "http://localhost:8080";
//export const API_BASE_URL = '/api';
export const ACCESS_TOKEN = "accessToken";

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const initialUser = {
  id: "",
  username: "",
  nom: "",
  prenom: "",
  email: "",
  role: "",
  adresses: [{ pays: "", ville: "", libelle_adr: "" }],
  date_naissance: ""
};

export const dateFormat = 'YYYY-MM-DD';
export const villesMaroc = [
  "Agadir",
  "Ahfir",
  "Aït Melloul",
  "Al Hoceima",
  "Aousserd",
  "Assa",
  "Azilal",
  "Azrou",
  "Ben Ahmed",
  "Beni Ansar",
  "Beni Mellal",
  "Berkane",
  "Berrechid",
  "Boujdour",
  "Boujniba",
  "Boulemane",
  "Casablanca",
  "Chefchaouen",
  "Dakhla",
  "El Hajeb",
  "El Jadida",
  "El Kelaa des Sraghna",
  "Er-Rich",
  "Errachidia",
  "Essaouira",
  "Fès",
  "Figuig",
  "Fnideq",
  "Fquih Ben Salah",
  "Guelmim",
  "Guercif",
  "Ifrane",
  "Inezgane",
  "Jerada",
  "Kénitra",
  "Kelaat Sraghna",
  "Khemisset",
  "Khenifra",
  "Khouribga",
  "Ksar El Kebir",
  "Laâyoune",
  "Larache",
  "Marrakech",
  "Martil",
  "Meknès",
  "Midelt",
  "Mohammedia",
  "Nador",
  "Ouarzazate",
  "Oued Zem",
  "Oujda",
  "Rabat",
  "Safi",
  "Sale",
  "Sefrou",
  "Settat",
  "Sidi Bennour",
  "Sidi Ifni",
  "Sidi Kacem",
  "Sidi Slimane",
  "Skhirat",
  "Souk El Arbaa",
  "Tanger",
  "Tan-Tan",
  "Taourirt",
  "Taroudant",
  "Tata",
  "Taza",
  "Témara",
  "Tétouan",
  "Tiflet",
  "Tinghir",
  "Tiznit",
  "Youssoufia",
  "Zagora",
];
