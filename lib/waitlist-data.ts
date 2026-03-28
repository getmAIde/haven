/**
 * NJ Housing Choice Voucher waitlist status — manually curated.
 * Updated weekly by checking PHA websites.
 * Sources: PHA websites, AffordableHousingOnline.com, HUDHousingNetwork.com
 */

export type WaitlistStatus = "open" | "closed" | "lottery" | "unknown";

export interface WaitlistEntry {
  id: string;
  pha: string;             // Public Housing Authority name
  city: string;
  county: string;
  state: string;
  status: WaitlistStatus;
  program: string;         // "HCV" | "Public Housing" | "Project-Based"
  lastUpdated: string;     // ISO date
  lastOpened?: string;     // ISO date when it last opened
  notes?: string;
  applyUrl?: string;
  phone?: string;
}

export const NJ_WAITLISTS: WaitlistEntry[] = [
  {
    id: "hacc-hcv",
    pha: "Housing Authority of the City of Camden (HACC)",
    city: "Camden",
    county: "Camden",
    state: "NJ",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-28",
    lastOpened: "2025-03-21",
    notes: "Waitlist opened and closed the same day on March 21, 2025. No reopening date announced. Currently serves 2,098 vouchers across 2,794 households.",
    applyUrl: "https://camdenhousing.org/admissions/",
    phone: "(856) 966-2120",
  },
  {
    id: "hacc-ph",
    pha: "Housing Authority of the City of Camden (HACC)",
    city: "Camden",
    county: "Camden",
    state: "NJ",
    status: "closed",
    program: "Public Housing",
    lastUpdated: "2026-03-28",
    notes: "Public housing waitlist closed. Contact HACC to be added to notification list.",
    applyUrl: "https://camdenhousing.org/admissions/",
    phone: "(856) 966-2120",
  },
  {
    id: "njdca-hcv",
    pha: "NJ DCA Section 8 Statewide (Mercer, Morris, Ocean, Salem, Warren)",
    city: "Statewide",
    county: "Multiple",
    state: "NJ",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-28",
    notes: "State-administered HCV waitlist is closed. Uses a lottery system when open — only 20,000 applicants placed on list from each lottery. Sign up for alerts at NJ DCA website.",
    applyUrl: "https://www.nj.gov/dca/divisions/dhcr/programs/hcv.html",
    phone: "1-800-382-4556",
  },
  {
    id: "hana-hcv",
    pha: "Housing Authority of Newark",
    city: "Newark",
    county: "Essex",
    state: "NJ",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-28",
    applyUrl: "https://www.newarkha.org",
    phone: "(973) 273-6400",
  },
  {
    id: "jcha-hcv",
    pha: "Jersey City Housing Authority",
    city: "Jersey City",
    county: "Hudson",
    state: "NJ",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-28",
    applyUrl: "https://www.jcha.us",
    phone: "(201) 706-4600",
  },
  {
    id: "paha-hcv",
    pha: "Paterson Housing Authority",
    city: "Paterson",
    county: "Passaic",
    state: "NJ",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-28",
    applyUrl: "https://www.patersoinha.org",
    phone: "(973) 345-0080",
  },
  {
    id: "trha-hcv",
    pha: "Trenton Housing Authority",
    city: "Trenton",
    county: "Mercer",
    state: "NJ",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-28",
    applyUrl: "https://www.trentonhousing.org",
    phone: "(609) 278-4400",
  },
  {
    id: "eha-hcv",
    pha: "Elizabeth Housing Authority",
    city: "Elizabeth",
    county: "Union",
    state: "NJ",
    status: "unknown",
    program: "HCV",
    lastUpdated: "2026-03-28",
    applyUrl: "https://www.elizabethhousingauthority.com",
    phone: "(908) 354-1080",
  },
];

export function getWaitlistsByCounty(county: string, state = "NJ"): WaitlistEntry[] {
  const q = county.toLowerCase();
  return NJ_WAITLISTS.filter(
    (w) => w.state === state && (w.county.toLowerCase().includes(q) || w.city.toLowerCase().includes(q))
  );
}

export function getAllWaitlists(): WaitlistEntry[] {
  return NJ_WAITLISTS;
}
