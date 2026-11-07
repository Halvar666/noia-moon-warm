# Noia Warm Moon a61 – audit původu a licencí obrázků

**Závěr:** V tématu je 829 grafických souborů; Options a6 přidává dalších 6. Z nich je 548 v tématu beze změny převzatých z Noia Moon, 187 je upravených a 94 nových. Přesný původ některých nových nebo výrazně pozměněných ikon ještě není doložený. Nedoložená licence neznamená automaticky zakázané použití.

**Nejdůležitější nálezy:** 33 nově vložených ikon `jar-donor` pochází přesně z historického Phoenix tématu Adama Brubakera bez přiložené licence jeho portu; čtyři naše toolbar sprity mají zjevnou vizuální příbuznost s WindowBlinds WBA, kde je autorův souhlas k ikonám, ale též samostatná omezení formátu; 14 dalších nově přidaných obrázků nemá přesnou shodu v prověřených zdrojích. Všechny konkrétní cesty, zdrojové otisky a priority jsou v CSV. Původ KDE ikon jako souborů nebylo možné ověřit bez původního archivu ikon, zatímco licenční soubory GPLv2 jsou k dispozici.

**Balíky XPI nebyly změněny.** Nejprve uzavřít tyto provenienční nejasnosti, potom beta.

---

# Detailed evidence (English)

# Noia Warm Moon – file-level artwork provenance and licensing audit

**Date:** 2026-11-05  
**Tested archives:** `Noia_Warm_Moon_2.6.0_a61.xpi` and `Noia_Warm_Moon_Options_2.1.2a6.xpi`  
**Reference builds:** `noia-moon-theme-2.6.1.xpi`, `noia-moon-options-2.1.2(1).xpi`  
**Donor distributions inspected:** `NoiaWarm.tar.bz2` (GNOME port), `Noia-Warm.jar` (Phoenix port), `NoiaWarm.wba` (WindowBlinds toolbar skin), and accessible supplied standalone PNGs.

## Summary

- Theme a61 contains **829** graphics: **548** byte-identical to Noia Moon 2.6.1, **187** modified at the same path, and **94** newly added. Options a6 contains **6** PNGs: **3** identical to original Options and **3** additional.
- **33 new images** are byte-/pixel-identical to images in the Phoenix theme `Noia-Warm.jar` and live in `chrome/browser/nmoptions/icons/warm/jar-donor/`. This archival theme identifies **Adam Brubaker** as its maker but contains **no standalone license file**. A further **14 unchanged assets** in the base theme overlap with the same JAR.
- **48 new color-folder images** include **43** pixel-identical matches to standalone PNGs provided during development (42 non-red variants plus one red open icon). The other **5 red variants** have no exact matching supplied source. Pixel-identical reference is an image-lineage finding, **not proof that the source image is licensed for redistribution**.
- **Four new images** match GNOME-port bitmaps pixel-for-pixel: `folders/grey/48/closed.png`, `jar-donor/search-bar.png`, `permissions/icons/geo.png`, and `permissions/icons/install.png`. Two of these also match standalone PNGs, and one is already in the JAR group. Therefore these figures overlap with the above groups; **do not add the counts together**.
- **14 newly added images** lack a direct identical source match in the tested sources: **5 red folder files, 4 Page Info category icons, 2 Permissions icons, and 3 Status Bar Preferences icons**.
- **187 modified files** retain a clear *package history* from Noia Moon; in **129** cases, the alpha bitmap has changed as well as color, so some may involve icon replacements, not simply recoloring. This requires source mapping for the visible replacements before making definitive licensing claims.
- The **four assembled toolbar sprite PNGs** show recognizable visual correspondence with Noia Warm WindowBlinds icons, but no byte-/pixel-identical single-file matches (different dimensions/composition). The original `NoiaWarm.wba` contains Carles Carbonell's 2005 email granting use of his icons and referring to LGPL, yet its separate Stardock skin-format header asserts restrictions on converting or reading that format without consent. Rights to Carles's artwork and rights to the *skin format/package* must not be conflated.

## Priority 1 — resolve before public beta

### A. Phoenix JAR donors: 33 items

`chrome/browser/nmoptions/icons/warm/jar-donor/` contains **33** files copied directly from `Noia-Warm.jar`. `contents.rdf` credits *Adam Brubaker* for the Noia-Warm Phoenix browser theme but the JAR includes **no explicit license grant** for his work. These icons may derive from the GPL/LGPL Noia artwork, but the file-level derivation has not yet been established.

**Static usage check:** searching the current theme and Options CSS, XUL, JS and manifest files found **no direct `jar-donor/` reference**. This suggests the files may be archival extras, but cannot rule out indirect references or future use; do not remove them merely on this finding without maintainer approval and regression testing.

**Names:** `back-large.png`, `back-small.png`, `bookmarks-large.png`, `bookmarks-menuicons.png`, `bookmarks-small.png`, `close.png`, `downloads-large.png`, `downloads-small.png`, `forward-large.png`, `forward-small.png`, `go.png`, `history-large.png`, `history-small.png`, `home-large.png`, `home-small.png`, `info-small.png`, `lock-broken.png`, `lock-insecure.png`, `lock-mixed.png`, `lock-secure.png`, `newtab-large.png`, `newtab-small.png`, `newwindow-large.png`, `newwindow-small.png`, `print-large.png`, `print-small.png`, `reload-large.png`, `reload-small.png`, `search-bar.png`, `stop-large.png`, `stop-small.png`, `throbber-stopped-small.png`, `throbber-stopped.png`.

**Recommendation:** either trace them back to licensable Carlitus originals and document that chain, or keep them as private research material outside the distributable XPI once confirmed unused. Do not assume the complete Adam Brubaker port is GPL-covered solely from the original Noia icons.

### B. Four assembled toolbar sprites

`chrome/browser/Toolbar-large.png`, `chrome/browser/Toolbar-small.png`, `chrome/browser/nmoptions/icons/warm/Toolbar-large.png`, `chrome/browser/nmoptions/icons/warm/Toolbar-small.png`.

The same icon designs visibly occur in the WindowBlinds `NoiaWarmToolbarInternet*.tga` and `NoiaWarmToolbarExplorer*.tga` sprite strips, as well as in other Noia distributions. Visual similarity demonstrates a *potential donor*, not a precise binary derivation. Original WBA contains `Noia Toolbar Icons Permission.txt` with Carles Carbonell's express permission for Thomas's toolbar packaging and a reference to LGPL; the `.ToolBarIcons` skin metadata separately carries Stardock restrictions. **Preferred fix:** document each toolbar slot against a Carlitus KDE/GNOME original icon and rebuild any uncertain slot from a verified source rather than using WindowBlinds extraction as the sole origin.

## Priority 2 — source metadata incomplete

### C. 14 newly added assets without exact source match

- `chrome/browser/nmoptions/icons/folders/red/16/closed.png`
- `chrome/browser/nmoptions/icons/folders/red/16/open.png`
- `chrome/browser/nmoptions/icons/folders/red/32/closed.png`
- `chrome/browser/nmoptions/icons/folders/red/32/open.png`
- `chrome/browser/nmoptions/icons/folders/red/48/closed.png`
- `chrome/browser/pageinfo/icons/general.png`
- `chrome/browser/pageinfo/icons/media.png`
- `chrome/browser/pageinfo/icons/permissions.png`
- `chrome/browser/pageinfo/icons/security.png`
- `chrome/browser/permissions/icons/desktop-notification.png`
- `chrome/browser/permissions/icons/popup.png`
- `chrome/browser/statusbar/prefs-download.png`
- `chrome/browser/statusbar/prefs-progress.png`
- `chrome/browser/statusbar/prefs-statusbar.png`

**Important:** No exact match means the source was not demonstrated by the tested references. It does **not** mean these files are unlawful or unlicensed: many may have been supplied in the conversation, rescaled, recomposed, or made as original artwork. Their origin needs recording, including the author and the applicable terms.

### D. GNOME-port matches

| a61 image | Exact/pixel match in `NoiaWarm.tar.bz2` |
|---|---|
| `chrome/browser/nmoptions/icons/folders/grey/48/closed.png` | `NoiaWarm/48x48/filesystems/gnome-fs-directory-visiting.png` |
| `chrome/browser/nmoptions/icons/warm/jar-donor/search-bar.png` | `NoiaWarm/12x12/apps/xmag.png` |
| `chrome/browser/permissions/icons/geo.png` | `NoiaWarm/48x48/stock/stock-send-link.png` |
| `chrome/browser/permissions/icons/install.png` | `NoiaWarm/48x48/mimetypes/gnome-mime-application-x-tar.png` |

GNOME port credits **Vyacheslav Dikonov** and Carlitus. The upstream archive lacks a separate COPYING/license. Historical catalog Softpile describes it as GPL, whereas FreeBSD's LEGAL notice treats GNOME icon themes cautiously because they may contain third-party artwork. These findings identify a source but do **not** by themselves certify rights for every newly added GNOME-specific image. When feasible, cross-check the matching design against original Noia Warm KDE GPL icon archives.

### E. Changed art in inherited file paths

Highest-value groups for manual source mapping:

- `chrome/global/CuteMenus/`: **54** modified image files.
- `chrome/browser/nmoptions/icons/warm/`: **21** modified image files (excluding the new JAR donors).
- `chrome/browser/places/`: **19** modified images.
- `chrome/browser/preferences/`: **8** modified category icons.
- `chrome/global/icons/`: **23** modified icons (including alert imagery).

These categories *overlap the 187 modified-file total* but represent distinct path groups. The full CSV identifies all 187 with SHA-256 and whether the image dimensions and alpha bitmap match the Noia Moon original. An alpha-mask difference is a useful sign of a replacement, **not evidence of copyright infringement**.

### F. Options a6 – three added PNGs

- `chrome/skin/black-row-inactive.png` – new small style graphic; source-generation method should be documented.
- `chrome/skin/black-row-selected.png` – new small style graphic; source-generation method should be documented.
- `chrome/skin/close-green.png` – replacement/variant close icon; record the original artwork used and right to recolor.

The other three Options PNGs are unchanged from the original Noia Moon Options distribution.

## Priority 3 — inherited artwork (lower immediate sourcing risk, not automatically relicensed)

**548** theme images are identical in both Noia Moon 2.6.1 and a61. Their immediate provenance is established through the Noia Moon package, whose RDF notice is MPL 2.0. Nonetheless, that notice does not by itself prove that every bundled third-party Noia icon is individually MPL-licensed. Original Carlitus KDE artwork has a separate GPL license. Keep per-source attribution and avoid a blanket “all artwork is MPL” statement. Fourteen inherited graphics are also byte-/pixel-identical to files from the older Phoenix JAR.

## Verified source-side evidence and limitations

1. Original `license`, `readme`, `changelog` and `gpl.txt` from **Noia Warm KDE 0.95** were supplied. The original license states GNU GPL; `gpl.txt` is **GPL version 2, June 1991**. The original KDE icon **bitmaps/archive were not available as local audited binaries**, so KDE image-level matching was not possible here.
2. The historical GNOME `NoiaWarm.tar.bz2` source in the working directory matches the documented 2004 distribution (previously verified SHA-256 `ab2c74338e27bc02db90955e0dd0df8982780cc72c5de07442a882c3c3c5e8b4`). Its bitmap matches were checked both by file hash and RGBA pixel hash.
3. The Phoenix `Noia-Warm.jar` credits Adam Brubaker, but no licence file was found. Exact matching proves source overlap, not permission to redistribute a derivative of his theme.
4. WBA permission letter refers to Carlitus's original icon artwork, while proprietary Stardock skin-format metadata has separate restrictions. A standalone source icon from the KDE/GNOME distributions is the safer provenance anchor.
5. **No public release and no XPI modifications occurred in this audit.** This is a technical due-diligence inventory, not a legal opinion.

## Recommended release-gate actions

1. Confirm 33 JAR donor images are not used by Options, then either remove them **from the release only** (preserving a separate archival research copy) or document a specific applicable licence. This step requires maintainer approval and a smoke test; files have **not** been removed.
2. Compile a toolbar-icon mapping from each sprite slot to the original licensed Carlitus source icon, independent of the WindowBlinds container.
3. For the 14 no-exact-match additions, record the actual source or original creation and attach appropriate credit and licensing metadata; many are straightforward to resolve from the development uploads.
4. Cross-check GNOME-only candidates against an original Noia Warm KDE 0.95 bitmap archive before citing GPLv2 for specific images.
5. Include original MPL/GPL attribution notices and relevant licence texts. Do not relabel the entire combined theme as exclusively MPL, GPL or LGPL without a compatibility review.
6. Keep this audit and the accompanying CSV in the repo, update the attribution file, and only then publish the first beta.

## Public sources supporting historical provenance

- WinCustomize 2005 “Noia Warm” by alphabyte: https://www.wincustomize.com/explore/toolbar_icons/66/
- GNOME original archive listing: https://download.gnome.org/teams/art.gnome.org/archive/themes/icon/
- FreeBSD GNOME Noia Warm port/distinfo and licence classification: https://www.freshports.org/x11-themes/gnome-icons-noia-warm/
- FreeBSD `LEGAL` historic cautious entry: https://github.com/freebsd/freebsd-ports-legacy/blob/master/LEGAL
- Noia Moon theme homepage: https://addons.palemoon.org/addon/noia-moon-theme/
- GNOME historical catalog entry (not authoritative licence grant): https://www.softpile.com/noiawarm

**Machine-readable full inventory:** `docs/ASSET_PROVENANCE_INVENTORY.csv` (835 images, including six from Options), with exact paths, checksums, source-match evidence and priority per file.
