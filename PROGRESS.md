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

## 2026-10-21: v2, hold-to-clear fix (Firefox)
- Bug: in Firefox, a quick touch tap on Clear All wiped the order. Firefox delivered the touch-down
  but dropped the release event (especially when the button already had focus), so the 1 s timer was never cancelled.
- Fix (app.js): pointer capture, no focus/compat mouse events on the button (preventDefault), a release
  anywhere on the page cancels, sliding the finger off cancels, and the label/fill ignore pointer events.
- Verified in headless Firefox (Marionette stress test, 64 touch and mouse presses of 0–1250 ms, with and without focus).
  Old build: 11 failures. New build: 0, and slide-off doesn't clear. Chrome is unaffected. Firefox offline reload works.
- Cache bumped to cafe-menu-v2. README now has Firefox install notes.

## Next
- [x] Pages enabled; first push done 2026-10-21, deploy succeeded, live at https://schadamfreude.github.io/bsl-food-menu/
- [ ] Install on the Lenovo tablet, test in airplane mode in both orientations
- Possible extras (not requested): Screen Wake Lock so the tablet doesn't sleep while in use
