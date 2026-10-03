# PASSABLE BA?

**"Know the road before you take it."**

A cinematic 10-slide pitch deck — **VOXSTOCK × TRIVOX**, for the Philippine Startup
Challenge XI. Sablayan National Comprehensive High School (SABNAHIS), Grade 12 – James Gosling.

> Passable Ba? is a proposed street-level flood monitoring and alert system: affordable
> water-level sensors in known flood-prone locations, reporting real-time depth to a
> dashboard and pushing plain-language passability alerts through SMS, Messenger and a web app.

---

## Run it

No build step, no dependencies.

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Any static server works. You can also just open `index.html` directly in a browser.

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

Swipe left and right on a tablet. The URL hash tracks the slide (`#1`–`#10`), so you can
bookmark or reload straight into a slide.

**Export to PDF:** print the page (Ctrl/Cmd+P). The print stylesheet lays out one
1920×1080 slide per page, with all build-in animations forced to their final state.

## Files

```
index.html              all 10 slides, with inline SVG scenes
css/deck.css            design system, chrome, build-in animations, print rules
css/scenes.css          per-slide cinematic scenes
js/deck.js              navigation, scaling, speaker notes, overview, chrome injection
assets/                 drop sabnahis-seal.png here — see assets/README.md
PASSABLE-BA-pitch-deck.md   the full written build sheet this deck implements
```

## Design system

| Token | Value | Use |
|---|---|---|
| Deep navy | `#0A1128` | every slide background |
| Electric cyan | `#00E5FF` | data streams, live UI, solution states |
| Warning amber | `#FFB800` | caution states, unknowns, risk cards |
| Danger red | `#FF2D2D` | **only** "NOT PASSABLE" — slides 5 and 10 |

Display type is Inter Tight, body is Inter, and all readouts (`WATER LEVEL: 40 CM`,
sensor IDs, timestamps) use JetBrains Mono so instrumentation reads as instrumentation.

## Honesty rules — do not break these

The deck deliberately carries three mandatory labels. They are the reason a judge can
trust the numbers on the other slides.

- **Slide 7** — `PROPOSED INITIAL PRICING — NOT MARKET-ESTABLISHED`
- **Slide 5** — `MOCKUP — ILLUSTRATIVE INTERFACE. NOT A LIVE SYSTEM.`
- **Slide 8** — `EXAMPLES ONLY — NO PARTNERSHIPS EXIST YET.`

Never claim deployed sensors, real partnerships, tested accuracy, users, revenue, or that
existing government systems do nothing. Two statistics appear in the deck, both cited
on-slide: PAGASA's ~20 cyclones per year, and Marikina City's 15 m / 16 m / 18 m river
alarm levels at the Sto. Niño Bridge gauge.

Slide 4 explicitly acknowledges that PAGASA and DOST already monitor river levels. That
is intentional — the pitch is the street-level passability layer, not a claim that nothing
is monitored today.

Red is allowed on slides 5 and 10 only. If it spreads to the risk cards on slide 9, the
NOT PASSABLE state stops reading as a warning.

## Adding the school seal

See `assets/README.md`. Drop `sabnahis-seal.png` into `assets/` and it appears on all ten
slides automatically.
