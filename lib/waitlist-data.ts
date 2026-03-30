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
    phone: "(856) 968-4100",
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
    phone: "(856) 968-4100",
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

// ── Hampton Roads / 757 Virginia ─────────────────────────────────────────────

export const VA_757_WAITLISTS: WaitlistEntry[] = [
  {
    id: "nrha-hcv",
    pha: "Norfolk Redevelopment and Housing Authority (NRHA)",
    city: "Norfolk",
    county: "Norfolk",
    state: "VA",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-30",
    lastOpened: "2024-03-01",
    notes: "Largest housing authority in Virginia — 13,000+ residents. HCV waitlist was last open March 2024. Monitor nrha.us for reopening.",
    applyUrl: "https://nrha.us/housing/apply/waitlists/",
    phone: "(757) 623-1111",
  },
  {
    id: "nrha-ph",
    pha: "Norfolk Redevelopment and Housing Authority (NRHA)",
    city: "Norfolk",
    county: "Norfolk",
    state: "VA",
    status: "closed",
    program: "Public Housing",
    lastUpdated: "2026-03-30",
    notes: "Public housing waitlist closed. NRHA manages 16 neighborhoods. Contact NRHA to be added to notification list.",
    applyUrl: "https://nrha.us/housing/apply/waitlists/",
    phone: "(757) 664-4486",
  },
  {
    id: "hrha-hcv",
    pha: "Hampton Redevelopment and Housing Authority (HRHA)",
    city: "Hampton",
    county: "Hampton",
    state: "VA",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-30",
    notes: "HCV waitlist closed. Contact HRHA to be added to notification list when waitlist reopens.",
    applyUrl: "http://www.hamptonrha.com",
    phone: "(757) 727-1111",
  },
  {
    id: "nnrha-hcv",
    pha: "Newport News Redevelopment & Housing Authority (NNRHA)",
    city: "Newport News",
    county: "Newport News",
    state: "VA",
    status: "unknown",
    program: "HCV",
    lastUpdated: "2026-03-30",
    notes: "3,068 vouchers administered. Waitlist status unconfirmed — check nnrha.net or call directly for current status. Senior properties include Ashe Manor and Pinecroft Apartments (140-unit senior high-rise).",
    applyUrl: "https://nnrha.net",
    phone: "(757) 928-2644",
  },
  {
    id: "prha-hcv",
    pha: "Portsmouth Redevelopment and Housing Authority (PRHA)",
    city: "Portsmouth",
    county: "Portsmouth",
    state: "VA",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-30",
    notes: "HCV waitlist closed. Contact PRHA for notification when waitlist reopens.",
    applyUrl: "https://www.prha.net",
    phone: "(757) 399-5261",
  },
  {
    id: "vb-housing-hcv",
    pha: "Virginia Beach Housing and Neighborhood Preservation",
    city: "Virginia Beach",
    county: "Virginia Beach",
    state: "VA",
    status: "closed",
    program: "HCV",
    lastUpdated: "2026-03-30",
    notes: "HCV waitlist closed. Virginia Beach runs housing through a city department (no standalone housing authority). Housing Resource Center walk-in: 104 N. Witchduck Road, M/Tu/Th/F 8am–noon.",
    applyUrl: "https://housing.virginiabeach.gov",
    phone: "(757) 385-4847",
  },
  {
    id: "virginia-housing-hcv",
    pha: "Virginia Housing (State HCV Program)",
    city: "Statewide",
    county: "Multiple",
    state: "VA",
    status: "unknown",
    program: "HCV",
    lastUpdated: "2026-03-30",
    notes: "Virginia Housing administers HCV regionally across the state. Check website for current regional waitlist status. Also administers HUD-VASH vouchers for veterans in coordination with the Hampton VAMC.",
    applyUrl: "https://www.virginiahousing.com/en/renters/housing-choice-voucher-program",
    phone: "1-800-227-8432",
  },
];

export const ALL_WAITLISTS: WaitlistEntry[] = [...NJ_WAITLISTS, ...VA_757_WAITLISTS];

export function getWaitlistsByCounty(county: string, state = "NJ"): WaitlistEntry[] {
  const q = county.toLowerCase();
  return ALL_WAITLISTS.filter(
    (w) => w.state === state && (w.county.toLowerCase().includes(q) || w.city.toLowerCase().includes(q))
  );
}

export function getWaitlistsByRegion(region: "nj" | "757"): WaitlistEntry[] {
  return region === "nj" ? NJ_WAITLISTS : VA_757_WAITLISTS;
}

export function getAllWaitlists(): WaitlistEntry[] {
  return ALL_WAITLISTS;
}
