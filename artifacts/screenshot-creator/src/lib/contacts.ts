export type Country = "us" | "uk" | "canada" | "germany" | "france";

/* ─── Name pools (~60 each → ~3,600 combinations per country) ─── */
const US_FIRST = [
  "James","John","Robert","Michael","William","David","Richard","Joseph","Thomas","Charles",
  "Emma","Olivia","Ava","Isabella","Sophia","Mia","Charlotte","Amelia","Harper","Evelyn",
  "Liam","Noah","Ethan","Mason","Logan","Lucas","Aiden","Jackson","Sebastian","Carter",
  "Benjamin","Samuel","Henry","Alexander","Daniel","Matthew","Ryan","Nathan","Andrew","Tyler",
  "Grace","Chloe","Lily","Ella","Abigail","Madison","Elizabeth","Sofia","Scarlett","Victoria",
  "Caleb","Owen","Wyatt","Dylan","Elijah","Isaiah","Grayson","Julian","Ezra","Miles",
  "Hannah","Zoe","Natalie","Leah","Aria","Layla","Brooklyn","Aubrey","Riley","Hazel",
];
const US_LAST = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Wilson","Moore",
  "Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Young","Robinson",
  "Walker","King","Scott","Hall","Allen","Wright","Torres","Adams","Mitchell","Phillips",
  "Campbell","Parker","Evans","Edwards","Collins","Stewart","Morris","Sanchez","Rogers","Reed",
  "Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard",
  "Ward","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price",
  "Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long",
];

const UK_FIRST = [
  "Oliver","George","Harry","Jack","Noah","Charlie","Jacob","Alfie","Freddie","Oscar",
  "Amelia","Olivia","Isla","Ava","Emily","Poppy","Isabella","Sophia","Grace","Lily",
  "Archie","Henry","James","Leo","William","Arthur","Mason","Ethan","Joshua","Daniel",
  "Benjamin","Samuel","Alexander","Thomas","Edward","Frederick","Theodore","Hugo","Sebastian","Patrick",
  "Florence","Rosie","Daisy","Eleanor","Charlotte","Harriet","Imogen","Beatrice","Phoebe","Matilda",
  "Reuben","Toby","Finn","Jude","Arlo","Rory","Kit","Barnaby","Montgomery","Caspian",
  "Penelope","Arabella","Cordelia","Vivienne","Constance","Millicent","Eugenie","Clementine","Seraphina","Evangeline",
];
const UK_LAST = [
  "Smith","Jones","Williams","Taylor","Brown","Davies","Evans","Wilson","Thomas","Roberts",
  "Walker","White","Robinson","Thompson","Wright","Jackson","Green","Harris","Wood","Lewis",
  "Martin","Cooper","Clark","Hall","Ward","Hughes","Turner","Collins","Carter","Morris",
  "Edwards","Mitchell","Bell","Watson","Bailey","Cook","Richardson","Bennett","Phillips","Henderson",
  "Barnes","Morgan","Gray","Shaw","Reynolds","Murphy","Russell","Palmer","Ellis","Mason",
  "Harrison","Gibson","Foster","Armstrong","Gordon","Reid","Webb","Hamilton","Burns","Hart",
  "Clarke","Simpson","Owen","Dixon","Warren","Fox","Hunt","Stephens","Barker","Griffiths",
];

const CA_FIRST = [
  "Liam","Noah","William","James","Oliver","Benjamin","Elijah","Lucas","Mason","Logan",
  "Emma","Olivia","Ava","Charlotte","Sophia","Amelia","Aria","Isabella","Mia","Harper",
  "Ethan","Aiden","Nathan","Jacob","Ryan","Dylan","Hunter","Owen","Gabriel","Zachary",
  "Caleb","Joshua","Samuel","Andrew","Connor","Evan","Tyler","Brandon","Kyle","Zach",
  "Chloe","Hannah","Emily","Grace","Abigail","Madison","Taylor","Jessica","Sarah","Lauren",
  "Mathieu","Félix","Alexis","Antoine","Nicolas","Maxime","Raphaël","Tristan","Simon","Julien",
  "Camille","Léa","Jade","Manon","Chloé","Océane","Laurie","Amélie","Maëlle","Rosalie",
];
const CA_LAST = [
  "Smith","Tremblay","Martin","Roy","Wilson","Gagnon","Johnson","Côté","Taylor","Bouchard",
  "Brown","Ouellet","Lee","Pelletier","Williams","Gauthier","Harris","Lefebvre","Anderson","Thompson",
  "Campbell","Bergeron","MacDonald","Leblanc","Young","Morin","Stewart","Lavoie","Murray","Fortin",
  "Robinson","Côté","Bélanger","Thibault","Ross","Reid","Wong","Chen","Patel","Singh",
  "Girard","Poirier","Laberge","Champagne","Desrochers","Couture","Bédard","Boivin","Charron","Dion",
  "MacLeod","Macdonald","Fraser","Mackenzie","Morrison","Duncan","Cameron","Fleming","Grant","Shaw",
  "Nguyen","Kim","Lam","Park","Ali","Khan","Ahmed","Santos","Oliveira","Fernandez",
];

const DE_FIRST = [
  "Klaus","Hans","Werner","Stefan","Thomas","Michael","Andreas","Christian","Matthias","Daniel",
  "Markus","Tobias","Felix","Florian","Lukas","Maximilian","Julia","Anna","Laura","Sarah",
  "Maria","Lea","Sophie","Lena","Emma","Lisa","Hannah","Mia","Clara","Lara",
  "Karl","Friedrich","Heinrich","Helmut","Dieter","Rolf","Günter","Bernd","Jürgen","Horst",
  "Nils","Philipp","Simon","Fabian","Moritz","Jonas","Leon","Tim","Jan","Sven",
  "Katharina","Monika","Ingrid","Brigitte","Renate","Ursula","Petra","Claudia","Sabine","Angelika",
  "Leonie","Johanna","Amelie","Franziska","Marlene","Theresa","Karoline","Annika","Nadine","Stefanie",
];
const DE_LAST = [
  "Müller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Schulz","Hoffmann",
  "Schäfer","Koch","Bauer","Richter","Klein","Wolf","Schröder","Neumann","Zimmermann","Braun",
  "Krüger","Hartmann","Lange","Schwarz","Schmitt","Werner","Krause","Meier","Lehmann","Schmid",
  "Schulze","Maier","Köhler","Herrmann","König","Walter","Mayer","Huber","Kaiser","Fuchs",
  "Peters","Lang","Scholz","Möller","Weiß","Jung","Hahn","Schubert","Vogel","Friedrich",
  "Keller","Günther","Frank","Berger","Winkler","Roth","Beck","Lorenz","Baumann","Franke",
  "Albrecht","Schreiber","Reichert","Ziegler","Kremer","Haas","Sommer","Ernst","Brandt","Stein",
];

const FR_FIRST = [
  "Jean","Pierre","Michel","André","Philippe","François","Jacques","Luc","Nicolas","Antoine",
  "Thomas","Alexandre","Mathieu","David","Lucas","Hugo","Nathan","Julien","Clément","Baptiste",
  "Marie","Isabelle","Catherine","Sophie","Julie","Camille","Chloé","Emma","Léa","Manon",
  "Henri","Alain","Christophe","Patrick","Stéphane","Olivier","Frédéric","Laurent","Sébastien","Benoît",
  "Axel","Théo","Enzo","Louis","Arthur","Raphaël","Quentin","Florian","Romain","Adrien",
  "Nathalie","Valérie","Christine","Véronique","Martine","Brigitte","Monique","Sylvie","Sandrine","Virginie",
  "Inès","Pauline","Lucie","Clara","Zoé","Alice","Sarah","Océane","Laura","Noémie",
];
const FR_LAST = [
  "Martin","Bernard","Dubois","Thomas","Robert","Richard","Petit","Durand","Leroy","Moreau",
  "Simon","Laurent","Lefebvre","Michel","Garcia","David","Bertrand","Roux","Vincent","Fournier",
  "Morel","Girard","André","Lefèvre","Mercier","Dupont","Lambert","Bonnet","François","Martinez",
  "Legrand","Garnier","Faure","Rousseau","Blanc","Guerin","Muller","Henry","Roussel","Nicolas",
  "Perrin","Morin","Mathieu","Clement","Gauthier","Fontaine","Robin","Masson","Sanchez","Gerard",
  "Gaillard","Aubert","Barbier","Arnaud","Lemaire","Renard","Boyer","Perrot","Carpentier","Collet",
  "Brun","Noel","Lacroix","Picard","Vidal","Bourgeois","Renaud","Dufour","Pichon","Thibault",
];

/* ─── Phone number pools ─── */
const US_AREA_CODES = ["212","646","917","718","347","310","323","213","424","818","415","628","408","669","312","773","872","713","832","281","404","678","770","617","857","202","571","703","240","410","443","267","215","484"];
const CA_AREA_CODES = ["416","647","437","604","778","236","514","438","403","587","780","613","343","905","289","365","519","226","249","807","418","450","819","306","639","204","431","902","506","709"];
const DE_MOBILE_PREFIXES = ["151","152","155","157","159","160","162","163","170","171","172","173","174","175","176","177","178","179"];
const FR_MOBILE_PREFIXES = ["06","07"];

/* ─── Timezone map ─── */
export const COUNTRY_TIMEZONE: Record<Country, string> = {
  us:      "America/New_York",
  canada:  "America/Toronto",
  uk:      "Europe/London",
  germany: "Europe/Berlin",
  france:  "Europe/Paris",
};

/** Returns current HH:MM in the given country's primary timezone */
export function getCountryTime(country: Country): string {
  const tz = COUNTRY_TIMEZONE[country];
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

/* ─── Helpers ─── */
function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randDigits(n: number): string {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
}

/* ─── Generator ─── */
export function generateContact(country: Country): { name: string; phone: string } {
  switch (country) {
    case "us": {
      const area = rand(US_AREA_CODES);
      return { name: `${rand(US_FIRST)} ${rand(US_LAST)}`, phone: `+1 (${area}) ${randDigits(3)}-${randDigits(4)}` };
    }
    case "uk": {
      return { name: `${rand(UK_FIRST)} ${rand(UK_LAST)}`, phone: `+44 7${randDigits(3)} ${randDigits(6)}` };
    }
    case "canada": {
      const area = rand(CA_AREA_CODES);
      return { name: `${rand(CA_FIRST)} ${rand(CA_LAST)}`, phone: `+1 (${area}) ${randDigits(3)}-${randDigits(4)}` };
    }
    case "germany": {
      const prefix = rand(DE_MOBILE_PREFIXES);
      return { name: `${rand(DE_FIRST)} ${rand(DE_LAST)}`, phone: `+49 ${prefix} ${randDigits(4)} ${randDigits(4)}` };
    }
    case "france": {
      const prefix = rand(FR_MOBILE_PREFIXES);
      return { name: `${rand(FR_FIRST)} ${rand(FR_LAST)}`, phone: `+33 ${prefix} ${randDigits(2)} ${randDigits(2)} ${randDigits(2)} ${randDigits(2)}` };
    }
  }
}

/* ─── Validation ─── */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateName(name: string): ValidationResult {
  const t = name.trim();
  if (!t)           return { valid: false, error: "Name is required" };
  if (t.length < 2) return { valid: false, error: "Name must be at least 2 characters" };
  if (t.length > 60) return { valid: false, error: "Name is too long (max 60 chars)" };
  if (/\d/.test(t))  return { valid: false, error: "Name should not contain numbers" };
  if (/[^a-zA-ZÀ-ÖØ-öø-ÿ\s'\-.]/.test(t)) return { valid: false, error: "Name contains invalid characters" };
  return { valid: true };
}

const PHONE_PATTERNS: RegExp[] = [
  /^\+1[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,        // US / Canada
  /^\+44[\s-]?7\d{3}[\s-]?\d{6}$/,                         // UK mobile
  /^\+44[\s-]?\d{3,4}[\s-]?\d{6,7}$/,                      // UK other
  /^\+49[\s-]?\d{3,4}[\s\d]{7,12}$/,                       // Germany
  /^\+33[\s-]?[67][\s\d]{8,12}$/,                           // France mobile
  /^\+254[\s-]?\d{3}[\s-]?\d{6}$/,                          // Kenya
  /^\+\d{7,15}$/,                                            // Generic E.164
  /^[\d\s\-().]{7,17}$/,                                     // Local
];

export function validatePhone(phone: string): ValidationResult {
  const t = phone.trim();
  if (!t)            return { valid: false, error: "Phone number is required" };
  if (t.length < 5)  return { valid: false, error: "Number is too short" };
  if (t.length > 22) return { valid: false, error: "Number is too long" };
  const digits = t.replace(/\D/g, "");
  if (digits.length < 7)  return { valid: false, error: "Too few digits" };
  if (digits.length > 15) return { valid: false, error: "Too many digits" };
  if (!PHONE_PATTERNS.some(p => p.test(t))) return { valid: false, error: "Unrecognized phone format" };
  return { valid: true };
}
