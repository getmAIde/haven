/**
 * Virginia tenant rights data — plain-language summaries by scenario.
 * Virginia Residential Landlord and Tenant Act (VRLTA) § 55.1-1200 et seq.
 * Hampton Roads / 757 specific notes where they apply.
 *
 * Agent overlap notes:
 *   VAL: HUD-VASH and SSVF vouchers — coordinate with VAL for veteran-specific housing navigation
 *   Agnes: Section 202 elderly housing, SSSEVA assistance — coordinate with Agnes for seniors 60+
 *   Phoenix: Transitional housing post-release — coordinate with Phoenix for reentry housing
 */

import type { RightsEntry } from "./nj-rights";

export const VA_TENANT_RIGHTS: RightsEntry[] = [
  {
    scenario: "eviction_notice",
    plain: "In Virginia, your landlord must give you written notice before filing for eviction. For nonpayment of rent, the landlord must give you a 5-Day Pay or Quit notice. If you pay in full within 5 days — or redeem once within a 12-month period — the eviction stops. For lease violations, the landlord must give a 30-day notice to cure or vacate. Virginia law (VRLTA § 55.1-1245) requires the notice to state the specific reason and the exact amount owed.",
    deadline: "5 days to pay in full for nonpayment of rent. 21 days to cure other lease violations (landlord must give 30-day notice with 21 days to fix). If you receive an Unlawful Detainer summons, you MUST appear in court.",
    contacts: [
      { name: "Legal Aid Society of Eastern Virginia (LASEVA)", phone: "(757) 827-5078", url: "https://laseva.org" },
      { name: "Virginia Housing Counseling (HUD-approved)", url: "https://www.virginiahousing.com/en/renters/housing-counseling" },
      { name: "Virginia 211 — Housing Resources", phone: "2-1-1", url: "https://211virginia.org" },
    ],
  },
  {
    scenario: "summary_dispossess",
    plain: "In Virginia, an eviction lawsuit is called an 'Unlawful Detainer.' It is filed in General District Court. You will receive a summons with a court date — usually 21 days away. You MUST appear or you will automatically lose and a judgment will be entered against you. At the hearing you can present defenses: the landlord didn't give proper notice, your unit has habitability problems (no heat, mold, broken plumbing), or the landlord retaliated against you for complaining to code enforcement. After a judgment, Virginia law provides a 10-day appeal window before a writ of possession can issue.",
    deadline: "Appear on the date on the court summons. You have 10 days after judgment to appeal to Circuit Court. Do not miss either date.",
    contacts: [
      { name: "Virginia Courts Self-Help", url: "https://www.courts.state.va.us/courtadmin/aoc/djs/programs/shc/home.html" },
      { name: "Legal Aid Society of Eastern Virginia (LASEVA)", phone: "(757) 827-5078", url: "https://laseva.org" },
      { name: "LASEVA Peninsula Office (Hampton)", phone: "(757) 275-0080", url: "https://laseva.org" },
    ],
  },
  {
    scenario: "habitability",
    plain: "Virginia landlords are required by the VRLTA (§ 55.1-1234) to maintain rental units in a habitable condition — heat, hot water, working plumbing, no dangerous conditions, no rodent or insect infestations. If your landlord has ignored documented problems, you can: give written notice and withhold rent by paying it into an escrow account, repair and deduct up to one month's rent (once per year), or use violations as a defense in eviction court. You must give written notice to the landlord first and allow a reasonable time to fix the problem (typically 14–21 days for non-emergency, 24 hours for emergency).",
    contacts: [
      { name: "Hampton Roads city code enforcement — call 311 in your city", phone: "311", url: "https://www.norfolk.gov/311" },
      { name: "Legal Aid Society of Eastern Virginia (LASEVA)", phone: "(757) 827-5078", url: "https://laseva.org" },
      { name: "Virginia Tenant's Rights Handbook (PDF)", url: "https://www.dhcd.virginia.gov/sites/default/files/Docx/rental-assistance/vrlta-handbook.pdf" },
    ],
  },
  {
    scenario: "rent_increase",
    plain: "Virginia has no rent control statewide — landlords can raise rent to any amount. However, they must give you proper written notice: 30 days for month-to-month tenants, or notice before lease renewal for fixed-term leases. If you are in a federally subsidized unit (Section 8, HUD-VASH, Section 202), rent increases are regulated by HUD and require HUD approval — your landlord cannot simply raise rent above the HUD-approved amount.",
    contacts: [
      { name: "Legal Aid Society of Eastern Virginia (LASEVA)", phone: "(757) 827-5078", url: "https://laseva.org" },
      { name: "Virginia Housing — Renters' Resources", url: "https://www.virginiahousing.com/en/renters" },
      { name: "HUD Tenant Rights — Rent Increases", url: "https://www.hud.gov/topics/rental_assistance/tenantrights" },
    ],
  },
  {
    scenario: "section_8_voucher",
    plain: "A Housing Choice Voucher (Section 8) pays the difference between your share (typically 30% of income) and the fair market rent. Your landlord must keep the unit up to HUD housing quality standards — inspections are required before move-in and annually. If the unit fails inspection and the landlord refuses to fix it, the Housing Authority can stop payments. You have the right to request an informal hearing if your voucher is reduced, suspended, or terminated. Your voucher is portable — you can move to another unit or even another city and keep it.",
    contacts: [
      { name: "Norfolk Redevelopment and Housing Authority (NRHA)", phone: "(757) 664-4486", url: "https://nrha.us" },
      { name: "Hampton Redevelopment and Housing Authority (HRHA)", phone: "(757) 727-1111", url: "http://www.hamptonrha.com" },
      { name: "Virginia Housing (state HCV / HUD-VASH)", phone: "1-800-227-8432", url: "https://www.virginiahousing.com/en/renters/housing-choice-voucher-program" },
    ],
  },
  {
    scenario: "security_deposit",
    plain: "Virginia law (VRLTA § 55.1-1226) caps security deposits at 2 months' rent. Your landlord must return your deposit within 45 days of move-out, with an itemized written statement of any deductions. They can only deduct for actual damages beyond normal wear and tear, unpaid rent, or other specific charges in your lease. If they fail to return the deposit or provide the itemization within 45 days, you may be entitled to the full deposit back plus damages.",
    deadline: "Landlord has 45 days after move-out to return deposit + itemization. File in Small Claims Court (General District Court) if the deadline passes.",
    contacts: [
      { name: "Virginia General District Court (Small Claims)", url: "https://www.courts.state.va.us/courts/gd.html" },
      { name: "Legal Aid Society of Eastern Virginia (LASEVA)", phone: "(757) 827-5078", url: "https://laseva.org" },
      { name: "Virginia Tenant's Rights Handbook", url: "https://www.dhcd.virginia.gov/sites/default/files/Docx/rental-assistance/vrlta-handbook.pdf" },
    ],
  },
];

export { type RightsEntry };
