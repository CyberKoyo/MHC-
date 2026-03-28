# NYC Housing Laws Chrome Extension - Setup Guide

## 📍 Project Overview

**Urban Housing Laws** is a Chrome extension that displays quick-reference information on **NYC tenant rights and protections** directly within Zillow. When you view a property listing on Zillow, the extension auto-detects the address and instantly shows you housing laws and tenant protections relevant to that location.

**Current Focus:** New York City, NY

**Law Categories:**
1. 💰 **Rent Stabilization** – Are you in a stabilized unit? What are rent increase caps?
2. 🏠 **Habitability Standards** – Heat, hot water, repairs, pest control requirements
3. ⚖️ **Fair Housing Laws** – Discrimination protections (broader than federal law)
4. 📋 **Landlord-Tenant Rights** – Lease rules, eviction procedures, tenant remedies

---

## 🚀 Installation & Testing (5 min)

### Step 1: Prepare the Files

Create a folder called `nyc-housing-laws` with these 8 files:
```
nyc-housing-laws/
├── manifest.json
├── content.js
├── background.js
├── popup.html
├── popup.css
├── popup.js
└── laws-database.js
```

### Step 2: Load into Chrome

1. Open Chrome and navigate to: `chrome://extensions/`
2. **Enable Developer Mode** (toggle in top right)
3. Click **Load unpacked**
4. Select your `nyc-housing-laws` folder
5. The extension appears in your extensions list (pin it to toolbar)

### Step 3: Test It

1. Go to **Zillow.com** and search for any NYC property
2. Click on a listing to view details
3. Click the **🏘️ NYC Housing Laws** extension icon
4. The extension will auto-detect the NYC address and display relevant laws
5. Click on any law section to expand and read details
6. Use the **Edit** button to manually search for a different NYC location

---

## 📝 How It Works

### Auto-Detection (Preferred)
- When you open a Zillow listing page, the content script (`content.js`) extracts the property address
- Address is parsed to extract city and state
- If detected, location appears in the popup with relevant laws
- **Auto-detection happens in < 1 second**

### Manual Entry (Fallback)
- If auto-detection fails, click the **Edit** button
- Type a location in format: `City, State` (e.g., "New York, NY" or "Manhattan, NY")
- Click **Search** or press Enter
- Laws appear instantly (currently only NYC data available)

### Law Display
- Each of the 4 law categories is an **expandable card**
- Click the title to expand/collapse detailed information
- All sections expand by default for quick reading
- Summary text gives you the key point; details provide specifics with examples

---

## 📚 Understanding NYC Tenant Laws

### Rent Stabilization (💰)
**What:** Protects ~966,000 NYC rental units from unlimited rent increases

- **Who:** Buildings with 6+ units built before 1/1/1974
- **How:** Annual increases capped by RGB (Rent Guidelines Board) vote
- **Typical:** 2-5.5% per year (varies by lease term: 1-year vs 2-year)
- **Key:** Check your lease—stabilized units have "Lease Rider" language

**Why this matters:** If you're in a stabilized unit, your rent **cannot** be raised beyond RGB limits and you **cannot** be evicted due to rent alone.

### Habitability Standards (🏠)
**What:** Minimum standards a landlord must meet to maintain a legal, livable apartment

**NYC requires:**
- Heat: 68°F minimum (Oct 1 - May 31)
- Hot water: Available 24/7, at least 120°F
- No vermin/mold/water damage
- Working plumbing, electrical, lights
- Safe locks, windows with locks
- Paint in good condition (lead-safe in pre-1978 units)

**Your remedy:** If landlord fails to repair:
1. Call 311 to report a violation (free city inspection)
2. File an HP (Housing) action in court to force repairs
3. Use "repair and deduct"—hire a licensed contractor and deduct from rent

### Fair Housing Laws (⚖️)
**What:** Illegal discrimination protections **broader than federal Fair Housing Act**

**NYC adds these protections:**
- ✅ Sexual orientation & gender identity (not protected federally)
- ✅ Source of income (Section 8 vouchers, public assistance)
- ✅ Domestic violence status
- ✅ Marital status, age

**Landlord cannot:**
- Refuse tenants because they have kids
- Discriminate based on race, color, religion, national origin
- Refuse to accept Section 8 vouchers
- Use criminal history alone to reject applicants
- Prohibit religious dress in common areas

**Your remedy:** File a complaint with NYC Commission on Human Rights (dial 311)

### Landlord-Tenant Rights (📋)
**What:** Your detailed rights and obligations in a lease relationship

**Key tenant protections:**
- ✅ Right to legal counsel (free/low-cost legal aid available)
- ✅ Right to habitability repairs at landlord's expense
- ✅ Right to privacy (landlord needs 24-hour notice to enter, except emergencies)
- ✅ Protection against retaliation (landlord cannot evict within 1 year of repair complaint)
- ✅ Right to deposit return within 14 days with itemized deductions

**Key landlord rights (limited in NY):**
- Collect rent on due date
- Evict for valid cause (through court only, not self-help)
- Repossess (through legal court order)
- Inspect premises with 24-hour notice

**Eviction process (must follow):**
1. Landlord serves notice (3-30 days depending on reason)
2. Tenant has right to cure if applicable
3. Landlord files in Housing Court (Judge required)
4. Tenant can request free legal aid
5. Court issues judgment if landlord wins
6. Marshal enforces eviction

---

## 🛠️ Technical Overview

### File Structure

**manifest.json**
- Defines extension permissions and scripts
- Registers content script on Zillow pages
- Sets up popup and background worker

**content.js**
- Runs on every Zillow page automatically
- Extracts property address from page DOM
- Parses address to extract city/state
- Sends location to background worker via `chrome.runtime.sendMessage()`
- Watches for page navigation changes

**popup.html / popup.css / popup.js**
- Popup UI: header, location display, law sections, footer
- Event listeners for button clicks and manual input
- Renders laws by fetching from `laws-database.js`
- Expandable/collapsible sections with smooth animations

**laws-database.js**
- Contains all NYC housing law information
- Organized by category (Rent Control, Habitability, Fair Housing, L-T Rights)
- Each category has summary + detailed bullet points
- Uses HTML formatting for bold/emphasis in details

**background.js**
- Service worker that runs in background
- Receives location messages from content script
- Stores location in Chrome's `storage.local`
- Persists data for popup to access

---

## 🔧 Customization & Expansion

### Adding More NYC Neighborhoods
The extension works across all of NYC (Manhattan, Brooklyn, Queens, Bronx, Staten Island). No code changes needed—just search by neighborhood name.

### Expanding to Other Cities
To add another city/state in the future:

1. Edit `laws-database.js`:
```javascript
'California': {
    'San Francisco': {
        state: 'CA',
        rentControl: { /* ... */ },
        habitability: { /* ... */ },
        fairHousing: { /* ... */ },
        landlordTenantRights: { /* ... */ },
        notes: '...'
    }
}
```

2. Update popup color scheme in `popup.css` if desired

3. Test on Zillow listings in the new city

### Improving Address Detection
If Zillow's page structure changes and addresses aren't detected:

1. Open DevTools on a Zillow listing (F12)
2. Inspect the address element
3. Add the selector to `addressSelectors` array in `content.js`:
```javascript
const addressSelectors = [
    'h1[data-test="home-details-summary-heading"]',
    '.new-selector-if-updated',  // ← Add here
    // ... rest
];
```

### Styling Changes
The extension uses blue (#3b82f6) as primary color with secondary colors per law category:
- Rent Control: Green (#10b981)
- Habitability: Amber (#f59e0b)
- Fair Housing: Red (#ef4444)
- L-T Rights: Purple (#8b5cf6)

Change colors in `popup.css` by modifying the `border-left-color` values.

---

## 📖 Resources for Renters

### NYC Legal Aid (Free)
- **311** – Call for city services, housing violations, legal aid referrals
- **Legal Aid Society** – Free legal representation: **212-577-3300**
- **CJAB (Community Justice Assistance Board)** – Legal aid directory: **www.cjab.org**
- **Housing Court Help Center** – Court guidance: **60 Centre Street, NYC**

### NYC Government Resources
- **NYC Housing Preservation & Development (HPD)** – Building violations, mold/pest: **hpd.gov** or **311**
- **NYC Commission on Human Rights** – Housing discrimination: **nycchr.org**
- **Tenant Rights NYC** – Info & resources: **TenantRightsNYC.org**

### Reliable Legal Websites
- **Nolo.com** – Free summaries of NY housing law
- **JustFix.nyc** – NYC tenant rights, complaint tools
- **MetCouncil on Housing** – Advocacy org with guides: **housingonboard.org**

---

## ❌ Troubleshooting

### Extension doesn't appear in toolbar
- Reload extension: Go to `chrome://extensions/`, find the extension, click the refresh icon
- Check for errors: Click extension, open DevTools (F12), check Console tab

### Address not auto-detecting on Zillow
- Make sure you're on a **listing detail page** (not search results)
- Try clicking on a different listing
- If still not working: Click **Edit** and manually enter the address

### Laws don't appear / show "Coming Soon"
- **Confirm you're in NYC** – Extension currently covers NYC only
- Try: "New York, NY" or "Manhattan, NY"
- Other cities will show a "Coming Soon" message

### Manual location input not working
- Make sure format is: `City, State` (e.g., "Brooklyn, NY")
- Press Enter or click Search button
- Check browser console (F12) for error messages

### Extension keeps showing "Detecting..."
- Wait a few seconds for auto-detection
- Or click **Edit** and manually search
- If all else fails, reload extension via `chrome://extensions/`

---

## 🚀 Next Steps for Your Group

**Phase 1 (Now):**
- ✅ Test on live Zillow listings
- ✅ Verify auto-detection works
- ✅ Test manual location input
- ✅ Check all 4 law categories display correctly

**Phase 2 (Soon):**
- Add a few more major cities (LA, SF, Boston, Chicago, etc.)
- Improve address detection (monitor Zillow's page structure changes)
- Add a FAQ/help section inside the extension

**Phase 3 (Later):**
- Create a backend database (JSON API) to serve law data
- Add comparison tool (compare laws across cities)
- Add user feedback form
- Publish to Chrome Web Store

**Phase 4 (Long-term):**
- Legal review by real estate attorney
- Add landlord perspective section
- Multi-language support
- Mobile-friendly Zillow app integration

---

## 📞 Support & Feedback

If you find bugs or have suggestions:
1. Check the **Troubleshooting** section above
2. Review your Chrome console (F12) for error messages
3. Test on a different Zillow listing
4. Consider adding console logging to debug

---

## 📜 Legal Disclaimer

**This extension is for informational purposes only.** It is **NOT legal advice**. Housing law is complex and varies by situation. 

**Always consult a qualified attorney** for:
- Specific lease disputes
- Eviction notices
- Filing lawsuits
- Serious violations

**Free legal aid available in NYC:**
- **311** (dial from any phone)
- **Legal Aid Society**: 212-577-3300
- **JustFix.nyc** (online resources)

---

**Version 1.0 – NYC Focus**
Built for your group to help NYC renters understand their rights. Good luck! 🏘️


