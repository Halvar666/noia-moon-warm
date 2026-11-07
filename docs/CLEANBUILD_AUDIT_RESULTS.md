# a61 static audit results

- Base: Theme 2.6.0a60 (last user-tested), Options 2.1.2a6.
- XPI entries: 1029 → 1028. Removed one development-only notes file (moved verbatim to `docs/DEVELOPMENT_HISTORY.txt`).
- Modified entries: 21 (20 CSS files: comment-only cleanup, `install.rdf` version and description).
- CSS: 192 stylesheets compared using `tinycss2` with comments and insignificant whitespace ignored, **identical rule token stream for every CSS file**; 0 top-level parser errors after cleanup.
- Image source bytes: all 829 files identical.
- 8 × 3 × 2 = 48 coloured folder PNGs present.
- Options source and build: 74 entries byte-for-byte identical in content to currently tested `2.1.2a6`.
- Theme SHA-256: `f2470ca51fba75411d11f9915ab20e82fd5b4a01be4fe798703839c5029144bd`.
- Options 2.1.2a6 original SHA-256: `789387835fb352cc97db9c713ac3fbf0f4d7672bef89026a0adf8855d407d5ec`.
- XPI size: 1955081 → 1946712 bytes.
- Limits: static equality is **not** a user-interface runtime regression test; require user verification in Pale Moon 35.x before public beta.
