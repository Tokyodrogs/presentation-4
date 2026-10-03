# assets/

## `sabnahis-seal.png` — drop the school seal here

Every slide reserves a seal slot in the bottom-right corner, at **14% opacity**, sized
**132 × 132 px**. It is intentionally invisible until the file exists.

To activate it:

1. Save the official SABNAHIS seal as `assets/sabnahis-seal.png`
2. A square, transparent-background PNG works best (512×512 or larger)
3. Reload the page — the seal appears on all ten slides automatically

`js/deck.js` injects the seal into every slide and removes the element silently if the
file is missing, so the deck never shows a broken image while you are still assembling it.

**Do not** recolour, crop the ring, or place the seal over a slide's focal point. At 14%
opacity it should read as a watermark, not a logo lockup.
