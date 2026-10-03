/* ==================================================================
   PASSABLE BA? — deck runtime
   Navigation, scaling, speaker notes, overview, chrome injection.
   No dependencies.
   ================================================================== */

(function () {
  'use strict';

  var deck      = document.getElementById('deck');
  var stage     = document.getElementById('stage');
  var slides    = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var counter   = document.getElementById('counter');
  var bar       = document.getElementById('progress-bar');
  var notes     = document.getElementById('notes');
  var overview  = document.getElementById('overview');
  var notesTitle = document.getElementById('notes-title');
  var notesText  = document.getElementById('notes-text');
  var notesCue   = document.getElementById('notes-cue');

  var current = 0;

  /* ================================================================
     SPEAKER NOTES
     Natural delivery for a Filipino high-school entrepreneurship pitch.
     The cue line is the thing not to forget.
     ================================================================ */
  var NOTES = [
    {
      title: '1 — You\'re 2 km away',
      text: 'Start quiet. Let the screen do the work. Ask the room: "Has anyone here left the house because the weather looked okay, then got stuck?" Most of the room has. Then walk them through it — you know where you are going, you know it is raining, your map still shows the road open. What you do not know is whether the road ahead is already flooded. That gap is the whole business. Do not mention the product yet — let them feel the problem first.',
      cue: 'Cue: pause after "BUT IS IT?" Let it sit for two full seconds before the logo appears.'
    },
    {
      title: '2 — The information gap',
      text: 'Be careful here: we are not saying weather apps are useless. They are good at what they are built for — telling us a storm is coming. What they do not tell us is whether one specific street, one specific underpass, is passable right now. Show both halves: on the left, the rain warning everyone already has. On the right, the three things nobody can answer — how deep, is the road open, can a motorcycle pass. That is the gap we are proposing to fill.',
      cue: 'Cue: if a judge says "PAGASA already does this", agree — then point to the sensor slide. We come next to that.'
    },
    {
      title: '3 — The reveal',
      text: 'This is the product. One box, mounted on a wall at a flood-prone spot, measuring water depth and sending the number in real time. It is deliberately simple: a sensor, a connection, our platform, and the app people already carry. The readout says 40 cm — that is the number a rider actually needs, translated from raw data into something you can decide on. Keep this to about thirty seconds; the detail comes on the next slide.',
      cue: 'Cue: say the words "street-level" out loud. It is the difference between us and river monitoring.'
    },
    {
      title: '4 — Five steps, no jargon',
      text: 'Explain it like you would to a ten-year-old, and do it in one breath: a sensor measures, a network sends the number, our server organises it, a rule turns it into advice, a person decides. Five steps. Then be honest and get ahead of the obvious question — yes, PAGASA and DOST already monitor river levels, and Marikina City already runs a three-stage alarm on the Marikina River. That is real and it is useful. What it does not tell you is whether the road you are about to take is passable. That is our layer, not their job.',
      cue: 'Cue: this honesty chip WINS points. Say it before a judge asks it.'
    },
    {
      title: '5 — What you see at 40 cm',
      text: 'This is the slide that makes people see the product. Point at the map, then at the alert. The status is not a number we expect riders to interpret — it is plain language: not recommended for motorcycles, caution for cars, updated two minutes ago. The colour code stays consistent everywhere: green passable, yellow caution, orange high water, red not passable. Say clearly that this is a mockup — we have not built it yet — and that makes the next slide believable.',
      cue: 'Cue: point out that we say "not recommended", not "bawal". We inform the decision; the rider still makes it.'
    },
    {
      title: '6 — One road condition',
      text: 'One reading, many people who need it. Do not read the list — name two and let the picture carry the rest. A rider loses a trip and a delivery fee. A trucking company loses cargo and a schedule. A school has to decide by 5 a.m. whether it is safe to hold class. A barangay gets extra eyes on roads it cannot patrol. Same missing information, different losses. That is why this is not just a rider app.',
      cue: 'Cue: pick the group the judge panel will care about most and dwell on that one.'
    },
    {
      title: '7 — How it earns',
      text: 'Money, plainly. Riders pay a small monthly fee — fifty to a hundred pesos is our opening assumption. Businesses pay around five thousand a month because one avoided delayed delivery is worth more than that. Barangays and LGUs pay through service contracts, because they already have disaster-response budgets. Say the label out loud: this is proposed initial pricing, not market research. We have not sold anything yet, and we are not going to pretend we have.',
      cue: 'Cue: NEVER say a price without saying the label. Judges are listening for exactly this.'
    },
    {
      title: '8 — 5–10 sensors, 1 city, 30 days',
      text: 'This is how we prove it cheaply. Not a nationwide rollout — five to ten sensors, one city, thirty days. Identify the flood-prone spots, partner with the barangay or the property owner, install, open it free to a group of riders, collect real data, then measure: was the reading accurate, did people actually use it, did it change where they went. The three cities on this slide are examples of where this could work. We are not claiming any agreement with them — that label is right there for a reason.',
      cue: 'Cue: the MVP is the credibility slide. A judge can picture five sensors. Nobody believes a nationwide launch.'
    },
    {
      title: '9 — We don\'t ignore the risks',
      text: 'Every honest pitch has to answer this: what breaks? The sensor gets stolen; it gets vandalised; the reading drifts; the network drops; the power runs out; we cannot get permission; maintenance piles up; and false alerts destroy trust faster than no alerts. We are not hiding any of it. Each one has an answer already in the plan — secured mounting, protected enclosure, calibration, local storage, solar backup, barangay partnerships, scheduled inspections, health monitoring. A judge who trusts you is one who sees you have already thought about the failure.',
      cue: 'Cue: slow down on this slide. Reading it fast looks like you are hiding something.'
    },
    {
      title: '10 — Know before you go',
      text: 'Bring it home. The same road from the start — except this time the rider knew, stopped early, and took the other route. Then pull back: one road becomes a city, one sensor becomes hundreds, all of them reporting. We are not trying to replace weather forecasting. We are adding the one thing missing at the moment of decision — is the road in front of me passable? Know the road before you take it. Thank you.',
      cue: 'Cue: end on silence. No "thank you" slide after this one — let the black frame do the work.'
    }
  ];

  /* ================================================================
     CHROME — footer + seal + page number, identical on every slide.
     Injected so the ten footers can never drift apart.
     ================================================================ */
  var SEAL_PATH = 'assets/sabnahis-seal.png';

  slides.forEach(function (slide, i) {
    // footer
    var footer = document.createElement('div');
    footer.className = 'slide-footer';
    footer.innerHTML =
      '<span class="footer-mark">TRIVOX · Grade 12 – James Gosling · SABNAHIS</span>' +
      '<span class="footer-page">' + String(i + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0') + '</span>';
    slide.appendChild(footer);

    // seal slot — disappears silently until the real file is added
    var seal = document.createElement('img');
    seal.className = 'seal';
    seal.alt = '';
    seal.setAttribute('aria-hidden', 'true');
    seal.src = SEAL_PATH;
    seal.addEventListener('error', function () { seal.remove(); });
    slide.appendChild(seal);
  });

  /* ================================================================
     SCALING — fit the 1920×1080 canvas to any viewport
     ================================================================ */
  function resize() {
    var pad = 28;
    var scale = Math.min(
      (window.innerWidth  - pad * 2) / 1920,
      (window.innerHeight - pad * 2) / 1080
    );
    // never upscale past 1.0 on huge displays; keep it crisp
    scale = Math.min(scale, 1);
    deck.style.setProperty('--scale', scale);
  }

  window.addEventListener('resize', resize);
  resize();

  /* ================================================================
     NAVIGATION
     ================================================================ */
  function goTo(index, opts) {
    var next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === current && !(opts && opts.force)) return;

    slides[current].classList.remove('is-active');

    // restart build-ins by forcing a reflow
    void slides[next].offsetWidth;
    slides[next].classList.add('is-active');

    current = next;
    counter.textContent = (current + 1) + ' / ' + slides.length;
    bar.style.width = ((current + 1) / slides.length * 100) + '%';

    renderNotes();
    history.replaceState(null, '', '#' + (current + 1));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function renderNotes() {
    var n = NOTES[current] || { title: '', text: '', cue: '' };
    notesTitle.textContent = n.title;
    notesText.textContent  = n.text;
    notesCue.textContent   = n.cue || '';
  }

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  document.getElementById('btn-notes').addEventListener('click', toggleNotes);
  document.getElementById('btn-grid').addEventListener('click', toggleGrid);
  document.getElementById('btn-full').addEventListener('click', toggleFullscreen);

  document.getElementById('btn-hud').addEventListener('click', function () {
    document.getElementById('hud').classList.add('is-hidden');
  });
  document.getElementById('notes-close').addEventListener('click', toggleNotes);

  function toggleNotes() {
    var open = notes.classList.toggle('is-open');
    notes.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function toggleGrid() {
    overview.classList.toggle('is-open');
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      (document.documentElement.requestFullscreen || function () {}).call(document.documentElement);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  /* ================================================================
     OVERVIEW GRID
     ================================================================ */
  var grid = document.getElementById('ov-grid');
  slides.forEach(function (slide, i) {
    var card = document.createElement('button');
    card.className = 'ov-card';
    card.innerHTML =
      '<span class="n">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<span class="t">' + (slide.dataset.title || 'Slide ' + (i + 1)) + '</span>' +
      '<span class="s">' + (slide.dataset.scene || '') + '</span>';
    card.addEventListener('click', function () {
      goTo(i, { force: true });
      overview.classList.remove('is-open');
    });
    grid.appendChild(card);
  });

  /* ================================================================
     KEYBOARD
     ================================================================ */
  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': case ' ':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home':
        e.preventDefault(); goTo(0); break;
      case 'End':
        e.preventDefault(); goTo(slides.length - 1); break;
      case 'n': case 'N':
        toggleNotes(); break;
      case 'g': case 'G':
        toggleGrid(); break;
      case 'f': case 'F':
        toggleFullscreen(); break;
      case 'h': case 'H':
        document.getElementById('hud').classList.toggle('is-hidden'); break;
      case 'Escape':
        notes.classList.remove('is-open');
        overview.classList.remove('is-open');
        break;
    }
  });

  /* ================================================================
     TOUCH
     ================================================================ */
  var touchX = null;
  document.addEventListener('touchstart', function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 55) { dx < 0 ? next() : prev(); }
    touchX = null;
  }, { passive: true });

  /* ================================================================
     BOOT
     ================================================================ */
  var start = parseInt((location.hash || '').replace('#', ''), 10);
  current = 0;
  slides[0].classList.add('is-active');
  counter.textContent = '1 / ' + slides.length;
  bar.style.width = (1 / slides.length * 100) + '%';
  renderNotes();

  if (!isNaN(start) && start > 0) {
    goTo(start - 1, { force: true });
  }
})();
