#!/usr/bin/env python3
"""
Build the self-contained deck.

Reads src/shell.html and inlines src/deck.css, src/scenes.css and src/deck.js
into a single index.html with no external dependencies whatsoever.

Why single-file: the deck is presented from a USB stick, a school laptop, an
emailed attachment or a downloaded ZIP. Anything that needs a folder structure
or a network connection will eventually fail in front of an audience.

    python3 build.py
"""

import pathlib
import sys

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"


def read(name: str) -> str:
    path = SRC / name
    if not path.exists():
        sys.exit(f"build: missing {path}")
    return path.read_text(encoding="utf-8")


def main() -> None:
    shell = read("shell.html")
    css = read("deck.css").rstrip() + "\n\n" + read("scenes.css").rstrip()
    js = read("deck.js").rstrip()

    # A literal </script> anywhere in the JS would close the tag early.
    if "</script" in js.lower():
        sys.exit("build: deck.js contains a literal </script>, cannot inline safely")

    out = shell.replace("{{CSS}}", css).replace("{{JS}}", js)

    if "{{CSS}}" in out or "{{JS}}" in out:
        sys.exit("build: placeholder not replaced — check src/shell.html")

    target = ROOT / "index.html"
    target.write_text(out, encoding="utf-8")

    kb = target.stat().st_size / 1024
    print(f"built {target.name}  ({kb:.1f} KB, self-contained)")
    print(f"  css  {len(css):>7,} bytes")
    print(f"  js   {len(js):>7,} bytes")


if __name__ == "__main__":
    main()
