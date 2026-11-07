# Changelog

## Noia Moon Warm 1.0.0b1 — public beta candidate (2026-11-07)
- **Changed:** Public-facing theme name to **Noia Moon Warm**; version reset to `1.0.0b1`.
- **Changed:** Add-ons Manager icon replaced by the final warm-toned custom gold emblem supplied/approved by the maintainer.
- **Added:** `preview.png` using the exact supplied navigation bar screenshot.
- **Unchanged:** All appearance CSS, Windows titlebar fixes from a74, icons outside root `icon.png`, skin registrations, and installation ID.
- **Known limitation:** Original Noia Moon Options and the separate Noia Warm Moon Options must not both be enabled.



## Options 2.1.2a8 — simultaneous Options compatibility notice (2026-11-07)
- **Added:** An explicit warning in the Main tab against enabling Noia Warm Moon Options and original Noia Moon Options at the same time.
- **Changed:** Add-ons Manager description and test notes document the temporary beta restriction.
- **Unchanged:** JavaScript, preference keys, CSS, theme selection, and window-titlebar behavior.
- **Reason:** The original extension registers global AGENT styles and has XUL overlay IDs overlapping the warm fork.

## Options 2.1.2a7 — UI wording (2026-11-07)
- **Changed:** `Original Windows titlebar (*)` is now `Use Windows titlebar`.
- **Changed:** Removed obsolete WindowBlinds-only instructions; added Windows-only tooltip.
- **Unchanged:** Option behavior, JavaScript, styles, preferences, palettes and folder colors.

## Theme 2.6.0a74 — Windows titlebar stabilization (2026-11-07)
- **Fixed:** Original Windows titlebar mode no longer misaligns or clips window buttons on maximized Windows windows.
- **Changed:** Targeted `nmoptions/normal.css` corrections for button sizing, glyph overlap and positioning.
- **Tested:** Maintainer verified default warm titlebar and optional Windows titlebar, including maximize/restore.

## Theme 2.6.0a73 — maximized Windows geometry
- **Fixed:** Top-edge clipping and missing caption buttons in maximized Windows windows.

## Theme 2.6.0a72 — warm Windows titlebar
- **Changed:** Replaced inherited grey titlebar with warm gold/beige gradient.

## Theme 2.6.0a71 — system accent experiment
- **Changed:** Experimental handling of the Windows titlebar accent color; retained in development history.

## Theme 2.6.0a70 — recover working Windows caption controls
- **Fixed:** Caption buttons and glyphs displayed again after a68/a69 experiments.

## Theme 2.6.0a68–a69 — experimental Windows captions
- **Changed:** Tested Windows-native and XUL SVG caption implementations; neither was accepted as final.

## Theme 2.6.0a63–a67 — warm interface polish
- **Fixed:** Blue tabbar bottom strip, download progress default colors and colorpicker preview,
  grey secondary Preferences tabs, and opaque URL/Search bar corner backgrounds.


## 2.6.0a62 — remove unused Phoenix theme assets (2026-11-05)
- **Removed:** `chrome/browser/nmoptions/icons/warm/jar-donor/` (33 PNG images + one historical `contents.rdf`).
- **Verified:** No references to this directory in Theme a61 CSS/XUL/JS/manifests or Options a6 scripts/styles; the archival `contents.rdf` was not registered by the active `chrome.manifest`.
- **Preserved:** All functional `nmoptions` styles, graphics, folder colour sets, toolbar assets, and configuration. Options stays at 2.1.2a6.
- **Changed:** Theme version metadata only. No intended visual or functional changes.


## 2.6.0a61 — preparation / cleanup (2026-11-05)
- **Changed:** Removed only alpha-development label comments from CSS, without modifying style declarations.
- **Changed:** Moved the complete internal alpha development log from the installable theme XPI to `docs/DEVELOPMENT_HISTORY.txt`.
- **Changed:** Clarified the theme description; updated the version metadata.
- **Preserved:** All `nmoptions` resources (including legacy donors), all icons and colour palettes, manifests, and active appearance rules.
- **No intended visual changes** compared with the user-tested theme `2.6.0a60`.

## 2.6.0a60
- **Fixed:** All Tabs panel previously displayed a dark, translucent background. Replaced with an opaque warm background and readable text.

## 2.6.0a59
- **Added:** 8 colour sets of open and closed bookmark folders in 16, 32 and 48 px for the separate Options extension.

## 2.6.0a58
- **Changed:** Warm category icons for Extensions and Plugins.

## 2.6.0a56
- **Fixed:** Warm background of the Software Installation confirmation dialog.

## Earlier alpha versions
See `docs/DEVELOPMENT_HISTORY.txt` for full incremental notes.

## Options 2.1.2a6 (unchanged in this cleanbuild)
- Curated Default, Bronze, Soft Rose, Sage Green and experimental Black palettes.
- Folder colours, size/dropmarker settings, green close buttons.
- Several contrast improvements to Preferences, Page Info and the Add-ons Manager.
