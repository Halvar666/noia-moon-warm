# `jar-donor` cleanup — Theme 2.6.0a62

Date: 2026-11-05. Baseline: Theme 2.6.0a61 + Options 2.1.2a6.

## Summary

`chrome/browser/nmoptions/icons/warm/jar-donor/` contained **34 files: 33 PNG and one historical `contents.rdf`**. Its contents derived from the Phoenix Noia-Warm theme attributed in that RDF to Adam Brubaker.

The a61 `chrome.manifest` registered the live `noiawarmmoon` theme under `chrome/browser/`; it did **not** register the historical Phoenix `Noia-Warm` skin. A text scan of all Theme CSS/XUL/JS/RDF/manifests and the complete Options a6 package found **no `jar-donor` references**. Options styles are loaded explicitly, not by scanning this folder; therefore the folder was unused by the current combination.

**Action:** Removed all 34 files from a62 XPI and repository `src/theme`, retaining the remainder of `nmoptions/`, all functional folder palettes and toolbar resources.

**Scope:** a62 should differ from a61 only in the 34 removed paths and `install.rdf` version. No CSS declarations or images elsewhere were modified. The separate Options a6 XPI remains byte-identical. Static checks cannot replace real Pale Moon regression testing.

**Licensing:** This removes the unused Phoenix donor copy from the distributed theme. It does not resolve any other inherited or third-party image rights, including toolbar sprites or WindowBlinds-derived assets. Historical a61 audit documents have been kept as prior-version evidence; use `ASSET_PROVENANCE_INVENTORY_CURRENT_a62.csv` for current file presence.

## Removed paths

- `chrome/browser/nmoptions/icons/warm/jar-donor/back-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/back-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/bookmarks-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/bookmarks-menuicons.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/bookmarks-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/close.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/contents.rdf`
- `chrome/browser/nmoptions/icons/warm/jar-donor/downloads-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/downloads-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/forward-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/forward-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/go.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/history-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/history-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/home-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/home-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/info-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/lock-broken.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/lock-insecure.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/lock-mixed.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/lock-secure.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/newtab-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/newtab-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/newwindow-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/newwindow-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/print-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/print-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/reload-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/reload-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/search-bar.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/stop-large.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/stop-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/throbber-stopped-small.png`
- `chrome/browser/nmoptions/icons/warm/jar-donor/throbber-stopped.png`
