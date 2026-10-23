# Billion Website V25 — Visual Editor (Local Draft)

## How to edit
1. Open `index.html?edit=1` in the browser (or any inner page, e.g. `promotions.html?edit=1`).
2. Click **Edit Website** in the lower-right corner.
3. Click text or a photo to change it. For the four homepage hero slides use **Edit Hero Photos**.
4. Changes are automatically stored as a **local browser draft**. They do not update the public website or other devices.
5. Use **Export changes for publishing** to download a JSON backup of that page's edits. **Import saved changes** restores the JSON on the same page/browser.

## Important limitations
- This version is a browser-only visual editor prototype, not a secured multi-user CMS.
- Local drafts are browser/device-specific. Browser storage can be cleared and large photo uploads can exceed localStorage limits.
- Exporting JSON is NOT publishing. A later server-side integration is required to publish content for all visitors, securely upload images and provide administrator authentication.
- Avoid using private photos or credentials in browser drafts. Images are stored as data URLs in browser storage.
- Fonts can be edited on text nodes; advanced drag-and-drop layout editing is not included.
- The original website design and public-facing pages remain intact when not using `?edit=1`.
