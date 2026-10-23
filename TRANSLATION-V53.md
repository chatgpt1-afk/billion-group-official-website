# V53 — Free offline translation (Windows)

This is a **first-stage offline publishing workflow**, not a server-based real-time translator. It has no Google Cloud Billing or paid translation API. It uses the open-weight NLLB-200 distilled 600M model, downloaded to your computer once. Model download needs Internet; translating cached model needs no Internet. Model licensing and commercial-use eligibility must be checked before public commercial deployment (NLLB-200 model is commonly released under CC-BY-NC-4.0, **not suitable for commercial website use without appropriate permission**). DO NOT publish NLLB-generated translations commercially unless licensing has been resolved. Replace with a commercially permitted offline model before production.

## How to test

1. Install Python 3.11 or 3.12 on Windows.
2. Open PowerShell inside this website folder.
3. Run `py -m pip install -r tools/requirements.txt`.
4. Run `py tools/translate_offline.py --limit 5` to translate 5 new strings per language (for testing). Run without `--limit` for full catalog after model license is cleared.
5. Review `translations/ms.json` and `translations/zh.json`. You can manually correct individual values.
6. Serve the folder with `py -m http.server 8000`, then open `http://localhost:8000`. Opening via `file://` may block JSON fetch.
7. Deploy the updated HTML and translations together. For live sites, all translations must be reviewed before publishing.

## Limitations / next steps

- V53 identifies 1,101 visible English text nodes across 17 pages and creates translation catalogs, but the included catalogs start empty. This package does NOT claim the site is already translated by the offline model.
- Browser Visual Editor localStorage changes are **not automatically written back to HTML or translation catalogs**. To publish those edits across devices, a content export/import or editor-to-files publishing workflow is still required. Do not assume clicking Save publishes translations.
- Some existing V36/V48 hand-written translations may overwrite V53 strings during language switching. The runtime is a preliminary integration, not fully tested across every page.
- Dynamic text added by JavaScript is not automatically included in the static extractor. A full content-ID-based CMS is still required for automatic new News publishing.
- Brand names, legal terms, job forms, and place names require editorial checking. No guaranteed proper-noun protection in this starter.
- The open NLLB model's noncommercial license is a critical limitation for a company website. Use a model with an appropriate commercial license or obtain permission before production.
