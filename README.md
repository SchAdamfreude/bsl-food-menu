# Cafe Menu: tick-box order calculator

A one-screen, touch-friendly copy of the cafe's display menu. Tap items to tick them and the
total updates instantly. **Hold "Clear all" for 1 second** to untick everything.
Built for a Lenovo Tab P11 (2nd Gen) in either orientation, and works **fully offline** once installed.

**Live URL (for installing):** https://schadamfreude.github.io/bsl-food-menu/

## Installing on the tablet (one time, needs Wi-Fi)
1. Open **Chrome** on the tablet and go to the URL above.
2. Wait for the menu to appear, then tap **⋮** (top-right) → **Install app**
   (or **Add to Home screen** → **Install**).
3. Open **Cafe Menu** from the home screen once, so it finishes saving itself.
4. To test: turn on **Airplane mode**, close the app and open it again. It should load normally.

After this the tablet never needs internet. The app opens full-screen, like any other app.

## Changing prices or items
1. Edit `app/menu.js`. Prices are in **pence** (e.g. `899` = £8.99).
2. In `app/sw.js`, bump `CACHE_VERSION` (e.g. `cafe-menu-v1` → `cafe-menu-v2`).
   **Without this, installed tablets will keep showing the old menu.**
3. Commit and push to GitHub. The site redeploys automatically (Actions tab, about 1 minute).
4. On the tablet, with Wi-Fi: open the app, close it fully, then open it again.
   The new version is now saved for offline use.

## How it works
- `app/` is the whole website (plain HTML/CSS/JS, no build step, no libraries).
  - `menu.js`: all sections, items and prices
  - `app.js`: builds the menu, keeps the running total, hold-to-clear, and auto-sizes the
    layout to fit any screen with no scrolling
  - `sw.js`: service worker that stores every file on the device (this is what makes offline work)
  - `manifest.webmanifest`: app name, icon and full-screen mode, used by "Install app"
  - `fonts/`: Jost (SIL Open Font License, see `OFL.txt`) bundled locally
- `.github/workflows/pages.yml` publishes `app/` to GitHub Pages on every push.
- `reference/` holds the original menu photo. It is git-ignored and stays local, because the repo is public.

## Testing locally
From `app/`: `python -m http.server 8765`, then open http://127.0.0.1:8765/ in Chrome.

## Git / GitHub
- Repo: `SchAdamfreude/bsl-food-menu` (public, needed for free Pages), on the **personal** GitHub account.
  Don't use `gh` or `/publish` here, because those are logged in to the work account.
  Plain `git push` authenticates as SchAdamfreude through Git Credential Manager,
  because the username is in the remote URL.
- The git database lives off Google Drive at
  `C:\Users\adam\.claude\git-repos\GoogleDrive\BSL Food Menu\.git`.
