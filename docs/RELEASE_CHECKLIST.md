# Release checklist — Noia Moon Warm 1.0.0b1 candidate / Options 1.0.0b1

- [x] Windows: titlebar normal/maximized, default gold palette and optional system-color mode verified with a74 + a6 (2026-11-07).
- [x] Theme contains no `jar-donor` subtree (removed in a62).
- [x] Options a9: independently rewritten startup, 13 automated tests, and no regression reported during Pale Moon 35 Linux smoke test.
- [x] Options a9: coexistence warning retained; original Noia Moon Options disabled during testing.
- [ ] Linux: visual regression test of Theme a74 vs a67 (Windows-only changes must not affect Linux).
- [ ] Complete provenance/licence verification for the remaining non-KDE assets before public distribution.
- [x] Check inherited CSS skin references: 47 occurrences present unchanged since Noia Moon 2.6.1; no new missing references in a74.
- [x] Package theme 1.0.0b1; include updated branding, icon and preview.
- [x] Verify theme beta XPI matches bundled `src/theme`.
- [ ] Perform final beta installation test and any required public-redistribution licence checks.


- [ ] Resolve Noia Warm / Noia graphics redistribution permissions and record all third-party attributions.
- [x] Replace the historically Stylish-labelled Options startup component with an independent MPL-2.0 implementation.
- [ ] Confirm user-created replacement graphics provenance and redistribution terms.
- [ ] Install-test Theme a74 with Options a7 on Pale Moon 35.x; a74 with a6 already tested on Windows.
- [ ] Verify **Default** and **Reset** do not activate legacy grey styles, including after an upgrade.
- [ ] Test Bronze / Soft Rose / Sage Green, return to Default after each.
- [ ] Test all 8 folder colours in Bookmarks Sidebar, Library and Bookmarks Toolbar.
- [ ] Test toolbar large/small icons, AppMenu, All Tabs popup, software installation prompt.
- [ ] Test Add-ons Manager, permissions, Preferences, Page Info, Library and downloads.
- [ ] Check Black palette contrast; keep Experimental label until comprehensive regression test.
- [ ] Test Windows and Linux as available; Windows titlebar ordinary/maximized confirmed with a74/a6; still smoke-test a7 and full Linux regression.
- [x] Maintain both theme and Options sources in this repository.
- [ ] Update identifiers and release version numbers if needed; build public beta packages from final sources.
- [ ] Tag beta (suggest `theme-v2.6.0b1` and `options-v2.1.2b1` if using one repo).
- [ ] Publish README, screenshot(s), release notes, source code and verified licence details.

## Noia Warm KDE 0.95 provenance (November 5, 2026)

- [x] Preserve original `license`, `readme`, and `changelog` proving Carlitus GPL grant for KDE 0.95.
- [x] Obtain and verify the referenced `gpl.txt` (GNU GPL version 2, June 1991); include it verbatim in the source archive and `LICENSES/GPL-2.0.txt`.
- [ ] Map incorporated artwork to KDE GPL set versus GNOME and WindowBlinds donor archives.
- [ ] Record attribution/licence information for the final XPI and GitHub sources.

## GNOME port provenance (November 5, 2026)

- [x] Locate original archived GNOME port on the GNOME Art archive.
- [x] Match existing local `NoiaWarm.tar.bz2` SHA-256 with FreeBSD's original `ICON-NoiaWarm.tar.bz2` record.
- [x] Verify Vyacheslav Dikonov attribution and original conversion date in `ChangeLog`.
- [ ] Audit the GNOME-only/replaced icons for independent redistribution rights, considering FreeBSD's original `LEGAL` caution.
- [ ] Avoid shipping the entire upstream GNOME tarball in public sources until provenance is cleared.

## Phoenix `jar-donor` cleanup

- [x] Confirm no direct references in theme a61 or Options a6 XUL/CSS/JS/manifests.
- [x] Remove 33 PNGs and inactive `contents.rdf` from Theme a62 XPI and source.
- [ ] Install-test a74 with Options a7 on Pale Moon 35.x.

## Temporary coexistence limitation (Options a8)

- [x] Audit both extension IDs, preference branches, overlay element IDs and global stylesheet registration.
- [x] Document that Noia Moon and Noia Warm Moon complete themes may both remain installed.
- [x] Warn that original Noia Moon Options and Noia Warm Moon Options must **not both be enabled**.
- [ ] Verify warning displays correctly in Pale Moon 35.x Options dialog.
- [ ] Test theme switching with only the matching Options extension enabled, restarting Pale Moon each time.
- [ ] For a future version, consider theme-aware shared Options with opt-in migration; avoid altering upstream preferences unexpectedly.
