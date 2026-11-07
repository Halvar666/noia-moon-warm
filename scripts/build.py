#!/usr/bin/env python3
"""Reproducible XPI packer. Run from the repository root."""
from pathlib import Path
import sys, zipfile
ROOT=Path(__file__).resolve().parent.parent
SOURCES={"theme": ("src/theme", "Noia_Moon_Warm_1.0.0b1.xpi"),
         "options": ("src/options", "Noia_Warm_Moon_Options_2.1.2a9.xpi")}
def build(name):
    sub,filename=SOURCES[name]
    src=ROOT/sub
    out=ROOT/'dist'/filename
    out.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(out,'w') as z:
        for file in sorted(p for p in src.rglob('*') if p.is_file()):
            rel=file.relative_to(src).as_posix()
            inf=zipfile.ZipInfo(rel,date_time=(2026,11,5,12,0,0))
            inf.compress_type=zipfile.ZIP_DEFLATED
            inf.external_attr=(0o100644<<16)
            z.writestr(inf,file.read_bytes(),compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
    print(out)
if __name__ == '__main__':
    arg=sys.argv[1] if len(sys.argv)>1 else 'all'
    for name in (SOURCES.keys() if arg=='all' else [arg]): build(name)
