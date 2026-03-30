/**
 * NJ tenant rights data — plain-language summaries by scenario.
 * Camden-specific addenda noted inline.
 */

export interface RightsEntry {
  scenario: string;
  plain: string;
  deadline?: string;
  camdenNote?: string;
  contacts: { name: string; phone?: string; url: string }[];
}

export const NJ_TENANT_RIGHTS: RightsEntry[] = [
  {
    scenario: "eviction_notice",
    plain: "In New Jersey, your landlord must give you written notice before filing for eviction. For nonpayment of rent, the landlord must give you a 3-day Notice to Quit stating the exact amount owed. If you pay in full before a court judgment, the eviction is stopped — even after the 3 days. If the notice is missing required information or wasn't delivered properly, the court case may be dismissed.",
    deadline: "3 days from notice to pay or vacate (nonpayment). 1 month notice for most lease violations. You can still pay and stop the eviction any time before a final court judgment.",
    camdenNote: "Camden City has an Office of Rent Regulations. If your rent increase was illegal under the rent control ordinance, that is a valid defense to an eviction for nonpayment of the increase. Call (856) 757-7000.",
    contacts: [
      { name: "Legal Services of NJ", phone: "1-888-576-5529", url: "https://www.lsnj.org" },
      { name: "NJ DCA Eviction Defense Program", url: "https://www.nj.gov/dca/divisions/dhcr/offices/evictiondefense.html" },
      { name: "Camden County Bar — Lawyer Referral", phone: "(856) 482-0620", url: "https://www.camdencountybar.org" },
    ],
  },
  {
    scenario: "summary_dispossess",
    plain: "A 'Complaint for Summary Dispossess' is the formal court filing that starts an eviction case in New Jersey. It is filed in Special Civil Part court. You will receive a court date — usually 7–10 days away. You MUST appear or you will automatically lose. At the hearing, you can present defenses: the landlord didn't give proper notice, your unit has habitability problems (heat, plumbing, leaks), the landlord retaliated against you for complaining, or the rent increase was illegal. Bring documentation.",
    deadline: "Appear on the date printed on the court summons. Do not miss this.",
    contacts: [
      { name: "NJ Courts Self-Help", url: "https://www.njcourts.gov/self-help/landlord-tenant" },
      { name: "Legal Services of NJ", phone: "1-888-576-5529", url: "https://www.lsnj.org" },
      { name: "NJ DCA Eviction Defense Program", url: "https://www.nj.gov/dca/divisions/dhcr/offices/evictiondefense.html" },
    ],
  },
  {
    scenario: "habitability",
    plain: "New Jersey landlords are legally required to keep rental units habitable — heat, hot water, functioning plumbing, no pest infestations, no dangerous conditions. If your unit has serious problems your landlord has ignored, you have rights: you can withhold rent and pay it into court (called 'rent withholding'), repair the problem and deduct the cost, or use the violations as a defense if your landlord tries to evict you. You must have documented the problem and given the landlord a reasonable chance to fix it.",
    camdenNote: "Camden City has a Bureau of Housing Inspections. You can file a complaint online or in person. If violations are documented, they become part of the public record and can be used in court. Call the DCA Bureau of Housing Inspection: (609) 633-6218.",
    contacts: [
      { name: "NJ Bureau of Housing Inspection", phone: "(609) 633-6218", url: "https://www.nj.gov/dca/codes/offices/housinginspection.shtml" },
      { name: "City of Camden Housing Services", phone: "(856) 757-7000", url: "https://www.camdennj.gov/housing-services/" },
      { name: "Legal Services of NJ", phone: "1-888-576-5529", url: "https://www.lsnj.org" },
    ],
  },
  {
    scenario: "rent_increase",
    plain: "In New Jersey, most tenants are protected from unreasonable rent increases. Your landlord must give you written notice of any rent increase — typically 30 days for month-to-month leases, or at the end of a fixed lease term. The increase cannot be retaliatory (i.e., in response to your complaints). In cities with rent control, there are legal limits on how much rent can be raised each year.",
    camdenNote: "Camden has a rent control ordinance. The Office of Rent Regulations enforces annual increase limits. If your increase exceeds the allowed amount, you can file a complaint at Camden City Hall or call (856) 757-7000. You may owe nothing above the legal cap.",
    contacts: [
      { name: "Camden Office of Rent Regulations", phone: "(856) 757-7000", url: "https://www.camdennj.gov/housing-services/" },
      { name: "NJ DCA Tenant Hotline", phone: "1-800-382-4556", url: "https://www.nj.gov/dca/codes/tenanthelp.shtml" },
    ],
  },
  {
    scenario: "section_8_voucher",
    plain: "A Housing Choice Voucher (Section 8) helps you pay rent. Your voucher covers the difference between your share (usually 30% of your income) and the fair market rent for your area. Your landlord must maintain the unit to HUD housing quality standards — if they don't, the Housing Authority can stop payments. You have the right to request a hearing if your voucher is reduced or terminated. You can also move to a new unit and keep your voucher ('portability') — contact your Housing Authority for details.",
    camdenNote: "The Housing Authority of the City of Camden (HACC) administers Section 8 in Camden. If your unit failed a HUD inspection, you are entitled to know the specific violations. A HUD OIG audit found 16 of 17 Camden Section 8 units failed standards — many tenants were never told. Contact HACC at (856) 968-4100.",
    contacts: [
      { name: "Housing Authority City of Camden", phone: "(856) 968-4100", url: "https://camdenhousing.org" },
      { name: "NJ DCA Housing Choice Voucher", url: "https://www.nj.gov/dca/divisions/dhcr/programs/hcv.html" },
      { name: "HUD Tenant Rights", url: "https://www.hud.gov/topics/rental_assistance/tenantrights" },
    ],
  },
  {
    scenario: "security_deposit",
    plain: "In New Jersey, your landlord can charge up to 1.5 months rent as a security deposit. It must be kept in a separate bank account and you must receive written notice of where it is held. After you move out, the landlord has 30 days to return it (with itemized deductions) or must send a written statement of deductions. If they don't, you can sue for double the deposit amount plus attorney's fees in Small Claims Court.",
    deadline: "30 days after move-out for landlord to return deposit or send itemized deductions.",
    contacts: [
      { name: "NJ DCA Tenant Hotline", phone: "1-800-382-4556", url: "https://www.nj.gov/dca/codes/tenanthelp.shtml" },
      { name: "NJ Small Claims Court", url: "https://www.njcourts.gov/self-help/small-claims" },
    ],
  },
];

export function getRightsEntry(scenario: string): RightsEntry | undefined {
  return NJ_TENANT_RIGHTS.find((r) => r.scenario === scenario);
}
