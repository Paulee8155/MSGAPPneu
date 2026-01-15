# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MSG Krandienst Material-Check App** - An Appsmith-based material tracking system for crane service operations.

The app tracks 50+ crane equipment items (ballast weights, hooks, extensions, safety equipment) across 15 vehicles (6 trucks, 4 trailers, 5 cranes) and enables drivers to scan QR codes to check materials on/off their vehicles for job orders.

**Live Application:** https://paule.appsmith.com/applications/696512d08589eb4b1bb0a7c8/pages/696512d08589eb4b1bb0a7cb

## Git Workflow

The repository uses **Appsmith Git Sync** with a specific workflow:

1. **Local Changes:** Make changes to files in `MSGAPP/` directory
2. **Commit & Push:** Commit locally and push to GitHub master branch
3. **Appsmith Sync:** Appsmith automatically pulls from GitHub master
4. **Bidirectional:** Changes in Appsmith UI are also pushed back to GitHub

```bash
cd MSGAPP
git add .
git commit -m "Description"
git push origin master
```

**Important:** If Appsmith shows "merge branch master" error when pulling, the user needs to:
1. Open Appsmith Git panel
2. Commit any uncommitted changes in Appsmith
3. Push from Appsmith
4. Then pull will work

## Architecture

### Page-Scoped Architecture

Appsmith uses **page-scoped JSObjects** - business logic is NOT shared between pages. Each page has its own copies of:
- `MaterialData.js` - Material inventory and CRUD operations
- `FahrerData.js` - Driver/vehicle management
- `HistorieData.js` - Scan history tracking
- `AuftragsData.js` - Job order management (Admin only)
- `TemplateData.js` - Job templates (Admin only)

**Why?** Appsmith's runtime scoping requires duplication. When implementing features across multiple pages, you must update the JSObject on EACH page.

### Global State

Cross-page data sharing uses **Appsmith Store API**:
```javascript
// Store value
await storeValue("auftraege", auftraegeArray, false);

// Retrieve value
const auftraege = appsmith.store.auftraege || [];
```

Used for: Job orders (AuftragsData)

### Three Pages

1. **Home** (`pages/Home/`) - Driver interface for scanning materials
   - QR code scanner widget
   - Material checklist
   - Progress tracking
   - "Losfahren" (start trip) button

2. **Admin** (`pages/Admin/`) - Back-office management
   - Material CRUD operations
   - Create job orders from templates
   - Assign materials to drivers
   - Template management (T001-T008)

3. **MaterialUebersicht** (`pages/MaterialUebersicht/`) - Dashboard
   - Material status overview (available, on vehicles, in use)
   - Location distribution table
   - Material search functionality
   - Recent scan activity

## Data Structures

### Material Object
```javascript
{
  id: "M001",              // M001-M050 (50 materials)
  name: "Ballast 500kg",
  standort: "Lager Halle 1", // Location
  kategorie: "Gewicht",    // Gewicht, Anbauteil, Gestänge, Zubehör, Sicherheit
  gescannt: false,         // Scan status
  gewicht: 500             // Weight in kg
}
```

### Driver/Vehicle Object
```javascript
{
  id: 1,
  name: "Max Schmidt",
  geraet: "LKW-1",         // Vehicle ID
  typ: "LKW",              // LKW, Auflieger, Kran
  maxZuladung: 12000       // Max load in kg (12t for LKW, 24t for Auflieger, 5t for Kran)
}
```

### Job Order Object
```javascript
{
  id: "A001",
  datum: "2026-01-14",
  fahrerId: 1,
  fahrerName: "Max Schmidt",
  templateId: "T001",
  templateName: "Brückenbau Standard",
  materialienIds: ["M005", "M012", ...], // Array of material IDs
  status: "offen"          // offen, abgeschlossen
}
```

### History Entry Object
```javascript
{
  materialId: "M001",
  materialName: "Ballast 500kg",
  fahrerId: 1,
  fahrerName: "Max Schmidt",
  auftragId: "A001",
  timestamp: "2026-01-14T08:30:00Z",
  aktion: "gescannt",
  vonStandort: "Lager Halle 1",
  zuStandort: "LKW-1"
}
```

## Key Business Logic

### Material Scanning Flow (Home page)

1. Driver selects themselves (`FahrerData.setFahrer()`)
2. System loads their assigned job order (`AuftragsData.getAuftragFuerFahrer()`)
3. Driver scans QR code (`Scan_Actions.scanQRCode()`)
4. Material status updated (`MaterialData.scanMaterial()`)
5. History entry created (`HistorieData.addScanEntry()`)
6. Progress recalculated (`MaterialData.getProgress()`)
7. When all materials scanned, "Losfahren" button activates

### Material Management (Admin page)

- **Add:** `AdminActions.addMaterial()` → `MaterialData.addMaterial()`
- **Edit:** Select row → Modal opens → `AdminActions.editMaterial()`
- **Delete:** `AdminActions.deleteMaterial()` → `MaterialData.deleteMaterial()`
- **Next ID:** `MaterialData.getNextId()` auto-generates M051, M052, etc.

### Job Order Creation (Admin page)

1. Select driver from dropdown
2. Select template (T001-T008)
3. Template provides pre-configured material list
4. `AuftragsData.createAuftrag()` creates order
5. Order stored in Appsmith Store
6. Driver sees order on Home page

## MSG Branding

**Primary Color:** `#003366` (Dunkelblau / Dark Blue)

Applied to:
- Buttons: `buttonColor: "#003366"`
- Headers: `backgroundColor: "#003366"` with `textColor: "#FFFFFF"`
- Table accents: `accentColor: "#003366"`
- Borders: `borderColor: "#003366"`

**DO NOT use green (#15803d) or cyan (#C7F3F0)** - these were from old design.

## File Structure Patterns

```
MSGAPP/pages/{PageName}/
├── {PageName}.json                    # Page configuration
├── canvas.json                        # Canvas layout
├── jsobjects/                         # Business logic
│   ├── MaterialData/
│   │   ├── MaterialData.js
│   │   └── metadata.json
│   ├── FahrerData/
│   │   ├── FahrerData.js
│   │   └── metadata.json
│   └── ...
├── widgets/                           # UI components (JSON configs)
│   ├── Button1.json
│   ├── Table1.json
│   ├── Text1.json
│   └── ...
└── queries/                           # Query metadata (auto-generated)
```

## Common Tasks

### Adding a New Feature Across All Pages

Example: Adding a new function to MaterialData

1. Update `pages/Admin/jsobjects/MaterialData/MaterialData.js`
2. Update `pages/Home/jsobjects/MaterialData/MaterialData.js`
3. Update `pages/MaterialUebersicht/jsobjects/MaterialData/MaterialData.js`
4. Commit all three files together
5. Test in each page context

### Modifying Widget Properties

Widgets are JSON configuration files. Common properties:
- `isVisible: true/false` - Show/hide widget
- `isDisabled: true/false` - Enable/disable interaction
- `backgroundColor`, `textColor` - Colors
- `onClick`, `onSubmit` - Event handlers (reference JSObject functions)
- `tableData: "{{DashboardData.getStandortVerteilung()}}"` - Data binding

Always use Appsmith's mustache syntax `{{...}}` for dynamic values.

### Working with Appsmith Store

```javascript
// Writing to store (async)
await storeValue("key", value, false);

// Reading from store
const value = appsmith.store.key || defaultValue;

// Store persists across pages but NOT across sessions
// Use for: Job orders, temporary state
// Don't use for: Material inventory (use JSObject arrays)
```

## Testing Locally

This is an Appsmith cloud application - there is no local development server.

**To test changes:**
1. Push to GitHub master branch
2. In Appsmith, click Git panel → Pull
3. Test directly in Appsmith live editor
4. Use browser DevTools console for debugging

**Appsmith limitations:**
- No local build/test cycle
- Cannot run Jest/Vitest tests
- Cannot use npm/node packages
- Limited to ES6 JavaScript in JSObjects

## Important Constraints

1. **No Node.js imports** - Cannot use `import` from npm packages in JSObjects
2. **ES6 only** - Use `export default { ... }` syntax for JSObjects
3. **No async/await in object properties** - Only in function definitions
4. **showAlert() is global** - Appsmith-provided function for user notifications
5. **Widget references** - Access via `WidgetName.propertyName` (e.g., `Table1.selectedRow`)

## Debugging

Use browser console to inspect Appsmith runtime:
```javascript
// Check current store state
console.log(appsmith.store);

// Check MaterialData state
console.log(MaterialData.materialien);

// Check selected table row
console.log(Table1.selectedRow);
```

## Known Issues & Gotchas

1. **Git Sync Conflicts:** If Appsmith shows "merge branch master", user must commit in Appsmith UI first
2. **Page Scope:** Changing MaterialData on one page doesn't affect others - update all three
3. **Widget Naming:** Appsmith auto-generates names (Button1, Button2). Document what each widget does
4. **Store Persistence:** Appsmith Store clears on app reload - not suitable for permanent data
5. **Scan History Limit:** HistorieData keeps max 500 entries to prevent memory issues

## Current Implementation Status

**Completed Phases:**
- ✅ Phase 9: Material-Übersicht Dashboard (MaterialUebersicht page)
- ✅ Phase 11: Material-Historie & Audit-Trail (HistorieData on all pages)

**Skipped:**
- ⏭️ Phase 10: Gewichtskalkulation (weight calculation) - deliberately skipped per user request

**Pending:**
- Phase 12: Material-Reservierung & Konfliktmanagement
- Phase 13: Export functionality
- Phase 14: Smart features (favorites, suggestions)
- Phase 15: Edge case handling

See implementation plan in: `~/.claude/plans/fluffy-munching-garden.md`
