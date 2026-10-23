# V28 — Billion Pro Visual Editor (based on V25)

Open any HTML page with `?edit=1`. Click any text, photo, or supported image-background to edit. A visual selection frame and drag handle allow repositioning. Image corners resize the image. The inspector offers precise width/height, x/y, typography, spacing, color, and image fit. Undo/Redo and manual Save are provided. Changes preview immediately but only Save writes browser localStorage. Each page is saved independently. Existing V25 saved edits are loaded (same storage key). JSON backup can be exported/imported.

**Important:** Saved edits are browser-local and do not update website source files or publish to other visitors. Large uploaded images may exceed localStorage limits; compress them first. Position/size overrides may affect responsive layouts, so check mobile. Undo/Redo history is limited to 100 actions per page and resets on reload.
