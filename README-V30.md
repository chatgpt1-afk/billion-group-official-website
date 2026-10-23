# Billion Group V30 — Delete / Restore

Based on V29; original design retained.

- Open `index.html?edit=1` and click a text or image element.
- Click **Delete selected element** (or keyboard Delete/Backspace outside inputs) and confirm.
- Deletion is a reversible hide in the page editor, not physical deletion of HTML/assets.
- Click **Undo** to reverse immediately; use **Deleted elements** > **Restore** later.
- Changes are drafts until you click **Save**. Saved state is browser-local.
- JSON export/import includes deleted state.
- The editor intentionally cannot delete structural root elements such as header/nav/footer directly.
