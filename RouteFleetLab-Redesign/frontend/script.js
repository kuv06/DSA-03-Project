// ---------------------------------------------------------------
// Login (demo/client-side authentication)
// ---------------------------------------------------------------
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'admin123';

const loginScreen = document.getElementById('loginScreen');
const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const loggedInUser = document.getElementById('loggedInUser');
const logoutBtn = document.getElementById('logoutBtn');

function showApp(username) {
  document.body.classList.add('logged-in');
  loggedInUser.textContent = username;
}

function showLogin() {
  document.body.classList.remove('logged-in');
  loggedInUser.textContent = '—';
  loginPassword.value = '';
  loginError.textContent = '';
}

if (sessionStorage.getItem('routeFlowLoggedIn') === 'true') {
  showApp(sessionStorage.getItem('routeFlowUser') || DEMO_USERNAME);
} else {
  showLogin();
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    sessionStorage.setItem('routeFlowLoggedIn', 'true');
    sessionStorage.setItem('routeFlowUser', username);
    showApp(username);
  } else {
    loginError.textContent = 'Invalid username or password.';
  }
});

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('routeFlowLoggedIn');
  sessionStorage.removeItem('routeFlowUser');
  showLogin();
  loginUsername.focus();
});

// ---------------------------------------------------------------
// Data: loaded from data/distances.csv (via data/distances.js so it
// also works when index.html is opened straight from disk).
// The CSV is a square matrix: header row = the 100 city names,
// first column = city name, cells = road distance in km.
// ---------------------------------------------------------------
const CITY_META = {"Mumbai":{"state":"Maharashtra","lat":19.076,"lon":72.8777},"Delhi":{"state":"Delhi","lat":28.6139,"lon":77.209},"Bengaluru":{"state":"Karnataka","lat":12.9716,"lon":77.5946},"Hyderabad":{"state":"Telangana","lat":17.385,"lon":78.4867},"Ahmedabad":{"state":"Gujarat","lat":23.0225,"lon":72.5714},"Chennai":{"state":"Tamil Nadu","lat":13.0827,"lon":80.2707},"Kolkata":{"state":"West Bengal","lat":22.5726,"lon":88.3639},"Pune":{"state":"Maharashtra","lat":18.5204,"lon":73.8567},"Jaipur":{"state":"Rajasthan","lat":26.9124,"lon":75.7873},"Surat":{"state":"Gujarat","lat":21.1702,"lon":72.8311},"Lucknow":{"state":"Uttar Pradesh","lat":26.8467,"lon":80.9462},"Kanpur":{"state":"Uttar Pradesh","lat":26.4499,"lon":80.3319},"Nagpur":{"state":"Maharashtra","lat":21.1458,"lon":79.0882},"Indore":{"state":"Madhya Pradesh","lat":22.7196,"lon":75.8577},"Thane":{"state":"Maharashtra","lat":19.2183,"lon":72.9781},"Bhopal":{"state":"Madhya Pradesh","lat":23.2599,"lon":77.4126},"Visakhapatnam":{"state":"Andhra Pradesh","lat":17.6868,"lon":83.2185},"Patna":{"state":"Bihar","lat":25.5941,"lon":85.1376},"Vadodara":{"state":"Gujarat","lat":22.3072,"lon":73.1812},"Ghaziabad":{"state":"Uttar Pradesh","lat":28.6692,"lon":77.4538},"Ludhiana":{"state":"Punjab","lat":30.901,"lon":75.8573},"Agra":{"state":"Uttar Pradesh","lat":27.1767,"lon":78.0081},"Nashik":{"state":"Maharashtra","lat":19.9975,"lon":73.7898},"Faridabad":{"state":"Haryana","lat":28.4089,"lon":77.3178},"Meerut":{"state":"Uttar Pradesh","lat":28.9845,"lon":77.7064},"Rajkot":{"state":"Gujarat","lat":22.3039,"lon":70.8022},"Kalyan":{"state":"Maharashtra","lat":19.2437,"lon":73.1355},"Vasai":{"state":"Maharashtra","lat":19.3919,"lon":72.8397},"Varanasi":{"state":"Uttar Pradesh","lat":25.3176,"lon":82.9739},"Srinagar":{"state":"Jammu and Kashmir","lat":34.0837,"lon":74.7973},"Aurangabad":{"state":"Maharashtra","lat":19.8762,"lon":75.3433},"Dhanbad":{"state":"Jharkhand","lat":23.7957,"lon":86.4304},"Amritsar":{"state":"Punjab","lat":31.634,"lon":74.8723},"Navi Mumbai":{"state":"Maharashtra","lat":19.033,"lon":73.0297},"Allahabad":{"state":"Uttar Pradesh","lat":25.4358,"lon":81.8463},"Ranchi":{"state":"Jharkhand","lat":23.3441,"lon":85.3096},"Howrah":{"state":"West Bengal","lat":22.5958,"lon":88.2636},"Coimbatore":{"state":"Tamil Nadu","lat":11.0168,"lon":76.9558},"Jabalpur":{"state":"Madhya Pradesh","lat":23.1815,"lon":79.9864},"Gwalior":{"state":"Madhya Pradesh","lat":26.2183,"lon":78.1828},"Vijayawada":{"state":"Andhra Pradesh","lat":16.5062,"lon":80.648},"Jodhpur":{"state":"Rajasthan","lat":26.2389,"lon":73.0243},"Madurai":{"state":"Tamil Nadu","lat":9.9252,"lon":78.1198},"Raipur":{"state":"Chhattisgarh","lat":21.2514,"lon":81.6296},"Kota":{"state":"Rajasthan","lat":25.2138,"lon":75.8648},"Chandigarh":{"state":"Chandigarh","lat":30.7333,"lon":76.7794},"Guwahati":{"state":"Assam","lat":26.1445,"lon":91.7362},"Solapur":{"state":"Maharashtra","lat":17.6599,"lon":75.9064},"Hubballi":{"state":"Karnataka","lat":15.3647,"lon":75.124},"Mysuru":{"state":"Karnataka","lat":12.2958,"lon":76.6394},"Tiruchirappalli":{"state":"Tamil Nadu","lat":10.7905,"lon":78.7047},"Bareilly":{"state":"Uttar Pradesh","lat":28.367,"lon":79.4304},"Moradabad":{"state":"Uttar Pradesh","lat":28.8386,"lon":78.7733},"Mangalore":{"state":"Karnataka","lat":12.9141,"lon":74.856},"Bhubaneswar":{"state":"Odisha","lat":20.2961,"lon":85.8245},"Salem":{"state":"Tamil Nadu","lat":11.6643,"lon":78.146},"Warangal":{"state":"Telangana","lat":17.9689,"lon":79.5941},"Gurugram":{"state":"Haryana","lat":28.4595,"lon":77.0266},"Aligarh":{"state":"Uttar Pradesh","lat":27.8974,"lon":78.088},"Bikaner":{"state":"Rajasthan","lat":28.0229,"lon":73.3119},"Dehradun":{"state":"Uttarakhand","lat":30.3165,"lon":78.0322},"Jamshedpur":{"state":"Jharkhand","lat":22.8046,"lon":86.2029},"Bokaro":{"state":"Jharkhand","lat":23.6693,"lon":86.1511},"Udaipur":{"state":"Rajasthan","lat":24.5854,"lon":73.7125},"Ajmer":{"state":"Rajasthan","lat":26.4499,"lon":74.6399},"Kozhikode":{"state":"Kerala","lat":11.2588,"lon":75.7804},"Thiruvananthapuram":{"state":"Kerala","lat":8.5241,"lon":76.9366},"Kochi":{"state":"Kerala","lat":9.9312,"lon":76.2673},"Thrissur":{"state":"Kerala","lat":10.5276,"lon":76.2144},"Kannur":{"state":"Kerala","lat":11.8745,"lon":75.3704},"Tiruppur":{"state":"Tamil Nadu","lat":11.1085,"lon":77.3411},"Erode":{"state":"Tamil Nadu","lat":11.341,"lon":77.7172},"Vellore":{"state":"Tamil Nadu","lat":12.9165,"lon":79.1325},"Puducherry":{"state":"Puducherry","lat":11.9416,"lon":79.8083},"Kurnool":{"state":"Andhra Pradesh","lat":15.8281,"lon":78.0373},"Tirupati":{"state":"Andhra Pradesh","lat":13.6288,"lon":79.4192},"Nellore":{"state":"Andhra Pradesh","lat":14.4426,"lon":79.9865},"Guntur":{"state":"Andhra Pradesh","lat":16.3067,"lon":80.4365},"Kakinada":{"state":"Andhra Pradesh","lat":16.9891,"lon":82.2475},"Belagavi":{"state":"Karnataka","lat":15.8497,"lon":74.4977},"Dharwad":{"state":"Karnataka","lat":15.4589,"lon":75.0078},"Tumakuru":{"state":"Karnataka","lat":13.3379,"lon":77.1173},"Shimoga":{"state":"Karnataka","lat":13.9299,"lon":75.5681},"Ujjain":{"state":"Madhya Pradesh","lat":23.1765,"lon":75.7885},"Sagar":{"state":"Madhya Pradesh","lat":23.8388,"lon":78.7378},"Satna":{"state":"Madhya Pradesh","lat":24.6005,"lon":80.8322},"Bilaspur":{"state":"Chhattisgarh","lat":22.0796,"lon":82.1391},"Durg":{"state":"Chhattisgarh","lat":21.1904,"lon":81.2849},"Cuttack":{"state":"Odisha","lat":20.4625,"lon":85.883},"Rourkela":{"state":"Odisha","lat":22.2604,"lon":84.8536},"Siliguri":{"state":"West Bengal","lat":26.7271,"lon":88.3953},"Durgapur":{"state":"West Bengal","lat":23.5204,"lon":87.3119},"Asansol":{"state":"West Bengal","lat":23.6739,"lon":87.148},"Kharagpur":{"state":"West Bengal","lat":22.346,"lon":87.232},"Gaya":{"state":"Bihar","lat":24.7914,"lon":85.0002},"Muzaffarpur":{"state":"Bihar","lat":26.1209,"lon":85.3647},"Darbhanga":{"state":"Bihar","lat":26.1542,"lon":85.8918},"Panipat":{"state":"Haryana","lat":29.3909,"lon":76.9635},"Karnal":{"state":"Haryana","lat":29.6857,"lon":76.9905},"Rohtak":{"state":"Haryana","lat":28.8955,"lon":76.6066}};

function parseDistanceCSV(text) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).filter(l => l.trim() !== '');
  const header = lines[0].split(',').map(x => x.trim()).slice(1);
  const dist = [];
  lines.slice(1).forEach(line => {
    const cells = line.split(',');
    dist.push(cells.slice(1).map(Number));
  });
  const rowNames = lines.slice(1).map(l => l.split(',')[0].trim());
  if (dist.length !== header.length || rowNames.some((n, i) => n !== header[i])) {
    throw new Error('distances.csv must be a square matrix with matching row/column city names');
  }
  const cities = header.map((name, i) => {
    const meta = CITY_META[name] || { state: '', lat: null, lon: null };
    return { id: i + 1, name: name, state: meta.state, lat: meta.lat, lon: meta.lon };
  });
  return { cities: cities, dist: dist };
}

if (typeof DISTANCE_CSV === 'undefined') {
  throw new Error('data/distances.js failed to load -- check that frontend/data/distances.js exists.');
}
const DATA = parseDistanceCSV(DISTANCE_CSV);
const CITIES = DATA.cities;
const DIST = DATA.dist;
const MAX_NODES = 13;
const AVG_SPEED_KMH = 60; // assumed average road speed, used only to turn distance into travel time
function fmtTime(hours) {
  const totalMinutes = Math.round(hours * 60);
  if (totalMinutes < 60) return totalMinutes + ' min';
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return h + 'h' + (m ? ' ' + m + 'm' : '');
}
function travelTimeStr(km) { return fmtTime(km / AVG_SPEED_KMH); }
document.getElementById('max-nodes-label').textContent = MAX_NODES;
document.getElementById('tb-nodes').textContent = CITIES.length + ' cities loaded';

const nameByIndex = CITIES.map(c => c.name);
let selected = []; // array of global city indices, in the order chosen

// ---------------------------------------------------------------
// Bitmask DP core, reused for closed tour / open path /
// forced-endpoint path by changing only how the final answer is read.
// ---------------------------------------------------------------
function bitmaskDPTable(sub) {
  const n = sub.length;
  const size = 1 << n;
  const dp = new Array(size);
  const parent = new Array(size);
  for (let m = 0; m < size; m++) {
    dp[m] = new Float64Array(n).fill(Infinity);
    parent[m] = new Int16Array(n).fill(-1);
  }
  dp[1][0] = 0;
  for (let mask = 1; mask < size; mask++) {
    if (!(mask & 1)) continue; // city 0 (the fixed start) must always be in the set
    for (let j = 0; j < n; j++) {
      if (!(mask & (1 << j))) continue;
      const cur = dp[mask][j];
      if (cur === Infinity) continue;
      for (let k = 0; k < n; k++) {
        if (mask & (1 << k)) continue;
        const nmask = mask | (1 << k);
        const nd = cur + sub[j][k];
        if (nd < dp[nmask][k]) {
          dp[nmask][k] = nd;
          parent[nmask][k] = j;
        }
      }
    }
  }
  return { dp, parent, n, fullMask: size - 1 };
}

function reconstructPath(parent, fullMask, endLocal) {
  const path = [];
  let mask = fullMask, j = endLocal;
  while (j !== -1) {
    path.push(j);
    const pj = parent[mask][j];
    mask ^= (1 << j);
    j = pj;
  }
  return path.reverse();
}

function closedTour(sub) {
  const n = sub.length;
  if (n === 1) return { cost: 0, path: [0] };
  const { dp, parent, fullMask } = bitmaskDPTable(sub);
  let best = Infinity, bestJ = -1;
  for (let j = 1; j < n; j++) {
    const cand = dp[fullMask][j] + sub[j][0];
    if (cand < best) { best = cand; bestJ = j; }
  }
  return { cost: best, path: reconstructPath(parent, fullMask, bestJ) };
}

function openPath(sub, forcedEndLocal) {
  const n = sub.length;
  if (n === 1) return { cost: 0, path: [0] };
  const { dp, parent, fullMask } = bitmaskDPTable(sub);
  let best, bestJ;
  if (forcedEndLocal !== undefined && forcedEndLocal !== null) {
    bestJ = forcedEndLocal;
    best = dp[fullMask][forcedEndLocal];
  } else {
    best = Infinity; bestJ = -1;
    for (let j = 0; j < n; j++) {
      if (dp[fullMask][j] < best) { best = dp[fullMask][j]; bestJ = j; }
    }
  }
  return { cost: best, path: reconstructPath(parent, fullMask, bestJ) };
}

function reorderWithStart(globalIdxList, startGlobal) {
  const rest = globalIdxList.filter(g => g !== startGlobal);
  return [startGlobal, ...rest];
}

function buildSub(order) {
  return order.map(a => order.map(b => DIST[a][b]));
}

// ---------------------------------------------------------------
// Minimum-Cost Maximum-Flow (Successive Shortest Paths / SPFA)
// ---------------------------------------------------------------
class MinCostMaxFlow {
  constructor(n) {
    this.n = n;
    this.adj = Array.from({ length: n }, () => []);
    this.to = [];
    this.origCap = [];
    this.cap = [];
    this.cost = [];
  }
  addEdge(u, v, capacity, costPerUnit) {
    const fwd = this.to.length;
    this.adj[u].push(fwd);
    this.to.push(v); this.origCap.push(capacity); this.cap.push(capacity); this.cost.push(costPerUnit);
    this.adj[v].push(fwd + 1);
    this.to.push(u); this.origCap.push(0); this.cap.push(0); this.cost.push(-costPerUnit);
    return fwd;
  }
  flowOn(edgeId) { return this.origCap[edgeId] - this.cap[edgeId]; }
  solve(source, sink) {
    let flow = 0, totalCost = 0;
    while (true) {
      const dist = new Array(this.n).fill(Infinity);
      const parentEdge = new Array(this.n).fill(-1);
      const inQueue = new Array(this.n).fill(false);
      dist[source] = 0;
      const queue = [source];
      inQueue[source] = true;
      let qi = 0;
      while (qi < queue.length) {
        const u = queue[qi++];
        inQueue[u] = false;
        for (const e of this.adj[u]) {
          if (this.cap[e] <= 0) continue;
          const v = this.to[e];
          const nd = dist[u] + this.cost[e];
          if (nd < dist[v]) {
            dist[v] = nd;
            parentEdge[v] = e;
            if (!inQueue[v]) { queue.push(v); inQueue[v] = true; }
          }
        }
      }
      if (parentEdge[sink] === -1) break;
      let push = Infinity, v = sink;
      while (v !== source) {
        const e = parentEdge[v];
        push = Math.min(push, this.cap[e]);
        v = this.to[e ^ 1];
      }
      v = sink;
      while (v !== source) {
        const e = parentEdge[v];
        this.cap[e] -= push;
        this.cap[e ^ 1] += push;
        v = this.to[e ^ 1];
      }
      flow += push;
      totalCost += push * dist[sink];
    }
    return { maxFlow: flow, minCost: totalCost };
  }
}

// ---------------------------------------------------------------
// Aho-Corasick: multi-pattern string matching (one linear pass over
// the text finds every city name at once, via a trie of all 100 names
// with failure links -- rather than 100 separate substring searches).
// ---------------------------------------------------------------
class AhoCorasick {
  constructor(patterns) {
    this.patterns = patterns; // lowercase strings, index = pattern id
    this.children = [{}];     // trie: node -> { char: childNode }
    this.fail = [0];
    this.outputs = [[]];      // pattern ids ending at this node (after merging fail-chain outputs)
    patterns.forEach((p, id) => this.insert(p, id));
    this.buildFailLinks();
  }
  insert(pattern, id) {
    let node = 0;
    for (const ch of pattern) {
      if (!(ch in this.children[node])) {
        this.children.push({});
        this.fail.push(0);
        this.outputs.push([]);
        this.children[node][ch] = this.children.length - 1;
      }
      node = this.children[node][ch];
    }
    this.outputs[node].push(id);
  }
  buildFailLinks() {
    const queue = [];
    for (const ch in this.children[0]) {
      const child = this.children[0][ch];
      this.fail[child] = 0;
      queue.push(child);
    }
    let qi = 0;
    while (qi < queue.length) {
      const u = queue[qi++];
      for (const ch in this.children[u]) {
        const v = this.children[u][ch];
        let f = this.fail[u];
        while (f !== 0 && !(ch in this.children[f])) f = this.fail[f];
        this.fail[v] = (ch in this.children[f] && this.children[f][ch] !== v) ? this.children[f][ch] : 0;
        this.outputs[v] = this.outputs[v].concat(this.outputs[this.fail[v]]);
        queue.push(v);
      }
    }
  }
  // Returns every match as { id, start, end } (end inclusive), one linear pass over text.
  search(text) {
    const matches = [];
    let node = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      while (node !== 0 && !(ch in this.children[node])) node = this.fail[node];
      node = (ch in this.children[node]) ? this.children[node][ch] : 0;
      if (this.outputs[node].length) {
        for (const id of this.outputs[node]) {
          matches.push({ id, start: i - this.patterns[id].length + 1, end: i });
        }
      }
    }
    return matches;
  }
}

// ---------------------------------------------------------------
// Sum over Subsets (SOS DP): given a value on every SINGLETON subset,
// compute the sum over all submasks of every mask in O(n * 2^n) --
// here that turns "depot-distance of one city" into "total depot-
// distance of every possible group of customer cities," all at once.
// ---------------------------------------------------------------
function sumOverSubsets(weights) {
  const m = weights.length;
  const size = 1 << m;
  const f = new Float64Array(size); // f[mask] starts as the base function, ends as the SOS transform
  for (let i = 0; i < m; i++) f[1 << i] = weights[i];
  for (let b = 0; b < m; b++) {
    for (let mask = 0; mask < size; mask++) {
      if (mask & (1 << b)) f[mask] += f[mask ^ (1 << b)];
    }
  }
  return f; // f[mask] = sum of weights[i] for every i in mask
}

// ---------------------------------------------------------------
// City picker
// ---------------------------------------------------------------
const cityListEl = document.getElementById('cityList');
const chipsEl = document.getElementById('chips');
const citySearchEl = document.getElementById('citySearch');
const tbSelected = document.getElementById('tb-selected');

CITIES.forEach((c, idx) => {
  const label = document.createElement('label');
  label.dataset.idx = idx;
  label.dataset.text = (c.name + ' ' + c.state).toLowerCase();
  label.innerHTML = '<input type="checkbox" data-idx="' + idx + '">' +
                     '<span class="name-state">' + c.name + '<span class="st">' + c.state + '</span></span>';
  cityListEl.appendChild(label);
});

cityListEl.addEventListener('change', (e) => {
  if (e.target.tagName !== 'INPUT') return;
  const idx = Number(e.target.dataset.idx);
  if (e.target.checked) {
    if (!selected.includes(idx)) {
      if (selected.length >= MAX_NODES) {
        e.target.checked = false;
        flashLimitNote();
        return;
      }
      selected.push(idx);
    }
  } else {
    selected = selected.filter(i => i !== idx);
  }
  updateSelectionUI();
});

function flashLimitNote() {
  const note = document.createElement('div');
  note.className = 'err';
  note.style.marginTop = '6px';
  note.textContent = 'Selection limit reached (' + MAX_NODES + ') — remove a city before adding another.';
  chipsEl.parentElement.appendChild(note);
  setTimeout(() => note.remove(), 2600);
}

citySearchEl.addEventListener('input', () => {
  const q = citySearchEl.value.trim().toLowerCase();
  cityListEl.querySelectorAll('label').forEach(l => {
    l.style.display = l.dataset.text.includes(q) ? 'flex' : 'none';
  });
});

document.getElementById('loadExample').addEventListener('click', () => {
  const names = ['Hyderabad', 'Warangal', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'];
  selected = names.map(n => CITIES.findIndex(c => c.name === n)).filter(i => i !== -1);
  updateSelectionUI();
});

document.getElementById('clearAll').addEventListener('click', () => {
  selected = [];
  updateSelectionUI();
});

function updateSelectionUI() {
  // sync checkboxes
  cityListEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.checked = selected.includes(Number(cb.dataset.idx));
  });
  // chips
  chipsEl.innerHTML = '';
  if (selected.length === 0) {
    chipsEl.innerHTML = '<span class="empty-note">No cities selected yet — search and check a few on the left.</span>';
  } else {
    selected.forEach(idx => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.innerHTML = '<span>' + CITIES[idx].name + '</span>';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Remove ' + CITIES[idx].name);
      btn.textContent = '×';
      btn.addEventListener('click', () => {
        selected = selected.filter(i => i !== idx);
        updateSelectionUI();
      });
      chip.appendChild(btn);
      chipsEl.appendChild(chip);
    });
  }
  tbSelected.textContent = selected.length;
  renderBitmaskControls(bitmaskMode);
  renderDPControls(dpMode);
  renderFlowControls(flowMode);
  if (typeof renderSOSControls === 'function') renderSOSControls();
}

function cityOptionsHTML(excludeIdx) {
  return selected
    .filter(idx => idx !== excludeIdx)
    .concat(excludeIdx === undefined ? [] : [])
    .map(idx => '')
    .join('');
}

function buildSelect(id, label, includeAll, excludeIdx) {
  const opts = selected
    .filter(idx => excludeIdx === undefined || idx !== excludeIdx)
    .map(idx => '<option value="' + idx + '">' + CITIES[idx].name + '</option>')
    .join('');
  return '<div class="field"><label for="' + id + '">' + label + '</label>' +
         '<select id="' + id + '">' + opts + '</select></div>';
}

// ---------------------------------------------------------------
// Aho-Corasick panel: extract every mentioned city from pasted text
// ---------------------------------------------------------------
const cityMatcher = new AhoCorasick(CITIES.map(c => c.name.toLowerCase()));

function isLetter(ch) { return !!ch && /[a-z]/i.test(ch); }

document.getElementById('acRun').addEventListener('click', () => {
  const out = document.getElementById('acOutput');
  out.innerHTML = '';
  const text = document.getElementById('acText').value;
  if (!text.trim()) return showMsg(out, 'Paste some text first.', true);

  const lower = text.toLowerCase();
  const t0 = performance.now();
  const rawMatches = cityMatcher.search(lower);
  // Keep only matches bounded by non-letters (so "Pune" inside "Puneet" is rejected),
  // then dedupe by city id, keeping the earliest position each city appears at.
  const firstPos = new Map();
  for (const m of rawMatches) {
    const before = lower[m.start - 1];
    const after = lower[m.end + 1];
    if (isLetter(before) || isLetter(after)) continue;
    if (!firstPos.has(m.id) || m.start < firstPos.get(m.id)) firstPos.set(m.id, m.start);
  }
  const ms = performance.now() - t0;
  const foundIds = [...firstPos.entries()].sort((a, b) => a[1] - b[1]).map(e => e[0]);

  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' +
      stat(CITIES.length, 'Patterns (cities)') +
      stat(cityMatcher.children.length, 'Trie nodes') +
      stat(foundIds.length, 'Cities found') +
      stat(ms.toFixed(2) + ' ms', 'Computed in (1 pass)') +
    '</div>';
  out.appendChild(html);

  if (foundIds.length === 0) {
    showMsg(out, 'No city names recognized in that text.', false);
    return;
  }

  const chipRow = document.createElement('div');
  chipRow.className = 'chips';
  chipRow.style.marginTop = '4px';
  foundIds.forEach(id => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.style.background = '#5B4394';
    chip.innerHTML = '<span>' + CITIES[id].name + '</span>';
    chipRow.appendChild(chip);
  });
  out.appendChild(chipRow);

  const addBtn = document.createElement('button');
  addBtn.className = 'run-btn';
  addBtn.style.cssText = 'background:#5B4394; margin-top:10px; padding:8px 16px; font-size:12.5px;';
  addBtn.textContent = 'Add these to the city selection';
  addBtn.addEventListener('click', () => {
    let added = 0, skipped = 0;
    foundIds.forEach(id => {
      if (selected.includes(id)) return;
      if (selected.length >= MAX_NODES) { skipped++; return; }
      selected.push(id);
      added++;
    });
    updateSelectionUI();
    const note = document.createElement('p');
    note.className = 'assign-note';
    note.style.marginTop = '8px';
    note.textContent = added + ' added to selection' + (skipped ? ', ' + skipped + ' skipped (selection limit reached)' : '') + '.';
    out.appendChild(note);
  });
  out.appendChild(addBtn);
});

// ---------------------------------------------------------------
// Bitmask DP panel (core technique on its own, no route-building)
// ---------------------------------------------------------------
let bitmaskMode = 'all';
const bitmaskTabs = document.getElementById('bitmaskTabs');
const bitmaskControls = document.getElementById('bitmaskControls');

bitmaskTabs.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  bitmaskMode = e.target.dataset.mode;
  [...bitmaskTabs.children].forEach(b => b.classList.toggle('active', b === e.target));
  document.getElementById('bitmaskOutput').innerHTML = '';
  renderBitmaskControls(bitmaskMode);
});

function renderBitmaskControls(mode) {
  if (mode === 'between') {
    bitmaskControls.innerHTML =
      buildSelect('bitmaskStart', 'Start city', false) +
      buildSelect('bitmaskEnd', 'End city', false);
    if (selected.length >= 2) document.getElementById('bitmaskEnd').selectedIndex = 1;
  } else {
    bitmaskControls.innerHTML = '<p class="hint" style="margin:0;">' +
      (mode === 'all'
        ? 'Builds one dp[mask][j] table, fixed start = <b>' +
          (selected.length ? CITIES[selected[0]].name : '(first selected city)') + '</b>.'
        : 'Builds a separate dp[mask][j] table for each selected city as the fixed start.') +
      '</p>';
  }
}

// Runs the DP once and buckets every reachable state by how many cities its mask has visited.
function computeLevelStats(sub) {
  const { dp, n, fullMask } = bitmaskDPTable(sub);
  const bestPerLevel = new Array(n + 1).fill(Infinity);
  const statesPerLevel = new Array(n + 1).fill(0);
  for (let mask = 1; mask <= fullMask; mask++) {
    if (!(mask & 1)) continue; // the fixed start city is always in the mask
    let popcount = 0;
    for (let b = 0; b < n; b++) if (mask & (1 << b)) popcount++;
    for (let j = 0; j < n; j++) {
      const v = dp[mask][j];
      if (v === Infinity) continue;
      statesPerLevel[popcount]++;
      if (v < bestPerLevel[popcount]) bestPerLevel[popcount] = v;
    }
  }
  let totalReached = 0;
  for (let lvl = 1; lvl <= n; lvl++) totalReached += statesPerLevel[lvl];
  const theoreticalStates = n * (1 << (n - 1)); // n * 2^(n-1): start bit is always fixed
  return { dp, n, fullMask, bestPerLevel, statesPerLevel, totalReached, theoreticalStates };
}

function renderLevelTable(container, startName, stats, ms, forced) {
  const { n, bestPerLevel, statesPerLevel, totalReached, theoreticalStates } = stats;
  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' +
      stat(n, 'Cities (n)') +
      stat(totalReached, 'States reached') +
      stat(ms.toFixed(2) + ' ms', 'Computed in') +
    '</div>' +
    '<p class="assign-note">Fixed start: <b>' + startName + '</b>. Table capacity is ' +
      'n·2ⁿ⁻¹ = ' + theoreticalStates + ' (the start city\u2019s bit is always set); ' +
      totalReached + ' of those states were actually reachable and filled in.' +
      (forced
        ? ' Forced end: <b>' + forced.endName + '</b> — dp[fullMask][' + forced.endName + '] = ' +
          (forced.val === Infinity ? 'unreachable' : forced.val.toFixed(1) + ' km (' + travelTimeStr(forced.val) + ')') + '.'
        : '') +
    '</p>' +
    '<table class="out-table"><thead><tr><th>Cities visited so far</th><th># states at this level</th>' +
      '<th>Best cost so far</th><th>Travel time</th><th>Flow</th></tr></thead><tbody>' +
    Array.from({ length: n }, (_, i) => i + 1).map(lvl =>
      '<tr><td>' + lvl + '</td><td>' + statesPerLevel[lvl] + '</td><td>' +
      (bestPerLevel[lvl] === Infinity ? '\u2014' : bestPerLevel[lvl].toFixed(1) + ' km') + '</td><td>' +
      (bestPerLevel[lvl] === Infinity ? '\u2014' : travelTimeStr(bestPerLevel[lvl])) + '</td><td>' +
      (bestPerLevel[lvl] === Infinity ? '\u2014' : '1') + '</td></tr>'
    ).join('') +
    '</tbody></table>' +
    (forced ? '' :
      '<p class="assign-note">The last row (all ' + n + ' cities visited) is exactly the table the ' +
      'TSP panel below reads from — it just adds one more edge, back to the start, to close the tour.</p>');
  container.appendChild(html);
}

function renderBitmaskEachTable(container, rows, ms) {
  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' + stat(ms.toFixed(2) + ' ms', 'Computed in (' + rows.length + ' runs)') + '</div>' +
    '<table class="out-table"><thead><tr><th>Start</th><th>States reached</th><th>Table capacity</th>' +
      '<th>Best full-mask cost</th><th>Travel time</th><th>Flow</th></tr></thead><tbody>' +
    rows.map(r => '<tr><td>' + CITIES[r.start].name + '</td><td>' + r.statesReached + '</td><td>' + r.theoretical +
      '</td><td>' + (r.best === Infinity ? '\u2014' : r.best.toFixed(1) + ' km') + '</td><td>' +
      (r.best === Infinity ? '\u2014' : travelTimeStr(r.best)) + '</td><td>' +
      (r.best === Infinity ? '\u2014' : '1') + '</td></tr>').join('') +
    '</tbody></table>';
  container.appendChild(html);
}

document.getElementById('bitmaskRun').addEventListener('click', () => {
  const out = document.getElementById('bitmaskOutput');
  out.innerHTML = '';
  if (selected.length < 2) return showMsg(out, 'Select at least 2 cities first.', true);
  if (selected.length > MAX_NODES) {
    return showMsg(out, 'Too many cities selected (' + selected.length + ') -- bitmask DP tops out at ' + MAX_NODES + ' here.', true);
  }

  if (bitmaskMode === 'all') {
    const order = selected.slice();
    const sub = buildSub(order);
    const t0 = performance.now();
    const stats = computeLevelStats(sub);
    const ms = performance.now() - t0;
    renderLevelTable(out, CITIES[order[0]].name, stats, ms);

  } else if (bitmaskMode === 'between') {
    const startG = Number(document.getElementById('bitmaskStart').value);
    const endG = Number(document.getElementById('bitmaskEnd').value);
    if (startG === endG) return showMsg(out, 'Start and end must be different cities.', true);
    const order = reorderWithStart(selected, startG);
    const endLocal = order.indexOf(endG);
    const sub = buildSub(order);
    const t0 = performance.now();
    const stats = computeLevelStats(sub);
    const ms = performance.now() - t0;
    renderLevelTable(out, CITIES[startG].name, stats, ms, {
      endName: CITIES[endG].name,
      val: stats.dp[stats.fullMask][endLocal]
    });

  } else { // each
    const t0 = performance.now();
    const rows = selected.map(startG => {
      const order = reorderWithStart(selected, startG);
      const sub = buildSub(order);
      const { dp, n, fullMask } = bitmaskDPTable(sub);
      let statesReached = 0, best = Infinity;
      for (let mask = 1; mask <= fullMask; mask++) {
        if (!(mask & 1)) continue;
        for (let j = 0; j < n; j++) {
          const v = dp[mask][j];
          if (v === Infinity) continue;
          statesReached++;
          if (mask === fullMask && v < best) best = v;
        }
      }
      return { start: startG, statesReached, best, theoretical: n * (1 << (n - 1)) };
    });
    const ms = performance.now() - t0;
    renderBitmaskEachTable(out, rows, ms);
  }
});

// ---------------------------------------------------------------
// DP panel: tabs + controls + run
// ---------------------------------------------------------------
let dpMode = 'all';
const dpTabs = document.getElementById('dpTabs');
const dpControls = document.getElementById('dpControls');
const dpOutput = document.getElementById('dpOutput');

dpTabs.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  dpMode = e.target.dataset.mode;
  [...dpTabs.children].forEach(b => b.classList.toggle('active', b === e.target));
  dpOutput.innerHTML = '';
  renderDPControls(dpMode);
});

function renderDPControls(mode) {
  if (mode === 'between') {
    dpControls.innerHTML =
      buildSelect('dpStart', 'Start city', false) +
      buildSelect('dpEnd', 'End city', false);
    if (selected.length >= 2) {
      document.getElementById('dpEnd').selectedIndex = 1;
    }
  } else {
    dpControls.innerHTML = '<p class="hint" style="margin:0;">Uses every selected city' +
      (mode === 'all' ? ' — the tour starts and ends at <b>' +
        (selected.length ? CITIES[selected[0]].name : '(first selected city)') + '</b>.' :
        ' as a candidate starting point, one at a time.') + '</p>';
  }
}

document.getElementById('dpRun').addEventListener('click', () => {
  dpOutput.innerHTML = '';
  if (selected.length < 2) {
    return showMsg(dpOutput, 'Select at least 2 cities first.', true);
  }
  if (selected.length > MAX_NODES) {
    return showMsg(dpOutput, 'Too many cities selected (' + selected.length + ') — bitmask DP tops out at ' + MAX_NODES + ' here.', true);
  }

  const t0 = performance.now();
  if (dpMode === 'all') {
    const order = selected.slice();
    const sub = buildSub(order);
    const r = closedTour(sub);
    const ms = performance.now() - t0;
    renderRoute(dpOutput, { cost: r.cost, route: r.path.map(li => order[li]), ms, closed: true });

  } else if (dpMode === 'each') {
    const rows = selected.map(startG => {
      const order = reorderWithStart(selected, startG);
      const sub = buildSub(order);
      const r = openPath(sub);
      return {
        start: order[0],
        end: order[r.path[r.path.length - 1]],
        cost: r.cost,
        route: r.path.map(li => order[li])
      };
    });
    const ms = performance.now() - t0;
    renderEachNodeTable(dpOutput, rows, ms);

  } else if (dpMode === 'between') {
    const startG = Number(document.getElementById('dpStart').value);
    const endG = Number(document.getElementById('dpEnd').value);
    if (startG === endG) return showMsg(dpOutput, 'Start and end must be different cities.', true);
    const order = reorderWithStart(selected, startG);
    const endLocal = order.indexOf(endG);
    const sub = buildSub(order);
    const r = openPath(sub, endLocal);
    const ms = performance.now() - t0;
    renderRoute(dpOutput, { cost: r.cost, route: r.path.map(li => order[li]), ms, closed: false });
  }
});

function renderRoute(container, { cost, route, ms, closed }) {
  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' +
      stat(route.length, 'Stops') +
      stat(cost.toFixed(1) + ' km', 'Cost (distance)') +
      stat(travelTimeStr(cost), 'Travel time @ ' + AVG_SPEED_KMH + ' km/h') +
      stat('1', 'Flow (single route)') +
      stat(ms.toFixed(2) + ' ms', 'Computed in') +
    '</div>' +
    '<ol class="route-list">' +
      route.map((g, i) => '<li><span class="idx">' + (i + 1) + '.</span> ' + CITIES[g].name +
        ' <span style="color:var(--ink-soft)">(' + CITIES[g].state + ')</span></li>').join('') +
      (closed ? '<li><span class="idx">↺</span> <span class="arrow">back to</span> ' + CITIES[route[0]].name + '</li>' : '') +
    '</ol>';
  container.appendChild(html);
}

function renderEachNodeTable(container, rows, ms) {
  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' + stat(ms.toFixed(2) + ' ms', 'Computed in (' + rows.length + ' runs)') + '</div>' +
    '<table class="out-table"><thead><tr><th>Start</th><th>Ends at</th><th>Cost</th><th>Travel time</th>' +
      '<th>Flow</th><th>Route</th></tr></thead><tbody>' +
    rows.map(r => '<tr><td>' + CITIES[r.start].name + '</td><td>' + CITIES[r.end].name + '</td><td>' +
      r.cost.toFixed(1) + ' km</td><td>' + travelTimeStr(r.cost) + '</td><td>1</td><td>' +
      r.route.map(g => CITIES[g].name).join(' → ') + '</td></tr>').join('') +
    '</tbody></table>';
  container.appendChild(html);
}

function stat(n, l) {
  return '<div class="stat"><span class="n">' + n + '</span><span class="l">' + l + '</span></div>';
}

function showMsg(container, text, isErr) {
  const p = document.createElement('p');
  p.className = isErr ? 'err' : 'msg';
  p.textContent = text;
  container.appendChild(p);
}

// ---------------------------------------------------------------
// Flow panel: tabs + controls + run
// ---------------------------------------------------------------
let flowMode = 'between';
const flowTabs = document.getElementById('flowTabs');
const flowControls = document.getElementById('flowControls');
const flowOutput = document.getElementById('flowOutput');

flowTabs.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  flowMode = e.target.dataset.mode;
  [...flowTabs.children].forEach(b => b.classList.toggle('active', b === e.target));
  flowOutput.innerHTML = '';
  renderFlowControls(flowMode);
});

function renderFlowControls(mode) {
  if (mode === 'between') {
    flowControls.innerHTML =
      buildSelect('flowSource', 'Source city', false) +
      buildSelect('flowSink', 'Sink city', false);
    if (selected.length >= 2) document.getElementById('flowSink').selectedIndex = 1;
  } else if (mode === 'all') {
    flowControls.innerHTML =
      buildSelect('flowDepot', 'Depot', false) +
      '<div class="field"><label for="flowVehicles">Vehicles</label>' +
      '<input type="number" id="flowVehicles" min="1" max="6" value="2"></div>';
  } else if (mode === 'each') {
    flowControls.innerHTML = buildSelect('flowDepotEach', 'Depot', false);
  }
}

document.getElementById('flowRun').addEventListener('click', () => {
  flowOutput.innerHTML = '';
  if (flowMode === 'between') {
    if (selected.length < 2) return showMsg(flowOutput, 'Select at least 2 cities first.', true);
    runFlowBetween();
  } else if (flowMode === 'all') {
    if (selected.length < 2) return showMsg(flowOutput, 'Select a depot plus at least 1 customer city.', true);
    runFlowAll();
  } else {
    if (selected.length < 2) return showMsg(flowOutput, 'Select a depot plus at least 1 customer city.', true);
    runFlowEach();
  }
});

// -- Between two chosen nodes: complete graph over all selected cities, cap 1 per directed edge --
function runFlowBetween() {
  const sourceG = Number(document.getElementById('flowSource').value);
  const sinkG = Number(document.getElementById('flowSink').value);
  if (sourceG === sinkG) return showMsg(flowOutput, 'Source and sink must be different cities.', true);

  const nodes = selected.slice(); // local index i -> nodes[i] global city
  const n = nodes.length;
  const mcmf = new MinCostMaxFlow(n);
  const edgeMeta = []; // {edgeId, u, v}
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const costUnits = Math.round(DIST[nodes[i]][nodes[j]] * 10);
      const eid = mcmf.addEdge(i, j, 1, costUnits);
      edgeMeta.push({ eid, u: i, v: j });
    }
  }
  const srcLocal = nodes.indexOf(sourceG);
  const sinkLocal = nodes.indexOf(sinkG);
  const t0 = performance.now();
  const res = mcmf.solve(srcLocal, sinkLocal);
  const ms = performance.now() - t0;

  const usedEdges = edgeMeta.filter(m => mcmf.flowOn(m.eid) > 0);

  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' +
      stat(res.maxFlow, 'Flow') +
      stat((res.minCost / 10).toFixed(1) + ' km', 'Cost (min total)') +
      stat(travelTimeStr(res.minCost / 10), 'Travel time @ ' + AVG_SPEED_KMH + ' km/h') +
      stat(ms.toFixed(2) + ' ms', 'Computed in') +
    '</div>' +
    '<p class="assign-note">Every pair of selected cities has a capacity-1 edge both ways, ' +
    'so each unit of flow from ' + CITIES[sourceG].name + ' to ' + CITIES[sinkG].name +
    ' must take a distinct route through the other selected cities.</p>' +
    '<table class="out-table"><thead><tr><th>Edge used</th><th>Flow</th><th>Cost</th><th>Travel time</th></tr></thead><tbody>' +
    (usedEdges.length
      ? usedEdges.map(m => '<tr><td>' + CITIES[nodes[m.u]].name + ' → ' + CITIES[nodes[m.v]].name +
          '</td><td>1</td><td>' + (DIST[nodes[m.u]][nodes[m.v]]).toFixed(1) + ' km</td><td>' +
          travelTimeStr(DIST[nodes[m.u]][nodes[m.v]]) + '</td></tr>').join('')
      : '<tr><td colspan="4">No flow could be routed — the two cities may not be connected at this selection size.</td></tr>') +
    '</tbody></table>';
  flowOutput.appendChild(html);
}

// -- All nodes: vehicle assignment, source -> vehicles -> cities -> sink, then bitmask DP per vehicle --
function runFlowAll() {
  const depotG = Number(document.getElementById('flowDepot').value);
  const k = Math.max(1, Number(document.getElementById('flowVehicles').value) || 1);
  const customers = selected.filter(g => g !== depotG);
  const m = customers.length;
  if (m === 0) return showMsg(flowOutput, 'Select at least one customer city besides the depot.', true);

  const capPerVehicle = Math.ceil(m / k);
  const source = 0, vehicleBase = 1, cityBase = vehicleBase + k, sink = cityBase + m;
  const mcmf = new MinCostMaxFlow(sink + 1);
  for (let v = 0; v < k; v++) mcmf.addEdge(source, vehicleBase + v, capPerVehicle, 0);
  const vehicleCityEdge = Array.from({ length: k }, () => new Array(m));
  for (let c = 0; c < m; c++) {
    const costUnits = Math.round(DIST[depotG][customers[c]] * 10);
    for (let v = 0; v < k; v++) {
      vehicleCityEdge[v][c] = mcmf.addEdge(vehicleBase + v, cityBase + c, 1, costUnits);
    }
    mcmf.addEdge(cityBase + c, sink, 1, 0);
  }
  const t0 = performance.now();
  const res = mcmf.solve(source, sink);
  const ms = performance.now() - t0;

  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' +
      stat(res.maxFlow + ' / ' + m, 'Flow (cities assigned)') +
      stat((res.minCost / 10).toFixed(1) + ' km', 'Cost (min assignment)') +
      stat(travelTimeStr(res.minCost / 10), 'Travel time @ ' + AVG_SPEED_KMH + ' km/h') +
      stat(ms.toFixed(2) + ' ms', 'Computed in') +
    '</div>';
  flowOutput.appendChild(html);

  for (let v = 0; v < k; v++) {
    const assigned = [];
    for (let c = 0; c < m; c++) {
      if (mcmf.flowOn(vehicleCityEdge[v][c]) > 0) assigned.push(customers[c]);
    }
    const block = document.createElement('div');
    block.className = 'veh-block';
    if (assigned.length === 0) {
      block.innerHTML = '<h3>Vehicle ' + (v + 1) + '</h3><p class="assign-note">Flow: 0 — no cities assigned.</p>';
      flowOutput.appendChild(block);
      continue;
    }
    let routeHtml;
    const order = [depotG, ...assigned];
    if (order.length <= MAX_NODES) {
      const sub = buildSub(order);
      const r = closedTour(sub);
      routeHtml = '<ol class="route-list">' +
        r.path.map((li, i) => '<li><span class="idx">' + (i + 1) + '.</span> ' + CITIES[order[li]].name + '</li>').join('') +
        '<li><span class="idx">↺</span> <span class="arrow">back to</span> ' + CITIES[order[0]].name + '</li>' +
        '</ol><p class="assign-note">Flow: ' + assigned.length + ' &nbsp;·&nbsp; Cost: ' + r.cost.toFixed(1) +
        ' km &nbsp;·&nbsp; Travel time: ' + travelTimeStr(r.cost) + '</p>';
    } else {
      routeHtml = '<p class="assign-note">Flow: ' + assigned.length + ' &nbsp;·&nbsp; ' +
        assigned.map(g => CITIES[g].name).join(', ') +
        ' (too many stops for this page\u2019s bitmask DP limit — assignment only)</p>';
    }
    block.innerHTML = '<h3>Vehicle ' + (v + 1) + '</h3>' + routeHtml;
    flowOutput.appendChild(block);
  }
}

// -- For each node: depot -> single customer, one at a time (the degenerate 1-flow case) --
function runFlowEach() {
  const depotG = Number(document.getElementById('flowDepotEach').value);
  const customers = selected.filter(g => g !== depotG);
  if (customers.length === 0) return showMsg(flowOutput, 'Select at least one customer city besides the depot.', true);

  const t0 = performance.now();
  const rows = customers.map(cityG => {
    const mcmf = new MinCostMaxFlow(4); // 0=source,1=vehicle,2=city,3=sink
    const costUnits = Math.round(DIST[depotG][cityG] * 10);
    mcmf.addEdge(0, 1, 1, 0);
    mcmf.addEdge(1, 2, 1, costUnits);
    mcmf.addEdge(2, 3, 1, 0);
    const res = mcmf.solve(0, 3);
    return { city: cityG, maxFlow: res.maxFlow, cost: res.minCost / 10 };
  });
  const ms = performance.now() - t0;

  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' + stat(ms.toFixed(2) + ' ms', 'Computed in (' + rows.length + ' runs)') + '</div>' +
    '<p class="assign-note">Each row solves its own tiny source→vehicle→city→sink network in isolation, ' +
    'so flow is always 1 / 1 — the min-cut is the single city→sink edge, capacity 1.</p>' +
    '<table class="out-table"><thead><tr><th>City</th><th>Flow</th><th>Cost</th><th>Travel time</th></tr></thead><tbody>' +
    rows.map(r => '<tr><td>' + CITIES[r.city].name + '</td><td>' + r.maxFlow + ' / 1</td><td>' +
      r.cost.toFixed(1) + ' km</td><td>' + travelTimeStr(r.cost) + '</td></tr>').join('') +
    '</tbody></table>';
  flowOutput.appendChild(html);
}

// ---------------------------------------------------------------
// Subset DP panel: Sum over Subsets + optimal partition into vehicles
// ---------------------------------------------------------------
const sosControls = document.getElementById('sosControls');
const sosOutput = document.getElementById('sosOutput');

function renderSOSControls() {
  sosControls.innerHTML =
    buildSelect('sosDepot', 'Depot', false) +
    '<div class="field"><label for="sosVehicles">Vehicles (k)</label>' +
    '<input type="number" id="sosVehicles" min="1" max="6" value="2"></div>';
}
renderSOSControls();

document.getElementById('sosRun').addEventListener('click', () => {
  sosOutput.innerHTML = '';
  if (selected.length < 2) return showMsg(sosOutput, 'Select a depot plus at least 1 customer city.', true);
  const depotG = Number(document.getElementById('sosDepot').value);
  const k = Math.max(1, Number(document.getElementById('sosVehicles').value) || 1);
  const customers = selected.filter(g => g !== depotG);
  const m = customers.length;
  if (m === 0) return showMsg(sosOutput, 'Select at least one customer city besides the depot.', true);
  if (k > m) return showMsg(sosOutput, 'More vehicles (' + k + ') than customer cities (' + m + ') — every vehicle needs at least one city.', true);

  // --- Step 1: Sum over Subsets -- total depot-distance for every possible customer subset ---
  const weights = customers.map(c => DIST[depotG][c]);
  const t0 = performance.now();
  const cost = sumOverSubsets(weights); // cost[mask] = sum of depot-distances of customers in mask
  const sosMs = performance.now() - t0;
  const size = 1 << m;

  // --- Step 2: DP over subsets -- best way to split customers into exactly k non-empty groups ---
  const INF = Infinity;
  const dp = Array.from({ length: k + 1 }, () => new Float64Array(size).fill(INF));
  const choice = Array.from({ length: k + 1 }, () => new Int32Array(size).fill(-1));
  dp[0][0] = 0;
  const t1 = performance.now();
  let statesExplored = 0;
  for (let t = 1; t <= k; t++) {
    for (let mask = 0; mask < size; mask++) {
      if (dp[t - 1] === undefined) continue;
      // try every non-empty submask s of `mask` as "the group vehicle t takes"
      for (let s = mask; s > 0; s = (s - 1) & mask) {
        statesExplored++;
        const prev = dp[t - 1][mask ^ s];
        if (prev === INF) continue;
        const cand = cost[s] + prev;
        if (cand < dp[t][mask]) { dp[t][mask] = cand; choice[t][mask] = s; }
      }
    }
  }
  const partitionMs = performance.now() - t1;

  const fullMask = size - 1;
  const optCost = dp[k][fullMask];
  if (optCost === INF) {
    return showMsg(sosOutput, 'No way to split ' + m + ' cities into exactly ' + k + ' non-empty groups.', true);
  }

  // Reconstruct the k groups from the choice table.
  const groups = [];
  let curMask = fullMask;
  for (let t = k; t >= 1; t--) {
    const s = choice[t][curMask];
    groups.push(s);
    curMask ^= s;
  }
  groups.reverse();

  const html = document.createElement('div');
  html.innerHTML =
    '<div class="result-summary">' +
      stat(size, 'Subsets summed (SOS)') +
      stat(sosMs.toFixed(2) + ' ms', 'SOS computed in') +
      stat(statesExplored, 'Submask states (partition DP)') +
      stat(partitionMs.toFixed(2) + ' ms', 'Partition DP in') +
    '</div>' +
    '<div class="result-summary">' +
      stat(k, 'Flow (vehicles)') +
      stat(optCost.toFixed(1) + ' km', 'Cost (optimal, exact)') +
      stat(travelTimeStr(optCost), 'Travel time @ ' + AVG_SPEED_KMH + ' km/h') +
    '</div>' +
    '<p class="assign-note">This is the exact minimum over <i>every</i> possible way to split these ' +
    m + ' cities into ' + k + ' non-empty groups — compare it to the Min-Cost Max-Flow panel\u2019s ' +
    'result for the same depot/vehicles: flow uses evenly-capped group sizes, so it can only match ' +
    'this number, never beat it.</p>';
  sosOutput.appendChild(html);

  groups.forEach((mask, vIdx) => {
    const assigned = [];
    for (let i = 0; i < m; i++) if (mask & (1 << i)) assigned.push(customers[i]);
    const block = document.createElement('div');
    block.className = 'veh-block';
    const order = [depotG, ...assigned];
    let routeHtml;
    if (order.length <= MAX_NODES) {
      const sub = buildSub(order);
      const r = closedTour(sub);
      routeHtml = '<ol class="route-list">' +
        r.path.map((li, i) => '<li><span class="idx">' + (i + 1) + '.</span> ' + CITIES[order[li]].name + '</li>').join('') +
        '<li><span class="idx">↺</span> <span class="arrow">back to</span> ' + CITIES[order[0]].name + '</li>' +
        '</ol><p class="assign-note">Flow: ' + assigned.length + ' &nbsp;·&nbsp; Group cost (sum of depot-distances): ' +
        cost[mask].toFixed(1) + ' km &nbsp;·&nbsp; Bitmask DP route: ' + r.cost.toFixed(1) + ' km (' + travelTimeStr(r.cost) + ')</p>';
    } else {
      routeHtml = '<p class="assign-note">Flow: ' + assigned.length + ' &nbsp;·&nbsp; ' +
        assigned.map(g => CITIES[g].name).join(', ') + '</p>';
    }
    block.innerHTML = '<h3>Vehicle ' + (vIdx + 1) + '</h3>' + routeHtml;
    sosOutput.appendChild(block);
  });
});

// ---------------------------------------------------------------
// Initial paint
// ---------------------------------------------------------------
updateSelectionUI();
