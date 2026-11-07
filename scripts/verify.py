#!/usr/bin/env python3
"""Basic static verification of built XPI archives."""
from pathlib import Path
import zipfile, xml.etree.ElementTree as ET
from PIL import Image
from io import BytesIO
ROOT=Path(__file__).resolve().parent.parent
for xpi in (ROOT/'dist').glob('*.xpi'):
    with zipfile.ZipFile(xpi) as z:
        assert z.testzip() is None, xpi
        names=z.namelist()
        assert len(names)==len(set(names)), 'duplicate names'
        assert 'install.rdf' in names and 'chrome.manifest' in names
        for name in names:
            if name.lower().endswith(('.rdf','.xul','.xml','.svg')):
                ET.fromstring(z.read(name).lstrip(b'\xef\xbb\xbf'))
            if name.lower().endswith(('.png','.gif','.jpg','.jpeg')):
                with Image.open(BytesIO(z.read(name))) as im: im.verify()
        print(f'{xpi.name}: OK ({len(names)} files)')
