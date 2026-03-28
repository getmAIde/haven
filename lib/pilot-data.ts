/**
 * PILOT Agreement data — Camden, NJ focus
 * PILOT = Payment In Lieu Of Taxes (N.J.S.A. 40A:20-1 et seq.)
 *
 * PILOTs are negotiated agreements between developers and municipalities.
 * Instead of paying full property taxes, developers pay a lower annual fee.
 * In exchange, they often make affordable housing commitments.
 * These commitments are frequently unenforceable in practice.
 *
 * Data sources: CRDA, Camden City records, OPRA filings, NJ DCA.
 * Records are public. Access via: crda.org, camdennj.gov, or file an OPRA request.
 */

export interface PILOTEntry {
  id: string
  name: string
  developer: string
  location: string
  type: "residential" | "commercial" | "mixed-use"
  termYears: number
  approxValue: string           // estimated annual tax savings
  affordableUnitsPromised?: number
  affordableDefinition?: string // how "affordable" is defined in the deal
  amiLevel?: string             // % of Area Median Income
  camdenAMI2025: string        // what that actually means in Camden dollars
  status: "active" | "expired" | "unknown"
  notes: string
  source: string
}

export interface PILOTQuestion {
  q: string
  a: string
}

export const PILOT_EXPLAINER = {
  what: `A PILOT (Payment In Lieu Of Taxes) is a deal between a developer and a city. Instead of paying full property taxes on a new building, the developer pays a smaller annual fee — usually 10–20% of what the taxes would be. The city forgoes the rest as a subsidy to attract development.`,

  catch: `In residential projects, NJ law often requires developers to include affordable units in exchange for the PILOT. The problem: "affordable" is defined in the contract, and the definition often doesn't match what Camden residents can actually afford. A unit "affordable at 80% AMI" might rent for $1,200/month in a city where median income is about $27,000.`,

  camdenContext: `Camden has used PILOTs extensively since the early 2000s as part of its redevelopment push — waterfront, downtown, and neighborhoods near Cooper University Hospital. The deals are negotiated by the Camden Redevelopment Agency (CRDA) and the city. Records are public but scattered across multiple agencies. Most residents have no idea these deals exist.`,

  gap: `The gap between what was promised in a PILOT and what was actually built is the housing story in Camden. Billions in tax subsidies have flowed to developers. The affordable unit commitments — when they exist — often serve households earning far more than Camden's actual residents earn. The people these deals were supposed to benefit are still on the waitlist.`,
}

export const CAMDEN_AMI_CONTEXT = {
  camdenMedianHHI: "$27,400",
  camdenMetroAMI2025: "$82,100", // HUD AMI for the Camden MSA (Camden + Burlington + Salem counties)
  note: "Camden City's median household income (~$27,400) is about 33% of the metro AMI used to calculate 'affordability.' A unit 'affordable at 80% AMI' in the Camden metro is affordable to a household earning ~$65,680 — more than twice what the median Camden resident earns.",
  implication: "When a PILOT agreement says '20% of units affordable at 80% AMI,' it often means zero units are affordable to people actually living in Camden today.",
}

// Known Camden PILOT / tax abatement deals (public record)
// These are structural/contextual — for specific unit counts and financial terms,
// pull the actual agreement via OPRA or CRDA.org
export const CAMDEN_PILOTS: PILOTEntry[] = [
  {
    id: "crda-waterfront",
    name: "Delaware Waterfront Redevelopment Zone",
    developer: "Multiple (CRDA-administered)",
    location: "Delaware River waterfront, Camden NJ",
    type: "mixed-use",
    termYears: 30,
    approxValue: "Varies by parcel — tens of millions in total tax forgiveness",
    amiLevel: "Varies by project",
    camdenAMI2025: "See individual project filings",
    status: "active",
    notes:
      "CRDA administers PILOTs across the waterfront redevelopment zone established in the late 1990s. Individual agreements vary. Hotel, office, and residential projects all received PILOTs. Affordable housing commitments exist in some residential projects but enforcement records are limited.",
    source: "crda.org · OPRA request to Camden City Clerk",
  },
  {
    id: "michaels-organization",
    name: "Michaels Organization Residential Projects",
    developer: "The Michaels Organization (Marlton, NJ)",
    location: "Multiple sites, Camden City",
    type: "residential",
    termYears: 30,
    approxValue: "Estimated $500K–$2M annually per project in forgiven taxes",
    affordableUnitsPromised: undefined,
    amiLevel: "30–60% AMI (varies by project and funding source)",
    camdenAMI2025: "30% AMI ≈ $24,630/yr household income; 60% AMI ≈ $49,260/yr",
    status: "active",
    notes:
      "The Michaels Organization is Camden's largest affordable housing developer. Several projects use Low Income Housing Tax Credits (LIHTC) in combination with PILOTs — these tend to have stronger affordability requirements than PILOT-only deals. Units at 30–40% AMI are genuinely affordable to current Camden residents. Units at 60%+ AMI less so.",
    source: "NJ DCA LIHTC database · CRDA filings",
  },
  {
    id: "cooper-lanning",
    name: "Cooper's Lanning Square / Lanning Square West",
    developer: "Pennrose / Cooper's Ferry Partnership",
    location: "Lanning Square neighborhood, Camden",
    type: "residential",
    termYears: 30,
    approxValue: "Estimated $300K–$800K annually",
    amiLevel: "Mixed: 30–60% AMI for income-restricted units",
    camdenAMI2025: "30% AMI ≈ household income $24,630; 60% AMI ≈ $49,260",
    status: "active",
    notes:
      "Part of the Choice Neighborhoods transformation of the Lanning Square area. Combines HUD Choice Neighborhoods grant, LIHTC, and city PILOT. More rigorous affordability requirements than pure PILOT deals due to federal funding overlay.",
    source: "HUD Choice Neighborhoods · NJ DCA · CRDA",
  },
  {
    id: "conifer-village",
    name: "Conifer Village / Market-Rate Conversions",
    developer: "Various",
    location: "Various Camden neighborhoods",
    type: "residential",
    termYears: 30,
    approxValue: "Varies",
    amiLevel: "80–120% AMI in some projects",
    camdenAMI2025: "80% AMI ≈ household income $65,680 — well above Camden median of ~$27,400",
    status: "active",
    notes:
      "Some Camden residential PILOTs define 'affordable' at 80–120% AMI. At these levels, 'affordable' units are priced above what most Camden residents can pay. This is the affordability gap: the deal checks a box, the actual residents remain unhoused or displaced.",
    source: "NJ DCA · Camden City Clerk",
  },
]

export const PILOT_QUESTIONS: PILOTQuestion[] = [
  {
    q: "What percentage of units are designated affordable?",
    a: "A common standard is 20%. But what counts as affordable — the AMI level — varies widely. Ask for the specific breakdown: how many units at 30% AMI, 40%, 50%, 60%, 80%?",
  },
  {
    q: "How is 'affordable' defined in this agreement?",
    a: "The AMI used is usually the metro area AMI, not Camden City's actual income. A unit 'affordable at 80% AMI' costs more per month than Camden's median income can support. Always ask what the actual monthly rent will be.",
  },
  {
    q: "What happens to the affordable units when the PILOT expires?",
    a: "Most PILOTs run 30 years. When they expire, developers begin paying full property taxes — and often raise rents or convert to market rate. The 30-year clock on affordable housing in Camden's redevelopment zones started in the early 2000s.",
  },
  {
    q: "What does the developer pay instead of taxes?",
    a: "Typically 10–20% of the assessed value per year, called a 'PILOT payment,' goes to the city. The city forgoes the other 80–90% as the subsidy. Calculate the total subsidy over 30 years and compare it to the value of the affordable units promised.",
  },
  {
    q: "Who enforces the affordable unit commitments?",
    a: "Technically the city and CRDA. In practice, enforcement is often weak. There is rarely a resident advocate at the PILOT negotiation table. Monitoring affordable unit compliance requires active oversight that most municipalities don't have staff for.",
  },
  {
    q: "How do I access a specific PILOT agreement in Camden?",
    a: "File an OPRA (Open Public Records Act) request with the Camden City Clerk or the CRDA. OPRA requests are free and must be answered within 7 business days. Template: 'I am requesting all PILOT agreements for the property at [address], including all amendments and compliance reports.'",
  },
]
