# Windows titlebar validation — reference Theme a74 / Options a6

Maintainer-confirmed results from screenshots and direct testing (2026-11-07):

- Default warm titlebar renders beige/gold with caption button glyphs visible.
- Normal window with hidden menu bar works.
- Maximized window was previously clipped (a72); a73 resolved the default mode geometry.
- Windows titlebar option in a73 still caused clipped/duplicated caption glyphs.
- a74 corrected the optional Windows titlebar, maintaining the accent-color appearance with properly aligned glyphs in both normal and maximized window modes.
- The original `2.1.2a6` Options was used in these runtime tests. `2.1.2a7` changes its English labels only; UI wording requires a smoke test.

Important: The theme XPI remains the tested a74; there is no silent a75 or beta version bump. The appearance should not be considered validated on every Windows accent/theme combination.
