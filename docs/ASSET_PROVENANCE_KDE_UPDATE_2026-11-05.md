# Noia Warm Moon a61 – aktualizace licenčního auditu podle KDE 0.95

**Datum:** 5. listopadu 2026  
**Vstup:** `Noia Warm KDE 0.95.zip`, `Noia_Warm_Moon_2.6.0_a61.xpi`, `Noia_Warm_Moon_Options_2.1.2a6.xpi`  
**Rozsah:** 2 597 PNG v KDE archivu, 829 grafických souborů tématu, 6 v Options.  
**Důležité:** Zjišťujeme původ grafiky, nikoli automaticky právo zveřejnit celý smíšeně licencovaný produkt.

## Potvrzené výsledky

- **50 nových souborů tématu** je bitově nebo pixelově totožných s originálními KDE ikonami. Jde o **44 složek** (42 alternativních + 2 červené 48px), **4 obrázky Permissions Manageru** a **2 soubory `jar-donor`**.
- **Dalších 9 nových obrázků** má po vizuálním srovnání zřejmý základ v KDE ikonách: **4 červené složky 16/32px**, **4 kategorie Page Info**, **1 Download ve Status Bar Preferences**.
- **`prefs-progress.png` a `prefs-statusbar.png` vznikly během vývoje Noia Warm Moon pomocí ChatGPT.** Uživatel původ výslovně potvrdil. Nejde o kopie konkrétních originálů KDE zjištěné auditem. Není potřeba pro tyto dvě ikony hledat další historickou předlohu; přesto je vhodné zaznamenat, kdo a jak je vytvořil, a zvolit odpovídající distribuční podmínky.
- **`prefs-download.png`** odpovídá motivu KDE `32x32/apps/kdisknav.png` po přizpůsobení; její původ již není neznámý.

### Tři ikony Status Bar Preferences

| Soubor | Provenience | Stav |
|---|---|---|
| `chrome/browser/statusbar/prefs-progress.png` | Vytvořeno pomocí ChatGPT pro projekt | Vyjasněno – projektová grafika |
| `chrome/browser/statusbar/prefs-statusbar.png` | Vytvořeno pomocí ChatGPT pro projekt | Vyjasněno – projektová grafika |
| `chrome/browser/statusbar/prefs-download.png` | Odvozeno od KDE `32x32/apps/kdisknav.png` | Vizuálně identifikováno, odvozenina |

### Čtyři ikony Page Info

| Soubor v `a61` | Nejbližší doložený původ v KDE 0.95 |
|---|---|
| `pageinfo/icons/general.png` | `32x32/actions/view_choose.png` |
| `pageinfo/icons/media.png` | `48x48/devices/pda_blue.png` |
| `pageinfo/icons/permissions.png` | `32x32/actions/button_ok.png` |
| `pageinfo/icons/security.png` | `48x48/filesystems/file_important.png` |

Jde o vizuální, nikoli bitové shody; u všech se liší pixely či rozměry. Vhodné je uvést *adapted from Noia Warm KDE 0.95 by Carlitus*.

## Co stále čeká na dořešení

1. **31 z 33 souborů Phoenix `jar-donor`** nemá v tomto porovnání přesnou KDE shodu. Další dva ji mají. Celý historický port ovšem nemá vlastní doloženou licenci; nejprve ověřit skutečné použití a pak buď odstranit nepotřebné soubory z distribuovaného XPI, nebo určit licencovaný originál. Soubory zatím neměnit.
2. **Čtyři toolbar sprity** obsahují směs složených a upravených motivů. Některé KDE motivy lze velmi dobře identifikovat (Back, Forward, Copy, Paste, Print), ale souhrnné automatické skóre samo o sobě není důkazem původu *všech* slotů. U každé ikony potřebujeme samostatný záznam. WindowBlinds původ ponechat samostatně.
3. **`permissions/icons/desktop-notification.png` a `permissions/icons/popup.png`** zatím nemají přesvědčivé KDE předlohy. Doplnit historii jejich tvorby nebo původní soubor.
4. **187 upravených souborů původního Noia Moon** má jasně doloženou historii v našem fork-u, ale ne všechny zdrojové motivy jsou jednotlivě namapované do licencované KDE/GNOME sady.
5. U Options a6 nadále zkontrolovat tři nové obrázky (`black-row-inactive.png`, `black-row-selected.png`, `close-green.png`).

## Licenční kontext

`license` v originálním KDE archivu přisuzuje Noia ikony Carlesi Carbonellovi (Carlitus) a uvádí GNU GPL; přibalený `gpl.txt` je **GPL verze 2 (červen 1991)**. `readme` výslovně umožňuje portovat sadu na jiné platformy za podmínek GPL. To prokazuje původ a výchozí licenci **konkrétních KDE ikon**, neřeší automaticky slučitelnost všech komponent z Noia Moon (MPL), GNOME portu a Phoenix/WindowBlinds.

**Status sestavení:** Theme 2.6.0a61 a Options 2.1.2a6 zůstávají nezměněné. Žádná úprava grafiky nebo XPI neproběhla.

## Datové přílohy

- `Noia_Warm_Moon_a61_Image_Provenance_KDE_Updated.csv`: všech 835 souborů, evidence zdrojů a priorita.
- `Noia_Warm_Moon_a61_KDE_exact_matches.csv`: přímé shody s archivem KDE.
- `Noia_Warm_Moon_a61_KDE_visual_candidates.csv`: automatické kandidáty; **nejde o samostatný licenční důkaz**.
- `Noia_Warm_Moon_a61_KDE_toolbar_candidates.csv`: kandidáty původu toolbar slotů; zkontrolovat ručně.

> **Update for a62:** the entire `jar-donor` folder (33 PNGs + historical RDF) was removed after a reference audit. These a61 findings are retained as historical evidence, not a current package inventory. See `JAR_DONOR_CLEANUP_A62.md`.
