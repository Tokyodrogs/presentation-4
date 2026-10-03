# PASSABLE BA?

**"Know the road before you take it."**

A cinematic 10-slide pitch deck — **VOXSTOCK × TRIVOX**, for the Philippine Startup
Challenge XI. Sablayan National Comprehensive High School (SABNAHIS), Grade 12 – James Gosling.

> Passable Ba? is a proposed street-level flood monitoring and alert system: affordable
> water-level sensors in known flood-prone locations, reporting real-time depth to a
> dashboard and pushing plain-language passability alerts through SMS, Messenger and a web app.

---

## Open the deck

**Double-click `index.html`.** That's it.

It is a single self-contained file — all markup, styles and scripts are inside it. It needs
no server, no internet connection, no fonts to download and no folder structure around it.
You can email it, put it on a USB stick, or open it from a Downloads folder and it will work
exactly the same.

> If you previously saw the deck render as a wall of unstyled text, that was the old
> multi-file version failing to find its `css/` and `js/` folders. This file has no such
> dependency.

## Present it

| Key | Action |
|---|---|
| `→` `Space` `PageDown` | Next slide |
| `←` `PageUp` | Previous slide |
| `Home` / `End` | First / last slide |
| `N` | Speaker notes |
| `G` | Slide overview grid |
| `F` | Fullscreen |
| `H` | Hide the control bar |
| `Esc` | Close notes / overview |

Swipe left and right on a tablet. The buttons at the bottom do the same thing if you would
rather not use the keyboard.

**Export to PDF:** print the page (`Ctrl`/`Cmd` + `P`) and choose "Save as PDF". The print
stylesheet lays out one 1920×1080 slide per page with all animations forced to their final
state — so the PDF shows finished slides, not blank ones.

## Repo layout

```
index.html      ← THE DECK. Self-contained. This is the file you present and share.
build.py        regenerates index.html from src/
src/shell.html  slide markup (the source of truth for content)
src/deck.css    design system, chrome, animations, print rules
src/scenes.css  per-slide cinematic scenes
src/deck.js     navigation, scaling, speaker notes, overview
PASSABLE-BA-pitch-deck.md   the written build sheet this deck implements
assets/         optional: drop the school seal here
```

`index.html` is **generated**. Edit files in `src/`, then:

```bash
python3 build.py
```

That inlines everything back into a single `index.html`. Don't hand-edit `index.html` —
your changes will be overwritten on the next build.

## Design system

| Token | Value | Use |
|---|---|---|
| Deep navy | `#0A1128` | every slide background |
| Electric cyan | `#00E5FF` | data streams, live UI, solution states |
| Warning amber | `#FFB800` | caution states, unknowns, risk cards |
| Danger red | `#FF2D2D` | **only** "NOT PASSABLE" — slides 5 and 10 |

Type uses system font stacks, so nothing is downloaded at presentation time. All readouts
(`WATER LEVEL: 40 CM`, sensor IDs, timestamps) use the monospace stack, so instrumentation
reads as instrumentation.

## Honesty rules — do not break these

The deck deliberately carries three mandatory labels. They are the reason a judge can trust
the numbers on the other slides.

- **Slide 7** — `PROPOSED INITIAL PRICING — NOT MARKET-ESTABLISHED`
- **Slide 5** — `MOCKUP — ILLUSTRATIVE INTERFACE. NOT A LIVE SYSTEM.`
- **Slide 8** — `EXAMPLES ONLY — NO PARTNERSHIPS EXIST YET.`

Never claim deployed sensors, real partnerships, tested accuracy, users, revenue, or that
existing government systems do nothing. Two statistics appear in the deck, both cited
on-slide: PAGASA's ~20 cyclones per year, and Marikina City's 15 m / 16 m / 18 m river alarm
levels at the Sto. Niño Bridge gauge.

Slide 4 explicitly acknowledges that PAGASA and DOST already monitor river levels. That is
intentional — the pitch is the street-level passability layer, not a claim that nothing is
monitored today.

Red is allowed on slides 5 and 10 only. If it spreads to the risk cards on slide 9, the
NOT PASSABLE state stops reading as a warning.

## Adding the school seal

The deck reserves a seal slot in the bottom-right of every slide, at 14% opacity. It is
invisible until the file exists, and never shows a broken image.

1. Save the official seal as `assets/sabnahis-seal.png` (square, transparent background, 512×512+)
2. Put it in an `assets/` folder **next to `index.html`**
3. Reload — it appears on all ten slides

Because the deck is a single file, the seal is the one optional external asset. If you need
it embedded so the deck travels as one file with no folder, ask and it can be base64-inlined
into `index.html`.
