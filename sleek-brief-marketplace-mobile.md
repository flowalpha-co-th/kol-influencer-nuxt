# Sleek Design Brief — Ripples Marketplace Page (Mobile, 4 Variants)

> **Companion to** `sleek-brief-home-mobile.md`. This brief specifies the **functional/field requirements** of the Marketplace page. **Visual treatment for each of the 4 variants follows the 4 moods defined in the home brief** (Variant 1 = "Lifestyle Authentic", Variant 2 = "Friendly Studio", Variant 3 = "Aspirational Glow", Variant 4 = "Pro Dashboard"). The brand lockup, palette, typography, and ripple motif rules from the home brief apply unchanged here. Read that brief first.

---

## 1. Project Context

The Marketplace is the **authenticated creator's main browse surface** — where a logged-in Thai creator discovers brand campaigns, filters them by category and status, opens a detail view, and applies. It is the page a creator opens 3–5 times a day on their phone. Speed of scan, clarity of "should I apply?" signals, and one-tap apply are the priorities.

- **Route:** `/portal/campaigns` (auth'd, sits under the `portal` layout with a fixed top nav: Dashboard, Campaigns (active), Tasks, Wallet, Notifications, Profile)
- **Page name in product:** "Explore Campaigns" / "สำรวจแคมเปญ"
- **Data:** Mock today; real campaigns soon. Each campaign has image, brand logo, brand name, title, description, category, end date, budget min/max, # slots, # joined, requirements (min followers, platforms, content types)
- **User states tracked per campaign:** none / `pending` (applied, awaiting review) / `approved` (in progress, work in tasks page)

---

## 2. Deliverable

**4 high-fidelity mobile mockups** of the Marketplace page, each in the matching mood from the home brief.

- **Viewport:** 390 × ~2400px (full scrollable page)
- **Each variant covers the FULL feature scope** below — same fields, same states, same flows. Only the visual treatment changes between variants.
- **Output:** Figma-ready, layered, exportable at @2x

---

## 3. Style Direction — Match the 4 Home Variants

Each marketplace variant is the **logged-in companion** of its home counterpart. Carry over palette overlay, card treatment, button style, ripple motif usage, and typography rhythm.

| # | Style name | Mood reminder | Marketplace treatment cues |
|---|------------|---------------|-----------------------------|
| 1 | **Lifestyle Authentic** | Bright white + bold yellow blocks, real lifestyle photos, navy pill buttons with yellow arrow | Campaign cards lean editorial — big lifestyle hero image, jaunty pill chips for category. Yellow accent blocks break up the list every 3–4 cards. Stats inside cards rendered as oversized numerals. |
| 2 | **Friendly Studio** | Soft cream `#FFFBE0` + white cards + 3D illustrated accents, yellow pill buttons | Rounded white cards with soft shadows. Friendly illustration empty state. Filter chips as soft rounded pills. Numbered badges on applied/pending states. |
| 3 | **Aspirational Glow** | Dark navy gradient + yellow neon glow + concentric ripple-driven hero | Dark mode marketplace. Cards as glass-morphism panels with glowing yellow edges. Budget numbers glow. Filter chips have soft yellow halo when selected. Ripple motif used as section divider and badge accent. |
| 4 | **Pro Dashboard** | Deep navy + bright yellow accent lines + photorealistic SaaS feel | Dense, info-rich cards like a fintech dashboard. Yellow accent chart lines/sparklines on cards (e.g., "5 of 8 slots filled" as a glowing yellow progress bar). Stat strip at top. Sticky filter bar with hairline yellow underline on active state. |

Every variant must keep:
- Logo top-left in portal nav
- Navy `#516171` + Yellow `#FEE601` + matching backgrounds from home brief — no other colors
- Kanit font, TH+EN bilingual UI
- Ripple/concentric-circle motif somewhere (background, badge, divider, glow)
- Natural creator/brand photography — no duotone, no over-edited filters

---

## 4. Page Structure & Feature Spec

All 4 variants render the same 9 zones below. Bilingual copy provided where it appears on screen.

### Zone A — Portal Top Nav (persistent across portal)
- Logo (Ripples wordmark, top-left)
- Nav items (hamburger on mobile, opens drawer): Dashboard, **Campaigns (active state)**, Tasks, Wallet, Notifications (with red dot if unread), Profile (avatar circle)
- TH/EN toggle in drawer

### Zone B — Page Header
- Small badge above title: `แคมเปญ` / `Campaigns`
- H1: `สำรวจแคมเปญ` / `Explore Campaigns`
- Subtitle: `ค้นพบแคมเปญจากแบรนด์ชั้นนำและเริ่มสร้างรายได้วันนี้` / `Discover exciting brand campaigns and start earning as an influencer today.`

### Zone C — Search Bar
- Full-width rounded input
- Left icon: search (lucide `Search`)
- Placeholder: `ค้นหาแคมเปญ...` / `Search campaigns...`
- Clear "x" icon appears when there's text
- Optional: voice-input mic on the right for variants where it fits the mood

### Zone D — Category Filter Chips (horizontal scroll)
- 8 chips in a horizontally scrollable row (snaps): `All` (active by default), `Fashion`, `Beauty`, `Food`, `Tech`, `Lifestyle`, `Travel`, `Fitness`
- Active chip: filled with primary color of the variant (yellow `#FEE601` text or navy `#516171` background depending on theme)
- Inactive chip: outlined / ghost
- Thai labels: `ทั้งหมด · แฟชั่น · ความงาม · อาหาร · เทคโนโลยี · ไลฟ์สไตล์ · ท่องเที่ยว · ฟิตเนส`
- Small icon next to each label (optional, variants 2 and 4)

### Zone E — Status Filter (My Applications)
- Section label: `สถานะงาน` / `My Status`
- 3 chips: `All`, `Applied` (with `Clock` icon), `In Progress` (with `CheckCircle` icon)
- Count badge appended when > 0: `Applied (3)`, `In Progress (1)`
- Smaller than category chips visually (secondary filter row)
- Sticky or collapsible on scroll (variants 3 & 4 use sticky compressed filter bar)

### Zone F — Sort / View Switcher (NEW — not in current code, please design)
- Right-aligned bar above the list:
  - **Sort dropdown:** `Most Relevant` / `Highest Budget` / `Nearest Deadline` / `Newest`. Thai: `เกี่ยวข้องที่สุด · ราคาสูงสุด · ใกล้ปิดรับ · ใหม่ล่าสุด`
  - **View toggle:** card view (default) / list view (denser, no image), 2 icons
- Result count text on left: `แสดง 24 แคมเปญ` / `Showing 24 campaigns`

### Zone G — Campaign Card (the workhorse — design with care)
Mobile card, full width, vertical stack. Each variant treats it differently per the style table above, but the **fields are identical**:

1. **Image** (top, 16:9 aspect, rounded corners) — hero photo for the campaign
   - **Top-left badge** on image: category pill (e.g., `Beauty` / `ความงาม`)
   - **Top-right badge** on image: status pill `Open` / `เปิดรับ` (yellow background, navy text)
2. **Brand row** below image:
   - 24×24 circular brand logo
   - Brand name (e.g., "Sephora Thailand") in small grey text
3. **Campaign title** — bold, 1 line clamp (e.g., "Fall makeup collection launch")
4. **Description** — body text, 2 line clamp
5. **Meta row** (small grey, 2 inline items separated by dot):
   - 👥 `5/10` (joined / needed)
   - 📅 `31 May 2026` (deadline)
6. **Divider line**
7. **Bottom row** (flex space-between):
   - **Left:** label `Budget Range` / `ช่วงราคา` (xs grey) above `฿8,000 - ฿15,000` (semibold, accent color)
   - **Right:** CTA button — **state-dependent** (see below)

**CTA button states (logic):**
- Not yet applied → **Apply Now** / `สมัครเลย` — primary yellow button (or whatever the variant's primary CTA style is)
- Applied, pending review → **Pending Review** / `รออนุมัติ` — yellow-50 background, yellow-600 text, Clock icon, disabled
- Approved → **Go to Task** / `ไปที่งาน` — green button with CheckCircle icon (this is the ONE place green appears — keep it tasteful, success-only accent)

### Zone H — List Layout (vertical stack on mobile)
- One card per row, ~16px vertical gap
- Infinite scroll or paginated load-more button at the bottom: `Show more` / `ดูเพิ่มเติม`
- Optional sticky "scroll to top" floating button (bottom-right) in variants 3 & 4

### Zone I — Empty State
- When filters return zero results
- Centered ripple illustration (concentric circles in variant color)
- Heading: `No campaigns found` / `ไม่พบแคมเปญตามที่ค้นหา`
- Subtext: `Try clearing your filters or check back tomorrow.` / `ลองล้างตัวกรองหรือกลับมาดูใหม่พรุ่งนี้`
- "Clear filters" link button

---

## 5. Campaign Detail (Bottom Sheet / Modal on Mobile)

When a card is tapped, open a **bottom sheet** that slides up to ~90% viewport height (or full-screen modal in variant 4). Same content fields across all 4, only visual treatment differs.

### Detail Sheet Structure (top to bottom)
1. **Drag handle** (small horizontal bar at top — for variants where bottom sheet, not full modal)
2. **Hero image** — full-width, ~240px tall, rounded top corners
3. **Title row:**
   - Campaign title (h2, bold)
   - Brand name (small grey below)
4. **Badge row:** category pill + `Open` status pill (same as card)
5. **Two-column info cards:**
   - Left card: `ช่วงราคา` / `Budget Range` → `฿8,000 - ฿15,000` (large bold accent)
   - Right card: `กำหนดส่ง` / `Deadline` → `31 May 2026` (large bold)
6. **Description section:**
   - Heading: `รายละเอียด` / `Description`
   - Full description text (no line clamp here, full text)
7. **Requirements section:**
   - Heading: `ข้อกำหนด` / `Requirements`
   - 3 bullet points with green CheckCircle icons:
     - `ผู้ติดตามขั้นต่ำ 10,000 คน` / `Minimum 10,000 followers`
     - `แพลตฟอร์ม: Instagram, TikTok` / `Platforms: Instagram, TikTok`
     - `ประเภทคอนเทนต์: Reel, Story` / `Content types: Reel, Story`
8. **Slots indicator (NEW — please add):** small progress bar `5 of 10 slots filled` / `รับสมัคร 5/10 คน` with yellow progress fill
9. **Sticky bottom action bar** (always visible, not part of scroll):
   - Left: ghost button `Close` / `ปิด`
   - Right (flex-1): main CTA — Apply / Pending Review / Go to Task (same logic as card)

### Apply Confirmation Toast (after tap)
- Toast appears top of screen, slides in
- Title: `Applied successfully!` / `สมัครสำเร็จ!` with green CheckCircle
- Description: `We'll review your application within 1-3 business days` / `ระบบจะแจ้งผลภายใน 1-3 วันทำการ`
- Auto-dismiss 4s, swipe to dismiss
- Card state in list updates to "Pending Review" immediately

---

## 6. Sticky / Compressed Filter Bar on Scroll

When the user scrolls down past the search + filter zones, **collapse them into a single sticky pill bar** at the top of the viewport (just under the portal nav):

- Compact: search icon (tap to expand) + active category chip + active status chip + sort icon
- Tap any chip to re-open the full filter sheet from the bottom

Variants 3 & 4 should treat this with extra polish (glassmorphism in 3, sharp dashboard bar in 4). Variants 1 & 2 keep it simpler/softer.

---

## 7. Loading & Skeleton States

For each variant, also design:
- **Skeleton card** while data loads (greyed placeholder of the card structure, shimmer)
- Show 3 skeleton cards on initial load

---

## 8. Non-Negotiables (checklist)

- [ ] Same brand lockup as home brief (navy `#516171`, yellow `#FEE601`, off-white, Kanit, ripple motif)
- [ ] Each of the 4 variants matches its home-brief counterpart in mood, button style, card treatment, and palette overlay
- [ ] All 9 zones (A–I) are rendered in every variant
- [ ] Bottom sheet detail view designed for every variant
- [ ] All 3 CTA states (Apply / Pending / Go to Task) shown — design at least 2 cards in each state in the list mockup so all are visible at a glance
- [ ] Empty state designed for every variant
- [ ] Sticky compressed filter bar designed for every variant
- [ ] Bilingual labels — Thai default, English provided alongside for reference
- [ ] Mobile-first 390px viewport, thumb-friendly tap targets (≥44px)

---

## 9. What to Avoid

- Colors outside the navy + yellow + off-white system (green is permitted ONLY for the "Go to Task" approved-state button and success toast — nowhere else)
- Generic stock e-commerce card layouts (this is a campaign marketplace, not Shopify)
- Hiding the budget — budget must be visible on the card without tapping in
- Too many filter chips on screen at once — let categories scroll horizontally, don't wrap
- Tiny touch targets — every chip, button, card must be tappable with a thumb
- Overly photographic hero images — campaign images are brand assets, treat them with breathing room not full bleed in variants 2 & 3
- Hamburger nav hiding "Campaigns" — this page is the destination, keep the nav showing user is on Campaigns

---

## Final Note to Sleek

Treat the marketplace as the **daily home base** for a Thai creator. The home page sells them on signing up; the marketplace is where they actually do the work of finding deals. Design must feel **fast, scannable, and decision-friendly** — at every variant's mood. A creator on a BTS train should be able to tap-tap-apply in under 30 seconds.
