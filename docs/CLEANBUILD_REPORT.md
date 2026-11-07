# Cleanbuild a61 — implementation details

Input: `Noia_Warm_Moon_2.6.0_a60.xpi` (last confirmed functional theme) and `Noia_Warm_Moon_Options_2.1.2a6.xpi` (unchanged).

Theme a61 intentionally modifies only:
- `install.rdf`: version and plain-English description;
- CSS files with comments marking historic alpha numbers: only those comments are removed, no style declarations;
- `NOIA_WARM_MOON_NOTES.txt`: transferred unmodified into repository docs and omitted from the installable XPI.

Preserved: all PNG/GIF/SVG images, all manifests, alternate palettes and folders, 34 legacy `jar-donor` files, and all other functional styles and resources. **Historical `jar-donor` artwork remains in this alpha because it has not been conclusively shown to be unused.**

Run `scripts/build.py` and `scripts/verify.py` to reproduce/validate archives. CSS-equivalence is checked separately from XPI equality during the build audit. The original theme and Options XPI are not modified.
