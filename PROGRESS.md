# PROGRESS

## 2026-10-21: v1 built
- Built an offline PWA from the menu photo (`reference/menu-photo.jpg`): 8 sections in 3 columns, 36 items,
  large tick boxes, running total, and Clear All needing a 1 s hold.
- Layout auto-fits any screen (binary-searches the root font size); portrait evens out the column widths.
- Verified locally in Chrome: all 36 items = £164.63; 200 random tick combinations matched;
  a 0.5 s hold does nothing, a 1 s hold clears; no scrolling at 1067×640, 640×1067, 1280×800 and 1920×911;
  service worker caches 10 files; the page still loads with the server stopped (offline).
- Git: separate git dir off Google Drive; repo-local identity = SchAdamfreude noreply; global hooks opted out.
- Hosting: GitHub Pages via Actions from `app/` on the personal account (SchAdamfreude/bsl-food-menu).

## Next
- [ ] Enable Pages (Settings → Pages → Source: GitHub Actions), then first push (GCM login as SchAdamfreude)
- [ ] Install on the Lenovo tablet, test in airplane mode in both orientations
- Possible extras (not requested): Screen Wake Lock so the tablet doesn't sleep while in use
