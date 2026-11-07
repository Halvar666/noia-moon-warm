# Noia Moon Warm Options — a9 startup rewrite

Date: 2026-11-07

## What changed

The historical startup component in `src/options/chrome/components/noiamoonop.js`
was replaced by an independently authored implementation bearing
`SPDX-License-Identifier: MPL-2.0`. It preserves the original
`classID`, `contractID`, `profile-after-change` registration,
existing preference keys, and all known options for paletting, folder colors,
legacy opt-in CSS and window attributes.

The maintainer-selected 64x64 warm Options icon was added separately.

## Verification

- Node syntax check and 13 mocked XPCOM regression tests passed.
- All 51 referenced CSS paths exist in the source archive.
- The maintainer installed the a9 version in Pale Moon 35 on Linux
  and reported no regressions in normal use.

## Remaining limitations

- A live smoke test does not establish exhaustive platform coverage or
  full correctness of the experimental Black palette.
- Original Noia Moon Options must still be disabled while Warm Options
  is active; overlapping XUL overlay IDs and global CSS in the original
  add-on can otherwise conflict.
- This update does not create a GitHub release.

## Build

```bash
node tests/test_noiawarm_startup.js
python3 scripts/build.py all
python3 scripts/verify.py
```
