> **Current candidate: Theme 2.6.0a74 + Options 2.1.2a7 (2026-11-07).** Historical file-level CSV inventories describe a61/a62 and should not be used as a fully current a74 inventory. The unchanged KDE icon lineage and removed jar-donor status persist; the Windows caption work after a62 needs separate attribution review if third-party assets were added. Public beta publication is gated on unresolved provenance.

# Licensing and provenance review — Noia Warm Moon

> **File-level graphics audit added 2026-11-05:** See [`ASSET_PROVENANCE_AUDIT_2026-11-05.md`](ASSET_PROVENANCE_AUDIT_2026-11-05.md) and [`ASSET_PROVENANCE_INVENTORY.csv`](ASSET_PROVENANCE_INVENTORY.csv) for 835 file-level records. The unused Phoenix `jar-donor` resource group was removed in a62; WindowBlinds-derived and other artwork still require file-level licensing review.

**Status:** The original **Noia Warm KDE 0.95** icon-set licensing has now been verified from original author-supplied documentation. This resolves the earlier lack of licensing evidence **for that particular KDE icon set**, but does **not** automatically clear unrelated assets or code included in the theme and Options fork. The combined release still requires a final file-level review.

## 1. Noia Warm KDE 0.95 — original source verified

- **Author:** Carlitus (**Carles Carbonell Bernado**), `mail@carlitus.net`, `http://www.carlitus.net`.
- **Version:** **0.95**, first released **February 8, 2003**, as identified in the original `changelog`.
- **License statement:** the original `license` explicitly states: **“The Noia icons for KDE are under GNU GPL license.”** The original `readme`, section **PORTS TO OTHER PLATFORMS**, further states that anyone may port these icons freely under the GPL. The author says he would *appreciate* prior notification of a published port; he does not frame it as a license condition.
- **Retained evidence:** `docs/upstream/Noia_Warm_KDE_0.95/{license,readme,changelog,gpl.txt}` contains unmodified copies provided by the maintainer.
- **Full referenced licence text now verified:** the associated `gpl.txt` supplied with the KDE set is headed **GNU GENERAL PUBLIC LICENSE — Version 2, June 1991**. A verbatim copy is retained at `docs/upstream/Noia_Warm_KDE_0.95/gpl.txt` and as `LICENSES/GPL-2.0.txt`. This confirms the **GPL version 2 licence text** referenced by the source bundle. The short original `license` file says only *GNU GPL*, without independently spelling out an `-only`/`-or-later` qualifier; the standard GPLv2 text includes its own §9 rules about versions and its appendix contains sample notices, which should **not** be mistaken for an exact per-icon SPDX notice. Keep the original wording rather than adding an unsupported qualification.
- **Implication:** the original KDE 0.95 icons may be modified, ported and redistributed under the applicable GNU GPL terms, including preservation of required notices and provision of the relevant licence text/source form.

## 2. Other artwork — separate provenance needed

The above KDE 0.95 evidence **does not automatically establish the terms** of other artwork used during development, notably:

- **Noia Warm GNOME 2 port — upstream located and archive matched (November 5, 2026):** Original archived distribution is linked from the official GNOME Art archive at <https://download.gnome.org/teams/art.gnome.org/archive/themes/icon/ICON-NoiaWarm.tar.bz2> (listing timestamps it **2004-11-02**). The working source archive `NoiaWarm.tar.bz2` was inspected locally and its SHA-256 **exactly matches** FreeBSD's record for `ICON-NoiaWarm.tar.bz2`: `ab2c74338e27bc02db90955e0dd0df8982780cc72c5de07442a882c3c3c5e8b4` (8,307,495 bytes). Its `NoiaWarm/ChangeLog` states that **Vyacheslav Dikonov** converted the KDE icons to **GNOME 2.2** on **2003-02-06**, credits **Carlitus** for additional GNOME and OpenOffice icons, notes version 1.0 as of **2003-09-27**, and records added GNOME 2.6 icons on **2004-08-18**. Historical catalog entry: <https://www.softpile.com/noiawarm> (labels it GPL); original listing: <http://art.gnome.org/themes/icon/414/> (not live; historic pointer). FreeBSD identifies the exact archive in <https://www.freshports.org/x11-themes/gnome-icons-noia-warm/>.

  **Licensing caution:** The inspected GNOME archive contains `ChangeLog` and `index.theme`, **but no standalone `COPYING` or license document**. Third-party catalog Softpile labels it GPL, and the source KDE 0.95 set is GPL, but the GNOME conversion may include additional artwork with separate provenance. FreeBSD's historic `LEGAL` entry explicitly flags potential third-party artwork in icon themes; its current port uses a custom `icons` license classification and blocks package/distfile redistribution. This is a **packaging caution, not proof of infringement**, but do not assume the full GNOME archive is uniformly GPL without a file-level review. Do not bundle the original archive in the public repo solely because it is mirrored; reference the upstream URL and digest until permission for each redistributed subset is confirmed. The local file is kept as research input only.

  References: <https://download.gnome.org/teams/art.gnome.org/archive/themes/icon/>, <https://www.freshports.org/x11-themes/gnome-icons-noia-warm/>, <https://github.com/freebsd/freebsd-ports-legacy/blob/master/LEGAL>, <https://www.softpile.com/noiawarm>.
- `NoiaWarm.wba`: a **WindowBlinds skin** extracted during development for some toolbar assets. Establish its licence/source for reused imagery before claiming it is GPL-covered by the KDE package.
- `Noia-Warm.jar`: the **33 copied PNGs and one unused `contents.rdf`** were removed from the a62 distributed theme because no running theme/Options files referenced them. Some other inherited images resemble those in the Phoenix JAR; assess those separately.
- Other inherited/replacement icons: determine whether individual files are modifications of original KDE GPL icons, Noia Moon MPL graphics, third-party assets, or original project artwork. Attribute and licence each group accordingly.

**The verified KDE GPL grant is strong positive evidence, but not a blanket permission covering all possible packaging and donors.**

## 3. Noia Moon base

Noia Moon (Lootyhoof) is listed on the Pale Moon Add-ons site as **Mozilla Public License 2.0**: https://addons.palemoon.org/addon/noia-moon-theme/ . The inherited `install.rdf` contains an MPL notice. Preserve upstream notices and identify derived file groups. Do **not** relabel KDE GPL icon files under MPL.

## 4. Noia Warm Moon Options

Historical note: Options a8 inherited a `noiamoonop.js` header referencing Stylish 1.0.8 (GPLv3). For a9 this controller was independently reimplemented with an MPL-2.0 source identifier. The extra GPLv3 licence text has been removed from the current active project files; older audit comments remain for historical context.

## 5. Before public beta

1. **Completed:** the original KDE `gpl.txt` is verified as GPL version 2 (June 1991), included verbatim alongside the upstream author notice and separately in `LICENSES/GPL-2.0.txt`.
2. Inventory the actual reused files against KDE 0.95, GNOME port, WindowBlinds donor, Noia Moon, and original contributions; treat uncertain items separately.
3. Preserve relevant licenses and attribution for *both* the theme and separately installed Options XPI and their repository sources.
4. Verify license compatibility for the specific combination and any modifications, rather than applying one repository-wide SPDX identifier by default.
5. Run the final Pale Moon smoke test of Theme 2.6.0a62 + Options 2.1.2a6. Black remains Experimental.

This is a technical provenance review, not a legal opinion.
