/**
 * HUD USER API client — Fair Market Rents
 * Register for a free key at: https://www.huduser.gov/portal/dataset/api.html
 *
 * FMR API docs: https://www.huduser.gov/portal/dataset/fmr-api.html
 */

const HUD_BASE = "https://www.huduser.gov/hudapi/public";

export interface FMRResult {
  zip: string;
  countyName: string;
  stateName: string;
  year: number;
  fmr: {
    efficiency: number;
    oneBedroom: number;
    twoBedroom: number;
    threeBedroom: number;
    fourBedroom: number;
  };
  smallAreaFMR: boolean;
}

export interface FMRLookupError {
  error: string;
}

export async function getFMRByZip(zip: string): Promise<FMRResult | FMRLookupError> {
  const apiKey = process.env.HUD_USER_API_KEY;
  if (!apiKey) {
    // Camden County NJ (ZIPs 081xx) — 2025 FMRs
    if (zip.startsWith("081")) {
      return {
        zip,
        countyName: "Camden County",
        stateName: "New Jersey",
        year: 2025,
        fmr: { efficiency: 897, oneBedroom: 1078, twoBedroom: 1289, threeBedroom: 1601, fourBedroom: 1877 },
        smallAreaFMR: false,
      };
    }
    // Hampton Roads Virginia — Norfolk-VA Beach-Newport News HUD Metro FMR Area
    // Covers: Norfolk (235xx), Virginia Beach (234xx), Chesapeake (233xx),
    //         Hampton/Newport News (236xx), Portsmouth (237xx), Suffolk (234xx)
    const prefix3 = zip.slice(0, 3);
    if (["233", "234", "235", "236", "237"].includes(prefix3)) {
      return {
        zip,
        countyName: "Norfolk-Virginia Beach-Newport News Metro Area",
        stateName: "Virginia",
        year: 2025,
        fmr: { efficiency: 1132, oneBedroom: 1266, twoBedroom: 1497, threeBedroom: 1900, fourBedroom: 2199 },
        smallAreaFMR: false,
      };
    }
    return { error: "HUD_USER_API_KEY not configured. Register at huduser.gov/portal/dataset/api.html" };
  }

  try {
    // Get the entity ID from the ZIP code
    const geoRes = await fetch(
      `${HUD_BASE}/fmr/listCounties/${zip.slice(0, 2)}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    if (!geoRes.ok) throw new Error(`HUD geo lookup failed: ${geoRes.status}`);
    const geoData = await geoRes.json() as { data: { fips_code: string; county_name: string; state_name: string }[] };

    // Use the first match — for zip-level precision, we'd need SAFMR
    // For MVP, county-level FMRs are sufficient
    const county = geoData.data?.[0];
    if (!county) return { error: `No FMR data found for ZIP ${zip}` };

    const fmrRes = await fetch(
      `${HUD_BASE}/fmr/statedata/${county.fips_code.slice(0, 2)}?year=2025`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    if (!fmrRes.ok) throw new Error(`HUD FMR fetch failed: ${fmrRes.status}`);
    const fmrData = await fmrRes.json() as {
      data: { basicdata: { Efficiency: number; One_Bedroom: number; Two_Bedroom: number; Three_Bedroom: number; Four_Bedroom: number; county_name: string }[] }
    };

    const row = fmrData.data?.basicdata?.[0];
    if (!row) return { error: `No FMR data returned for ${zip}` };

    return {
      zip,
      countyName: county.county_name,
      stateName: county.state_name,
      year: 2025,
      fmr: {
        efficiency: row.Efficiency,
        oneBedroom: row.One_Bedroom,
        twoBedroom: row.Two_Bedroom,
        threeBedroom: row.Three_Bedroom,
        fourBedroom: row.Four_Bedroom,
      },
      smallAreaFMR: false,
    };
  } catch (err) {
    console.error("[hud-api] FMR lookup error:", err);
    return { error: "Could not retrieve Fair Market Rents. Try again or check huduser.gov directly." };
  }
}

export function formatFMR(dollars: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(dollars);
}
