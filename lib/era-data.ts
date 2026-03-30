/**
 * Emergency Rental Assistance (ERA) data — NJ + Camden specific
 * Programs and contacts current as of March 2026.
 * Note: funding status changes frequently — always verify with 211.
 */

export interface ERAProgram {
  id: string
  name: string
  who: string           // who administers it
  eligibility: string   // plain language
  maxHelp: string       // what it covers
  howToApply: string
  phone?: string
  url?: string
  timeToFunds: string
  camdenSpecific: boolean
  region: "nj" | "757" | "all"
  agentOverlap?: string[]   // which agents share this resource: "VAL" | "Agnes" | "Phoenix"
  notes?: string
}

export interface ERAFact {
  q: string
  a: string
}

export const ERA_PROGRAMS: ERAProgram[] = [
  {
    id: "nj-dca-hpp",
    name: "NJ Housing & Utility Assistance",
    who: "NJ Dept of Community Affairs (DCA)",
    eligibility:
      "NJ renters at or below 80% Area Median Income who have experienced financial hardship. Documented income required.",
    maxHelp: "Up to 18 months of rental arrears (past-due rent) and up to 3 months of future rent. Utility arrears also covered in some cases.",
    howToApply: "Apply online through the NJ DCA housing portal (njhousing.gov) or call 211 for in-person help. You will need: ID, lease, landlord contact, proof of income, and documentation of hardship.",
    phone: "1-800-382-4556",
    url: "https://www.nj.gov/dca/divisions/dhcr/offices/hrc.html",
    timeToFunds: "Varies widely — 2 to 8 weeks. Apply as early as possible. If you have a court date, tell the judge you have a pending ERA application — courts routinely grant continuances.",
    camdenSpecific: false,
    region: "nj",
    notes: "If your landlord refuses to participate in the ERA process, NJ law allows the tenant to receive funds directly in some cases.",
  },
  {
    id: "camden-county-oaa",
    name: "Camden County Office of Aging & Disability Services",
    who: "Camden County",
    eligibility: "Camden County residents age 60+ with housing emergencies.",
    maxHelp: "Emergency rental and utility assistance. Amount varies by available funding.",
    howToApply: "Call directly or contact through 211.",
    phone: "(856) 858-3220",
    timeToFunds: "1–2 weeks for emergency cases.",
    camdenSpecific: true,
    region: "nj",
    agentOverlap: ["Agnes"],
  },
  {
    id: "catholic-charities-camden",
    name: "Catholic Charities Diocese of Camden",
    who: "Catholic Charities",
    eligibility:
      "Camden County residents in emergency financial hardship. Open to all regardless of religion or immigration status.",
    maxHelp: "One-time emergency rental assistance (amount varies by available funding). Can sometimes prevent a warrant for removal when other options are exhausted.",
    howToApply: "Call to schedule an intake appointment. Bring ID, lease, and evidence of hardship (eviction notice, past-due bills).",
    phone: "(856) 342-4100",
    timeToFunds: "Usually within a week for emergency cases.",
    camdenSpecific: true,
    region: "nj",
  },
  {
    id: "st-josephs",
    name: "St. Joseph's Carpenter Society",
    who: "St. Joseph's Carpenter Society (Camden)",
    eligibility: "Camden City residents. Focus on low-income households in housing crisis.",
    maxHelp: "Emergency rental assistance, housing counseling, and mortgage assistance.",
    howToApply: "Call or walk in. 1626 Ferry Ave, Camden NJ 08104.",
    phone: "(856) 541-2804",
    timeToFunds: "Varies; call to ask about current capacity.",
    camdenSpecific: true,
    region: "nj",
  },
  {
    id: "hopeworks",
    name: "Hopeworks",
    who: "Hopeworks (Camden)",
    eligibility: "Young people 18–26 in Camden. Wraparound services including emergency housing support.",
    maxHelp: "Housing navigation, emergency funds, case management. Not strictly a rental payment program — more of a comprehensive navigator.",
    howToApply: "Contact directly or through 211.",
    phone: "(856) 342-8900",
    timeToFunds: "Varies by case.",
    camdenSpecific: true,
    region: "nj",
    notes: "Best for young adults who need ongoing support beyond a single rent payment.",
  },

  // ── Hampton Roads / 757 Virginia ──────────────────────────────────────────

  {
    id: "va-211",
    name: "Virginia 211 — Housing & Rental Assistance Referral",
    who: "Virginia 211 (statewide)",
    eligibility: "Any Virginia resident. 211 connects you to the right program based on your situation, city, and income.",
    maxHelp: "Referral service — connects to ERA programs, shelters, utility assistance, and food. Not a direct payer.",
    howToApply: "Dial 211. Text your ZIP to 898-211. Available 24/7.",
    phone: "2-1-1",
    url: "https://211virginia.org",
    timeToFunds: "Immediate referral. Funds depend on program you're referred to.",
    camdenSpecific: false,
    region: "757",
    notes: "Start here if you don't know which program applies. 211 staff know current funding status, which waitlists are open, and what's available in your specific city.",
  },
  {
    id: "forkids",
    name: "ForKids Inc. — Emergency Housing for Families",
    who: "ForKids Inc. (Norfolk)",
    eligibility: "Families with children experiencing homelessness or housing crisis in Hampton Roads. ForKids is the largest family homelessness provider in Virginia.",
    maxHelp: "Emergency shelter, transitional housing, rapid rehousing, and housing stability services. Financial assistance for families at risk of homelessness.",
    howToApply: "Call the Housing Crisis Hotline: (757) 756-5600. Walk-in: 4200 Colley Ave, Norfolk VA 23508.",
    phone: "(757) 756-5600",
    url: "https://www.forkids.org",
    timeToFunds: "Emergency placements same-day when space available. Rapid rehousing typically 2–4 weeks.",
    camdenSpecific: false,
    region: "757",
    notes: "Priority for families with children. If you have a housing crisis with kids involved, ForKids is the first call.",
  },
  {
    id: "link-hr-ssvf",
    name: "LINK of Hampton Roads — SSVF Veteran Housing (VAL)",
    who: "LINK of Hampton Roads (Newport News)",
    eligibility: "Veterans and their families experiencing homelessness or at risk of homelessness in Hampton Roads. SSVF (Supportive Services for Veteran Families) provides rapid rehousing and eviction prevention.",
    maxHelp: "Rapid rehousing, eviction prevention funds, case management, and connection to VA benefits. SSVF can pay rental arrears, security deposits, and first/last month.",
    howToApply: "Call LINK of Hampton Roads: (757) 587-4202. Referrals also through Hampton VAMC social work: (757) 722-9961.",
    phone: "(757) 587-4202",
    url: "https://linkhr.org",
    timeToFunds: "SSVF programs typically move faster than standard ERA — 1–2 weeks for urgent cases.",
    camdenSpecific: false,
    region: "757",
    agentOverlap: ["VAL"],
    notes: "VAL overlap: SSVF and HUD-VASH are the primary VA housing tools for homeless and at-risk veterans. LINK administers SSVF in Hampton Roads. HUD-VASH vouchers come through Virginia Housing. If the person is a veteran, this is the first call — not the regular PHA.",
  },
  {
    id: "ssseva-senior-housing",
    name: "Senior Services of Southeastern Virginia (SSSEVA) — Senior Housing Assistance (Agnes)",
    who: "Senior Services of Southeastern Virginia (SSSEVA)",
    eligibility: "Adults 60+ in South Hampton Roads (Norfolk, Virginia Beach, Chesapeake, Portsmouth, Suffolk) facing housing instability. SSSEVA is the Area Agency on Aging for the region.",
    maxHelp: "Care coordination, options counseling, connection to Section 202 elderly housing, emergency assistance linkage, and caregiver support. Also administers Meals on Wheels and I-Ride transit.",
    howToApply: "Call SSSEVA: (757) 461-9481. Also reachable through Virginia 211.",
    phone: "(757) 461-9481",
    url: "https://www.ssseva.org",
    timeToFunds: "Varies by service type. Options counseling immediate. Financial assistance referral 1–2 weeks.",
    camdenSpecific: false,
    region: "757",
    agentOverlap: ["Agnes"],
    notes: "Agnes overlap: SSSEVA is the AAA for Southside Hampton Roads — the primary contact for any senior (60+) housing issue in Norfolk, VB, Chesapeake, Portsmouth, or Suffolk. For the Peninsula (Newport News, Hampton), the equivalent is Peninsula Agency on Aging (PAA): (757) 873-0541.",
  },
  {
    id: "paa-senior-housing",
    name: "Peninsula Agency on Aging (PAA) — Senior Housing Assistance (Agnes)",
    who: "Peninsula Agency on Aging (PAA)",
    eligibility: "Adults 60+ in Newport News, Hampton, Williamsburg, Poquoson, James City County, and York County facing housing instability.",
    maxHelp: "Options counseling, care coordination, connection to senior housing resources, and VICAP Medicare counseling. Covers Peninsula AAA region.",
    howToApply: "Call PAA: (757) 873-0541. Walk-in: 739 Thimble Shoals Blvd., Suite 1006, Newport News VA 23606.",
    phone: "(757) 873-0541",
    url: "https://paainc.org",
    timeToFunds: "Immediate counseling. Financial linkage 1–2 weeks.",
    camdenSpecific: false,
    region: "757",
    agentOverlap: ["Agnes"],
    notes: "Agnes overlap: PAA is the Peninsula counterpart to SSSEVA. Any senior housing crisis in Hampton or Newport News goes through PAA first.",
  },
  {
    id: "step-up-reentry-housing",
    name: "Step-Up Inc. — Reentry Housing Navigation (Phoenix)",
    who: "Step-Up Inc. (Norfolk — all 7 Hampton Roads cities)",
    eligibility: "People recently released from incarceration across all 7 Hampton Roads cities. Step-Up is the flagship reentry organization in the region — pre-release in all local jails.",
    maxHelp: "Housing navigation, transitional housing referrals, employment connections (Smithfield Foods partnership), case management, and wraparound reentry support.",
    howToApply: "Call Step-Up Inc.: (757) 588-3151. Walk-in: 5900 E. Virginia Beach Blvd Suite 102, Norfolk VA 23502. Contact Sandra Brandt, Executive Director.",
    phone: "(757) 588-3151",
    url: "https://stepupforlife.org",
    timeToFunds: "Housing navigation immediate. Transitional housing placement varies by availability.",
    camdenSpecific: false,
    region: "757",
    agentOverlap: ["Phoenix"],
    notes: "Phoenix overlap: Step-Up is the primary reentry housing anchor for all 757. They have pre-release relationships in every local jail — people should be connected BEFORE release if possible. Next Journey VA (NARR Level 2 recovery residences, MAT-friendly, both genders) is a complementary option for those needing recovery housing.",
  },
  {
    id: "union-mission-emergency",
    name: "Union Mission Ministries — Emergency Shelter",
    who: "Union Mission Ministries (Norfolk)",
    eligibility: "Adults facing homelessness in Hampton Roads. 125+ year history. Emergency shelter and long-term recovery programs.",
    maxHelp: "Emergency overnight shelter, meals, and long-term residential recovery programs. Open regardless of immigration status or religion.",
    howToApply: "Walk-in or call: (757) 627-8686. 5100 E. Virginia Beach Blvd, Norfolk VA 23502.",
    phone: "(757) 627-8686",
    url: "https://www.unionmission.org",
    timeToFunds: "Emergency shelter same-day when space available.",
    camdenSpecific: false,
    region: "757",
    agentOverlap: ["Phoenix"],
    notes: "Phoenix overlap: Union Mission takes people coming out of incarceration. For reentry specifically, combine with Step-Up for case management.",
  },
  {
    id: "laseva-housing-legal",
    name: "Legal Aid Society of Eastern Virginia (LASEVA) — Free Housing Legal Help",
    who: "Legal Aid Society of Eastern Virginia",
    eligibility: "Low-income residents of Hampton Roads (income ≤ 125% federal poverty level). Civil legal help including housing cases, eviction defense, landlord-tenant disputes.",
    maxHelp: "Free legal representation or advice for eviction defense, housing rights, benefits disputes. Covers housing, benefits, family law, and employment.",
    howToApply: "Call intake: (757) 827-5078. Tidewater office: 125 St. Paul's Blvd., Suite 400, Norfolk. Peninsula office: 30 West Queens Way, Hampton. Intake hours: M/Tu/Th/F 9am–1pm.",
    phone: "(757) 827-5078",
    url: "https://laseva.org",
    timeToFunds: "Legal advice often same-week. Representation case-by-case.",
    camdenSpecific: false,
    region: "757",
    notes: "Equivalent to South Jersey Legal Services in Camden. Always the first call for eviction defense in Hampton Roads.",
  },
  {
    id: "hrcap",
    name: "HRCAP — Emergency Rental Assistance (Newport News + Hampton)",
    who: "Hampton Roads Community Action Program (HRCAP)",
    eligibility: "Low-income residents of Newport News and Hampton facing housing emergencies.",
    maxHelp: "Emergency rental assistance, utility assistance, and housing stabilization services.",
    howToApply: "Call HRCAP or visit hrcapinc.org. Check website for current intake process.",
    url: "https://hrcapinc.org",
    timeToFunds: "Typically 2–3 weeks.",
    camdenSpecific: false,
    region: "757",
    notes: "Serves the Peninsula — Newport News and Hampton specifically. For Southside (Norfolk, VB), use Virginia 211 to identify the right ERA provider.",
  },
]

export function getERAByRegion(region: "nj" | "757"): ERAProgram[] {
  return ERA_PROGRAMS.filter((p) => p.region === region || p.region === "all");
}

export const ERA_FACTS: ERAFact[] = [
  {
    q: "Can ERA stop an eviction that's already in court?",
    a: "Yes — if you have a pending ERA application, tell the judge immediately. Courts routinely grant continuances (postponements) to allow ERA processing. Bring documentation of your application: confirmation number, date submitted, any correspondence.",
  },
  {
    q: "How long does ERA take — will it arrive before my court date?",
    a: "Usually not fast enough if you just applied. Most programs take 2–8 weeks to process. Apply NOW, then use the pending application to get a court continuance. Do not wait until after your court date to apply.",
  },
  {
    q: "My landlord refuses to accept ERA funds. What happens?",
    a: "Under NJ law, if a landlord refuses to participate in ERA, you may be eligible to receive the funds directly in some programs. Tell the ERA program administrator that your landlord is refusing. Also tell your attorney or Legal Services — a landlord refusing ERA while pursuing eviction may be a relevant factor in court.",
  },
  {
    q: "Does applying for ERA show up on my record?",
    a: "No. Applying for rental assistance is not a public record and does not affect your credit or rental history.",
  },
  {
    q: "What's the difference between ERA and Section 8?",
    a: "ERA is a one-time or short-term emergency payment to cover arrears (back rent you owe). Section 8 (Housing Choice Voucher) is an ongoing subsidy that reduces your rent every month. ERA is for a crisis. Section 8 is long-term — and in Camden, the waitlist is currently closed.",
  },
  {
    q: "I'm undocumented. Can I apply for ERA?",
    a: "Some programs are available regardless of immigration status, particularly those run by nonprofits like Catholic Charities. Federally-administered programs have more restrictions. Call 211 — they can tell you which programs are open to you without requiring status verification.",
  },
]
