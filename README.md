# Noia Moon Warm

Warm-toned complete theme for **Pale Moon**, based on **Noia Moon** by Lootyhoof and classic Noia/Noia Warm artwork. This repository also contains a separately installable **Noia Moon Warm Options** extension.

> **Public beta candidate (`1.0.0b1` theme / `2.1.2a8` Options test build).** This archive is for preparation and testing. **The original Noia Warm KDE 0.95 icon set includes its author-supplied GNU GPL notice and the full GNU GPL version 2 (June 1991) text; other imported graphics and Options code still require final provenance/licence review before publishing the complete bundle.**

## Features

- Cream, beige, gold, and dark red warm interface; recreated toolbar and window icons.
- Styling for tabs, bookmarks, Library, downloads, Preferences, Page Info, permissions, the Add-ons Manager, and other Pale Moon XUL windows.
- Solid warm All Tabs panel, replacing the former dark translucent panel.
- Optional, **separate** Noia Moon Warm Options extension with an explicit **Default** palette (no unintended colour override), Bronze, Soft Rose, Sage Green, and an **experimental** Black palette.
- Eight bookmark-folder colours, including the default red, provided in 16, 32, and 48 px closed/open variants. Folder colour changes require a restart.
- Optional toolbar icon size/dropmarker adjustments and green close buttons.

## Compatibility and installation

The theme's `install.rdf` declares Pale Moon **29.3.0–35.*** and the Options extension declares **28.6.0–35.***. Practical tests were done by the maintainer on **Pale Moon 35.x**; earlier versions and other operating systems are not fully validated. Both add-ons use their own IDs, separate from upstream Noia Moon and Noia Moon Options.

### Important: simultaneous use with the original Noia Moon Options

**Both complete themes can be installed together, but do not enable the two Options extensions simultaneously.** The original **Noia Moon Options 2.1.2** registers global AGENT styles without checking the selected theme and shares several XUL overlay element IDs with the fork. The independent extension IDs and preference branches therefore do **not** guarantee compatible concurrent operation.

- If **Noia Moon Warm** is active, enable **Noia Moon Warm Options** and disable the original **Noia Moon Options**.
- If **Noia Moon** is active, enable the original **Noia Moon Options** and disable **Noia Moon Warm Options**.
- Restart Pale Moon after changing the theme or enabling/disabling either Options add-on. Preserve installed add-ons and their preferences; no uninstall is necessary.

This is a **temporary beta limitation**, not an automatic restriction enforced by the extensions. The warning appears on the Main tab of Warm Options a8 and in its Add-ons Manager description. See `docs/OPTIONS_COEXISTENCE_AUDIT.md`.

Install the theme XPI in Pale Moon, activate it, then restart. Optionally install the Options XPI, restart, and select any non-default palette explicitly. The `Default (Noia Warm Moon)` option leaves the theme's standard colours unchanged. The Black palette remains marked **Experimental** because some dialogs may still have contrast problems.

## Windows titlebar

On Windows with the menu bar hidden, the theme provides a warm gold/beige titlebar without requiring the Options extension. The optional **Use Windows titlebar** checkbox changes the titlebar styling to follow the Windows appearance (including the system accent where supported). Both ordinary and maximized windows were successfully tested on Windows with the a74 + a6 reference pairing. The a7 Options release changed **only the wording** of this checkbox; a8 adds the coexistence warning without changing checkbox behavior.

## Layout

- `src/theme/` — complete theme contents, ready to pack directly as a root-level XPI.
- `src/options/` — separate XUL/XPCOM Options add-on, packed independently.
- `scripts/build.py` — deterministic theme and Options packaging.
- `scripts/verify.py` — basic archive/XML/image checks.
- `docs/` — release notes, development history, testing and licensing review.
- `LICENSES/` — reference copies of applicable text licences; **not** an assertion that every artwork file is under these terms.

Build locally with `python3 scripts/build.py all` and verify with `python3 scripts/verify.py` (requires Pillow). Do not include the parent `src` directory inside an XPI; files such as `install.rdf` and `chrome.manifest` must be at its archive root.

## Credits

- **Lootyhoof** — Noia Moon for Pale Moon.
- **David Vincent** — Noia Fox.
- **Carlitus (Carles Carbonell Bernado)** — original Noia Warm KDE 0.95 icons, released under GNU GPL with GPLv2 text included (see `docs/upstream/Noia_Warm_KDE_0.95/`).
- **Vyacheslav Dikonov** — Noia Warm GNOME 2 port (verified from the original 2003–2004 `ChangeLog`; official GNOME Art archive and matching SHA-256 are documented in `docs/LICENSING_REVIEW.md`).
- **Halvar666** — Noia Moon Warm adaptations and project maintenance; additional theme graphics.

## Licensing

**Primary project licence: Mozilla Public License 2.0 (MPL-2.0).** The project retains the upstream licence for inherited MPL-covered theme and Options sources. The small number of exceptions currently documented in this repository is:

| Material | Licence text | Why it remains |
| --- | --- | --- |
| Noia Moon-derived theme and original MPL-covered work | [MPL 2.0](LICENSES/MPL-2.0.txt) | Primary licence |
| Noia Warm KDE 0.95-derived icons | [GNU GPL v2](LICENSES/GPL-2.0.txt) | The original author released the icon set under GNU GPL and supplied this text; it is not relabelled MPL |
| Inherited Stylish-derived portion of the separately installable Options extension | [GNU GPL v3](LICENSES/GPL-3.0.txt) | Preserved original notice in `src/options/chrome/components/noiamoonop.js` |

**This is three licence texts across the entire source repository, not three licences that every file carries.** The theme and the optional extension are separately installed packages. Original KDE author notices and GPL wording are retained at `docs/upstream/Noia_Warm_KDE_0.95/`; these are evidence, not additional licences.

MPL 2.0's compatibility with GPL/LGPL under section 3.3 does **not** relicense original GPL-only material as MPL-only. No additional LGPL licence is claimed solely from historical correspondence. We do not add the MPL notice *Incompatible With Secondary Licenses* to our MPL-covered contributions.

For a possible future reduction to two licence texts, the inherited GPLv3 component in Options would need to be replaced with an independently written implementation or relicensed with the necessary permission; this is **not** part of the beta candidate. Unresolved ownership/provenance for other artwork remains under review and is not cured by the short licence list. See [licensing audit](docs/LICENSING_REVIEW.md).

### Removed archival Phoenix assets (a62)

The unreferenced `nmoptions/icons/warm/jar-donor/` files have been removed from the installable theme and its source directory. The original Phoenix `Noia-Warm.jar` remains a provenance research source and is not redistributed in this repository. This removal does not establish licensing clearance for other assets.


## Beta packaging note (2026-11-07)

The **theme** is packaged as `Noia Moon Warm 1.0.0b1` with a new user-edited 64×64 Add-ons Manager icon and the exact supplied `preview.png`. Its stable installation ID (`noia-warm-moon@halvar666`) and skin internal name (`noiawarmmoon`) remain unchanged to preserve upgrades and compatibility. The separate **Options** add-on is still `Noia Warm Moon Options 2.1.2a8` and has not been renamed or released as a beta in this package. Its compatibility warning about the original Noia Moon Options remains in effect. The theme beta is a **candidate** until final licensing review and installation tests are complete.
