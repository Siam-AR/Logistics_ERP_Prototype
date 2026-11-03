---
name: BisTech Logistics
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#001626'
  on-tertiary: '#ffffff'
  tertiary-container: '#002b45'
  on-tertiary-container: '#2f96db'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for mission-critical supply chain, fleet operations, and enterprise logistics orchestration. The target audience comprises logistics planners, fleet dispatchers, warehouse operators, and supply chain analysts who process dense, real-time data under operational velocity. 

The aesthetic is **Precision Corporate Minimalist** with industrial enterprise rigor. The visual tone delivers reliability, structural clarity, and low-cognitive-load focus. Interfaces reject decorative clutter in favor of scannable status hierarchies, hairline data segmentations, and deliberate structural alignment. The experience must feel dependable, rapid, and transparent—conveying institutional competence while supporting sustained, 8-hour continuous operator focus without visual fatigue.

## Colors

The palette establishes an authoritative slate and deep navy foundation offset by vibrant operational indicators.

### Base & Structural Surfaces
- **Canvas Base:** `#f8fafc` (Slate 50) delivers a clean, glare-free working background.
- **Surface Elevation:** `#ffffff` (Pure White) serves as the primary card, sheet, and table container background.
- **Surface Secondary:** `#f1f5f9` (Slate 100) used for table headers, embedded sub-panels, and inactive controls.
- **Border Hairlines:** `#e2e8f0` (Slate 200) defines clean borders; `#cbd5e1` (Slate 300) for active control strokes.

### Brand & Core Neutrals
- **Primary Foundation (`#1e293b`):** Deep Navy/Slate 800 for high-level structure, active nav items, master buttons, and primary headers.
- **Deep Anchor (`#0f172a`):** Slate 900 reserved for primary text, numeric KPIs, and master status headings.
- **Secondary Interaction (`#2563eb`):** Royal Blue 600 for interactive states, focused links, batch triggers, and primary progress arcs.
- **Tertiary Utility (`#0284c7`):** Sky 600 for inline tools, analytical filters, and telematics coordinates.
- **Neutral Meta (`#64748b`):** Slate 500 for secondary descriptions, table column meta-labels, timestamps, and resting iconography.

### Operational Semantic System
Statuses must be strictly color-coded across all tables, maps, and timeline badges:
- **Available / Settled / In-Stock (Emerald):** Text `#065f46`, background `#ecfdf5`, border `#a7f3d0`.
- **Low-Stock / Pending / Maintenance (Amber):** Text `#92400e`, background `#fffbeb`, border `#fde68a`.
- **On Trip / In Transit (Indigo):** Text `#3730a3`, background `#eef2ff`, border `#c7d2fe`.
- **Exception / Credit / Debit Alert (Rose):** Text `#9f1239`, background `#fff1f2`, border `#fecdd3`.

## Typography

Inter serves as the primary typographic driver across headers, operational labels, and continuous body text. To prioritize tabular scannability, all numeric values, quantities, waybill identifiers, vehicle license tags, and currency figures must render with tabular numerals enabled (`font-variant-numeric: tabular-nums`).

JetBrains Mono is incorporated strictly as a specialized level (`data-mono`) for machine-readable payloads, tracking tokens, carrier routing codes, and raw sensor telemetry.

Headline tracking is slightly condensed to preserve horizontal real estate in dense operational layouts. Body text maintains strict line height proportions to prevent vertical jumping between multi-line table cells and badge rows.

## Layout & Spacing

The layout philosophy follows a multi-tiered fluid-grid model anchored by a structural, collapsible sidebar navigation system. 

- **Primary Canvas Grid:** 12-column dynamic grid system with `gutter-desktop` (1.5rem / 24px) spacing on desktop screens, transitioning to an 8-column layout on tablet, and a single-column 4-gutter stack on mobile.
- **Shell Layout:** Top bar fixed at 56px height, persistent left navigation drawer fixed at 240px width (collapsible to 64px icon-only rail). The main viewport expands fluidly to fill 100% of remaining horizontal width without arbitrary max-width constraints, allowing enterprise tables to utilize ultra-wide screens.
- **Data Density:** Layout uses an 8px base rhythm. For spatial tables and dense forms, the micro scale (`space-xs` to `space-md`) governs spacing between inputs, icon pairings, and line items. The standard content boundary uses `space-lg` (20px), while multi-card canvas gutters use `space-xl` (32px).

## Elevation & Depth

Visual hierarchy relies on crisp, low-contrast outlines and structural surface contrast rather than heavy atmospheric dropshadows. This keeps interfaces crisp when multiple panels and sub-tables are nested.

- **Level 0 (Base Canvas):** `#f8fafc` flat background, zero shadow, zero border.
- **Level 1 (Cards, Data Tables, Form Sections):** `#ffffff` fill, framed by a continuous 1px hairline border (`#e2e8f0`). No box-shadow is applied at rest; spatial separation is achieved purely through color transition against the `#f8fafc` canvas.
- **Level 2 (Hovered Records & Dropdowns):** `#ffffff` fill, 1px border (`#cbd5e1`), with an ultra-subtle ambient shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Flyout Drawers & Modal Sheets):** `#ffffff` fill, supported by an ambient depth shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Modals and drawers must pair with a semi-transparent slate scrim (`rgba(15, 23, 42, 0.45)` with `backdrop-filter: blur(2px)`).

## Shapes

The design system enforces a disciplined, compact shape system (`roundedness: 1`, base 4px radius) suited for high-density enterprise software.

- **Base Radius (4px / 0.25rem):** Form inputs, buttons, status chips, dropdown triggers, and breadcrumbs. This prevents wasted space in corners and keeps tabular arrays structurally aligned.
- **Container Radius (8px / 0.5rem):** Surface cards, master data tables, modal dialog windows, and drawer panels.
- **Full Pill (`9999px`):** Used exclusively for compact micro status tags, quantitative indicator pills, and counter avatars where visual differentiation from interactive rectangular buttons is required.

## Components

### Buttons
- **Primary:** Background `#1e293b`, text `#ffffff`, border 1px solid transparent, 4px border-radius, height 36px (compact) or 40px (standard). Hover: `#0f172a`. Active: `#334155`.
- **Secondary (Action):** Background `#2563eb`, text `#ffffff`. Hover: `#1d4ed8`.
- **Outline / Ghost:** Background transparent, text `#1e293b`, border 1px solid `#e2e8f0`. Hover: `#f1f5f9`.
- **Destructive:** Background `#fff1f2`, text `#9f1239`, border 1px solid `#fecdd3`. Hover: `#ffe4e6`.

### Status Badges & Chips
- Defined as inline-flex items with 20px fixed height, 4px corner radius (or pill-shaped), horizontal padding of 8px.
- Text rendered using `label-sm` with uppercase transformation.
- State pairs strictly match the color matrix:
  - *Available / Settled / In-Stock:* `#ecfdf5` background, `#065f46` text, `#a7f3d0` border.
  - *Low-Stock / Pending / Maintenance:* `#fffbeb` background, `#92400e` text, `#fde68a` border.
  - *On Trip / In Transit:* `#eef2ff` background, `#3730a3` text, `#c7d2fe` border.
  - *Exception / Financial Alerts:* `#fff1f2` background, `#9f1239` text, `#fecdd3` border.

### Data Tables
- Header row height: 40px, background `#f1f5f9`, border-bottom 1px solid `#e2e8f0`. Typography: `label-sm` in `#64748b` with uppercase tracking.
- Table body row height: 48px standard, 36px in compact dense-mode. Row border-bottom: 1px solid `#f1f5f9`. Hover state: `#f8fafc`.
- Column alignments: Left-aligned for text/entities, center-aligned for badge indicators, right-aligned for numeric quantities and values using `data-mono` or tabular numerals.

### Input Fields & Controls
- Height: 36px. Background: `#ffffff`. Border: 1px solid `#cbd5e1`. Internal padding: 8px 12px. Typography: `body-md`.
- Focus state: Border color `#2563eb`, ring highlight `0 0 0 2px rgba(37, 99, 235, 0.15)`. No default browser outlines.
- Checkboxes and Radios: 16px × 16px square/circle with 1px solid `#cbd5e1`. Checked background: `#2563eb`.

### Cards & Metrics (KPI Tiles)
- Background `#ffffff`, border 1px solid `#e2e8f0`, padding 16px or 20px. 
- Layout: Top line contains neutral meta label (`label-md` in `#64748b`) paired with an optional top-right contextual icon. Center features large numerical value (`headline-xl` in `#0f172a`), followed by delta trend tags or status micro-pills below.

### Drawers & Slide-Over Forms
- Drawer panels dock to the right side of the screen with fixed widths: 480px for standard edits, 720px for multi-tab waybill dispatches.
- Header pinned at 56px with close trigger; sticky footer containing paired secondary/primary actions over border-top 1px solid `#e2e8f0`.