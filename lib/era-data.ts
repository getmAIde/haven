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
    notes: "Best for young adults who need ongoing support beyond a single rent payment.",
  },
]

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
