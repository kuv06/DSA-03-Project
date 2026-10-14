// App shell: sidebar navigation, dashboard analytics, session log.
// Reads the globals defined in script.js (CITIES, DIST, CITY_META, selected, ...)
// and hooks its render functions, so the algorithms themselves are untouched.
(function () {
  const $ = (id) => document.getElementById(id);
  const views = [...document.querySelectorAll('.view')];
  const log = [];
  let lastRoute = null;

  function go(name) {
    views.forEach(v => { v.hidden = v.dataset.view !== name; });
    document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.go === name));
    refresh();
    window.scrollTo(0, 0);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-go]');
    if (b) go(b.dataset.go);
  });

  // ---- hooks into script.js ----
  const origRoute = window.renderRoute;
  window.renderRoute = function (container, opts) {
    origRoute(container, opts);
    lastRoute = { route: opts.route.slice(), cost: opts.cost, closed: !!opts.closed };
    refresh();
  };
  const origUpdate = window.updateSelectionUI;
  window.updateSelectionUI = function () {
    origUpdate();
    if (lastRoute && !lastRoute.route.every(g => selected.includes(g))) lastRoute = null;
    refresh();
  };

  // ---- session log ----
  function record(algo, outId) {
    const out = $(outId);
    const err = out.querySelector('.err');
    let result;
    if (err) result = err.textContent;
    else {
      const stats = [...out.querySelectorAll('.stat')].slice(0, 3)
        .map(s => s.children[0].textContent + ' ' + s.children[1].textContent.toLowerCase());
      result = stats.length ? stats.join(' · ') : (out.textContent.trim().slice(0, 90) || 'Done');
    }
    log.unshift({ t: new Date(), algo, cities: selected.length, result, ok: !err });
    refresh();
  }
  [['dpRun', 'Route planner (TSP)', 'dpOutput'], ['bitmaskRun', 'Bitmask DP', 'bitmaskOutput'],
   ['acRun', 'City extraction', 'acOutput'], ['flowRun', 'Min-cost max-flow', 'flowOutput'],
   ['sosRun', 'Subset partition', 'sosOutput']]
    .forEach(([btn, name, out]) => $(btn).addEventListener('click', () => record(name, out)));

  $('logClear').addEventListener('click', () => { log.length = 0; refresh(); });
  $('resetSel').addEventListener('click', () => { $('clearAll').click(); });
  $('dashExample').addEventListener('click', () => { $('loadExample').click(); });
  $('logoutBtn').addEventListener('click', () => { log.length = 0; lastRoute = null; go('dashboard'); });

  // ---- city directory ----
  const dir = $('dirChips');
  CITIES.forEach((c, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = c.name; b.dataset.idx = i;
    b.addEventListener('click', () => {
      const cb = document.querySelector('#cityList input[data-idx="' + i + '"]');
      if (cb) { cb.checked = !selected.includes(i); cb.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    dir.appendChild(b);
  });

  // ---- rendering helpers ----
  const km = (v) => Math.round(v).toLocaleString('en-IN') + ' km';
  const empty = (t) => '<p class="empty">' + t + '</p>';
  function bars(el, rows, fmt, cls) {
    if (!rows.length) return;
    const max = Math.max(...rows.map(r => r.v)) || 1;
    el.innerHTML = rows.map(r =>
      '<div class="bar-row"><span class="bar-l" title="' + r.l + '">' + r.l + '</span>' +
      '<span class="bar-t"><i class="' + (cls || '') + '" style="width:' + (r.v / max * 100).toFixed(1) + '%"></i></span>' +
      '<span class="bar-v">' + fmt(r.v) + '</span></div>').join('');
  }

  function drawMap() {
    const W = 520, H = 560;
    const P = (c) => { const m = CITY_META[c.name]; return m ? [(m.lon - 68) / 30 * W, (37 - m.lat) / 31 * H] : null; };
    let s = '';
    CITIES.forEach(c => { const p = P(c); if (p) s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.2" fill="rgba(237,230,214,.28)"/>'; });
    if (lastRoute) {
      const pts = lastRoute.route.map(g => P(CITIES[g])).filter(Boolean);
      if (lastRoute.closed && pts.length) pts.push(pts[0]);
      s += '<polyline points="' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') +
           '" fill="none" stroke="#4FAF9C" stroke-width="2.4" stroke-linejoin="round"/>';
    }
    selected.forEach(g => {
      const p = P(CITIES[g]); if (!p) return;
      const n = lastRoute ? lastRoute.route.indexOf(g) + 1 : 0;
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="5.5" fill="#E08A3E" stroke="#0A1E33" stroke-width="1.5"/>' +
           '<text x="' + (p[0] + 9).toFixed(1) + '" y="' + (p[1] + 3.5).toFixed(1) + '">' + (n ? n + ' ' : '') + CITIES[g].name + '</text>';
    });
    $('routeMap').innerHTML = s;
    $('mapHint').textContent = lastRoute ? 'Teal line shows the last route, numbered in visiting order.'
      : 'Selected cities are highlighted. A route appears after you run the planner.';
  }

  function refresh() {
    const n = selected.length;
    $('kSel').textContent = n;
    $('kSelS').textContent = 'of ' + MAX_NODES + ' allowed';
    $('fleetSelCount').textContent = n;
    $('logBadge').textContent = log.length;
    dir.querySelectorAll('button').forEach(b => b.classList.toggle('on', selected.includes(Number(b.dataset.idx))));

    if (lastRoute) {
      $('kDist').textContent = km(lastRoute.cost);
      $('kDistS').textContent = lastRoute.route.length + ' stops' + (lastRoute.closed ? ', returns to start' : ', one way');
      $('kTime').textContent = travelTimeStr(lastRoute.cost);
    } else {
      $('kDist').textContent = '—'; $('kDistS').textContent = 'Run the route planner';
      $('kTime').textContent = '—';
    }
    $('kRuns').textContent = log.length;
    $('kRunsS').textContent = log.length ? 'Latest: ' + log[0].algo : 'No runs yet';

    drawMap();

    // distance from first selected city
    const hub = $('hubBars'), legs = $('legBars'), st = $('stateBars');
    if (n >= 2) {
      const h = selected[0];
      $('hubHint').textContent = 'Road distance from ' + CITIES[h].name + ' to each other selected city.';
      bars(hub, selected.slice(1).map(g => ({ l: CITIES[g].name, v: DIST[h][g] })).sort((a, b) => b.v - a.v), km, 'o');
    } else hub.innerHTML = empty('Select at least 2 cities to compare distances.');

    if (lastRoute && lastRoute.route.length > 1) {
      const r = lastRoute.route.slice(); if (lastRoute.closed) r.push(r[0]);
      const rows = [];
      for (let i = 0; i < r.length - 1; i++) rows.push({ l: CITIES[r[i]].name + ' → ' + CITIES[r[i + 1]].name, v: DIST[r[i]][r[i + 1]] });
      bars(legs, rows, km);
    } else legs.innerHTML = empty('Run the route planner to see each leg.');

    const total = {}, sel = {};
    CITIES.forEach(c => { total[c.state] = (total[c.state] || 0) + 1; });
    selected.forEach(g => { const s = CITIES[g].state; sel[s] = (sel[s] || 0) + 1; });
    const top = Object.keys(total).sort((a, b) => (sel[b] || 0) - (sel[a] || 0) || total[b] - total[a]).slice(0, 8);
    const max = Math.max(...top.map(s => total[s]));
    st.innerHTML = top.map(s =>
      '<div class="bar-row"><span class="bar-l" title="' + s + '">' + s + '</span><span class="bar-t">' +
      '<i class="base" style="width:' + (total[s] / max * 100) + '%"></i>' +
      '<i class="o" style="width:' + ((sel[s] || 0) / max * 100) + '%"></i></span>' +
      '<span class="bar-v">' + (sel[s] || 0) + ' / ' + total[s] + '</span></div>').join('');

    // recent runs + full log
    const time = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    $('recentRuns').innerHTML = log.length
      ? '<ul class="recent">' + log.slice(0, 5).map(l => '<li><span>' + l.algo + '</span><span>' + time(l.t) + '</span></li>').join('') + '</ul>'
      : empty('Nothing yet. Run an algorithm from the route planner or fleet assignment.');
    $('logTable').innerHTML = log.length
      ? '<table class="out-table"><thead><tr><th>Time</th><th>Algorithm</th><th>Cities</th><th>Result</th><th>Status</th></tr></thead><tbody>' +
        log.map(l => '<tr><td>' + time(l.t) + '</td><td>' + l.algo + '</td><td>' + l.cities + '</td><td>' + l.result +
          '</td><td class="' + (l.ok ? 'ok' : 'bad') + '">' + (l.ok ? 'Done' : 'Error') + '</td></tr>').join('') + '</tbody></table>'
      : empty('No runs yet. Results appear here as you run algorithms.');
  }

  refresh();
})();
