// laws-database.js - NYC Housing & Tenant Rights Reference

const HOUSING_LAWS = {
  'New York': {
    'New York City': {
      state: 'NY',
      region: 'NYC',
      rentControl: {
        summary: 'Rent Stabilization protects ~966,000 units; market-rate units negotiated',
        details: [
          '<strong>Rent Stabilization:</strong> Applies to buildings with 6+ units built before 1/1/1974',
          'Annual increase set by RGB (Rent Guidelines Board), typically 2-5.5% per year',
          'Legal max rent increases: RGB vote occurs annually; for 1-year leases: currently varies by board decision',
          'Preferential rent: Some units have "preferential rent" below legal maximum—confirm in lease',
          'Individual Contract (Market-Rate): No cap on increases at lease renewal, but must follow NYC lease laws',
          '<strong>Key point:</strong> Check your lease or building address to determine if stabilized',
          'Stabilized units: Tenant cannot be displaced due to rent increase alone',
          'Transfer of building: New owner must honor existing stabilized leases and RGB schedule'
        ]
      },
      habitability: {
        summary: 'NYC Housing Maintenance Code requires landlord to maintain habitable conditions',
        details: [
          '<strong>Heat/Hot Water:</strong> Heat minimum 68°F (Oct 1 - May 31); hot water ≥120°F 24/7',
          'If no heat/hot water: Tenant can file HP (Housing Court) action or repair-and-deduct',
          'Vermin/Pest Control: No rodents, cockroaches, or bed bugs allowed; landlord must treat within 14 days of notice',
          'Mold/Moisture: Landlord must maintain dry conditions; tenant can request inspection by NYC DOB',
          'Windows: All windows must have locks; broken windows must be repaired',
          'Doors: Entrance doors must have working locks and self-closing mechanisms',
          'Electrical: All outlets must be grounded; no exposed wiring; landlord must repair within 24 hours if hazardous',
          'Plumbing: All fixtures must work; no leaks or water damage; 24-hour emergency repair requirement',
          'Paint/Lead: Lead paint disclosure required (pre-1978 units); peeling paint = lead hazard violation',
          'Tenant right to "repair and deduct": Can hire licensed contractor and deduct from rent if landlord fails to repair',
          'Warranty of Habitability: If unit becomes uninhabitable, tenant may withhold rent (escrow account), vacate, or sue',
          'No retaliation: Landlord cannot evict/harass tenant for reporting violations'
        ]
      },
      fairHousing: {
        summary: 'NYC and NY law provide broader protections than federal Fair Housing Act',
        details: [
          '<strong>Protected Classes (NYC Human Rights Law):</strong> Race, color, religion, national origin, gender, gender identity, sexual orientation, disability, age, marital status, familial status, domestic violence victim status, "lawful source of income"',
          '<strong>Broader than federal law:</strong> NY/NYC includes gender identity, sexual orientation, source of income, and domestic violence status',
          '<strong>Source of Income:</strong> Cannot discriminate based on Section 8 vouchers, public assistance, pension, child support, or other income sources',
          'Familial Status: Cannot refuse tenants because they have children; cannot charge extra for children',
          'Disability/Reasonable Accommodation: Landlord must allow service animals and accessibility modifications (ramps, grab bars, etc.)',
          'Religious Attire: Landlord cannot prohibit headscarves, yarmulkes, or other religious dress in common areas',
          'Criminal History: Landlord can consider conviction only if "business-related"; cannot refuse based on arrest or conviction alone',
          'Domestic Violence: Landlord cannot discriminate against victims; cannot terminate lease based on DV-related police calls',
          'Immigration Status: Landlord cannot discriminate based on immigration status or country of origin',
          '<strong>Testing for Discrimination:</strong> NYC Commission on Human Rights can test landlords; violations = fines up to $10,000+',
          'Complaint Process: File with NYC Commission on Human Rights (311 or @cityofnewyork.gov)',
          'Right to Counsel: Tenants have right to free/low-cost legal help in housing matters (ask for referral)'
        ]
      },
      landlordTenantRights: {
        summary: 'Detailed tenant rights vs. landlord obligations under NY Property & Housing Maintenance Law',
        details: [
          '<strong>LEASE REQUIREMENTS:</strong>',
          'All residential leases must be in writing (oral leases invalid)',
          'Lease must specify: rent amount, lease term, utilities, any charges/fees',
          'Lease must include notice of Rent Stabilization status (if applicable) and RGB lease language',
          'Landlord cannot require "fees" beyond first month + last month + security deposit (no "broker fees" from tenant)',
          '<strong>RENT PAYMENT & NOTICES:</strong>',
          'Rent is due on the date specified in lease; landlord must provide written receipt if paid in cash',
          'Landlord must provide 30-day notice for lease non-renewal (or actual notice period in lease)',
          'Landlord must provide 30-90 day notice before eviction (depends on reason)',
          'Notice must specify reason for eviction and legal basis',
          '<strong>SECURITY DEPOSITS:</strong>',
          'Maximum: 1 month\'s rent (exception: up to 1.5x for high-income tenants)',
          'Must be held in separate, interest-bearing escrow account in NY',
          'Landlord must return within 14 days of lease end with itemized deductions',
          'Cannot deduct for normal wear-and-tear; only for damage beyond normal use',
          'Interest accrued belongs to tenant; landlord cannot keep it',
          'If landlord fails to return: tenant can sue for double the deposit + interest',
          '<strong>EVICTION PROCESS:</strong>',
          '"Just Cause" required: Landlord must have legal reason (nonpayment, lease violation, owner move-in, etc.)',
          'Nonpayment: Landlord must serve 3-day notice to pay or quit before filing; 3+ days to cure',
          'Holdover (lease violation): 10-30 day notice depending on violation type',
          'Owner Move-In: 120-day notice required; tenant may be entitled to relocation assistance ($10,500+)',
          'Eviction can only proceed through Housing Court (Judge required); self-help eviction is illegal',
          'Tenant has right to attorney; if cannot afford, can request legal aid',
          'Landlord cannot change locks, remove belongings, or shut off utilities (illegal eviction = $5,000 fine)',
          '<strong>TENANT RIGHTS IN DISPUTES:</strong>',
          'Tenant can file Housing (HP) Action in court for habitability violations',
          'Tenant can request Harassment Prevention Order if landlord is harassing',
          'Tenant can join tenant union or advocacy group; landlord cannot retaliate',
          'Tenant can request building inspection by NYC Department of Buildings (DOB)',
          'Tenant can contact 311 to report violations; DOB will issue violations to landlord',
          '<strong>REPAIRS & MAINTENANCE:</strong>',
          'Emergency repairs (no heat, no water, fire hazard): 24-hour maximum to repair',
          'Non-emergency repairs: 24 hours to 30 days depending on severity code',
          'If landlord fails: Tenant can file HP action, get repair by city, or use repair & deduct',
          'Landlord cannot retaliate within 1 year of repair complaint',
          '<strong>LANDLORD RIGHTS (Limited in NY):</strong>',
          'Right to collect rent on due date (with 5-day grace period customary)',
          'Right to evict for valid cause (but must follow strict legal procedures)',
          'Right to inspect premises with 24-hour notice (except emergencies)',
          'Right to repossess (but only through court order, not self-help)',
          'Right to charge for damage beyond normal wear (not maintenance/repairs)'
        ]
      },
      notes: '⚠️ NYC tenant laws are tenant-favorable. Landlord retaliation for complaints is illegal. Always get complaints in writing. Contact legal aid if needed (CJAB, Housing Court Help, or call 311). Habitability complaints (repairs) do NOT have to be in writing to be valid, but written is better for evidence.'
    }
  }
};

// Helper function to get laws by city
function getLawsByCity(city, state) {
  if (HOUSING_LAWS[state] && HOUSING_LAWS[state][city]) {
    return HOUSING_LAWS[state][city];
  }
  return null;
}

// Get all available cities
function getAvailableCities() {
  const cities = [];
  for (let state in HOUSING_LAWS) {
    for (let city in HOUSING_LAWS[state]) {
      cities.push({ city, state });
    }
  }
  return cities;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HOUSING_LAWS, getLawsByCity, getAvailableCities };
}
