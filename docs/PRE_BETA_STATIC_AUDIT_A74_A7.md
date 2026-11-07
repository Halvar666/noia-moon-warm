# Pre-beta static audit — 2026-11-07

**Reference releases:** Theme 2.6.0a74 (no changes), Options 2.1.2a6 (last runtime-tested).

**Prepared candidate:** Theme 2.6.0a74 + Options 2.1.2a7 (wording only).

## File-level results

| Artifact | Archive files | Verified raster images | XML errors | Zip integrity |
|---|---:|---:|---:|---|
| theme | 1003 | 778 | 0 | Passed |
| options | 74 | 6 | 0 | Passed |


### Options a7 vs a6

Only these three files changed:

- `NOIA_WARM_OPTIONS_TEST_NOTES.txt`
- `chrome/locale/en-US/options.dtd`
- `install.rdf`


No JavaScript, CSS, image, preference keys or stylesheet registration changed. The theme XPI has been copied from the verified a74 file without repacking. The `src` trees were byte-compared with the corresponding XPI payloads. Noia Moon Options remains an optional, separately installable extension.

### Additional static checks

- Options English XUL locale entity references are defined in the bundled DTD.
- XML/RDF/SVG is well-formed for files with those extensions; PNG/GIF/JPG decoded and verified.
- Archive names are unique and ZIP CRC checks pass.
- JavaScript syntax to be checked separately with Node (not a runtime Pale Moon test).

### Inherited skin URI references

A conservative textual scan of non-comment CSS found **47 unresolved `chrome://.../skin/` reference occurrences** representing **40 distinct resource paths**. The same 47 CSS file-to-resource references are present in the historical **Noia Moon 2.6.1** XPI and in the prior **Noia Warm Moon a67** XPI; **a74 introduced no new missing references**. These include old optional `nmoptions` assets and inherited browser/global icon URLs. Not all necessarily display as missing icons, because CSS rules can be disabled or overridden; runtime inspection is needed before deciding whether replacements are necessary. We have deliberately not removed or altered those rules during stabilization.

### JavaScript and build verification

`node --check` passed all three JS files in Options a7. Both XPI files also passed a rebuild from the repository `src` trees followed by the bundled `scripts/verify.py`. The generated archive file lists and payload contents match their source trees. The repository zip includes the identical original a74 theme binary and the newly built a7 Options binary.

### Not yet complete

- Live Pale Moon testing of the a7 wording and switch behavior.
- Full cross-platform and legacy-layout UI regression testing.
- Full rights/attribution review of all graphic sources, including transferred caption assets and historical WindowBlinds materials. Static tests do not determine copyright status.
- A visual rendering check under all Windows personalization modes.

The included historical provenance data is retained as historical evidence; see the current `ASSET_INVENTORY_A74_A7.csv` for current file paths and checksums. A checksum inventory does not prove legal provenance.
