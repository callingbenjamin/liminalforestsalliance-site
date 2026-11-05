// Locator globe — a small dot-matrix Earth on <canvas> that turns to the
// listing being previewed. Spikes mark every listing (height ∝ √area); the
// active one is drawn larger. It never moves on its own: it only turns when
// the visitor points at, or opens, a listing.
import land from '../data/land.json';

const D2R = Math.PI / 180;
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const wrapPi = (a) => Math.atan2(Math.sin(a), Math.cos(a));

function decodeLand({ rows }) {
  const pts = [];
  for (const [lat, count, hex] of rows) {
    const phi = lat * D2R;
    const cl = Math.cos(phi);
    const sl = Math.sin(phi);
    for (let i = 0; i < count; i++) {
      const nib = parseInt(hex[i >> 2], 16);
      if (!((nib >> (3 - (i & 3))) & 1)) continue;
      const lam = (-180 + ((i + 0.5) * 360) / count) * D2R;
      pts.push(cl * Math.sin(lam), sl, cl * Math.cos(lam));
    }
  }
  return new Float32Array(pts);
}

const unit = (lat, lng) => {
  const p = lat * D2R;
  const l = lng * D2R;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
};

export class Globe {
  constructor(canvas, { markers, colors }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dots = decodeLand(land);
    this.colors = colors;
    const maxHa = Math.max(...markers.map((m) => m.ha));
    this.markers = markers.map((m, i) => ({ ...m, i, v: unit(m.lat, m.lng), h: 0.06 + 0.22 * Math.sqrt(m.ha / maxHa), dim: 0 }));
    this.rotY = 80 * D2R;
    this.rotX = 6 * D2R;
    this.target = null;
    this.active = -1;
    this.filter = () => true;
    this.dirty = true;
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = r.width;
    this.h = r.height;
    this.canvas.width = Math.max(1, Math.round(r.width * this.dpr));
    this.canvas.height = Math.max(1, Math.round(r.height * this.dpr));
    this.R = Math.min(this.w, this.h) * 0.4;
    this.dirty = true;
  }

  /** Turn to a listing. `instant` skips the animation (reduced motion). */
  flyTo(index, instant = false) {
    const m = this.markers[index];
    if (!m) return;
    this.active = index;
    this.target = { y: -m.lng * D2R, x: clamp(m.lat * D2R * 0.8, -1, 1) };
    if (instant) {
      this.rotY = this.target.y;
      this.rotX = this.target.x;
    }
    this.dirty = true;
  }

  setFilter(fn) {
    this.filter = fn;
    this.dirty = true;
  }

  project(v, out) {
    const cy = Math.cos(this.rotY), sy = Math.sin(this.rotY);
    const cx = Math.cos(this.rotX), sx = Math.sin(this.rotX);
    const x1 = v[0] * cy + v[2] * sy;
    const z1 = -v[0] * sy + v[2] * cy;
    out[0] = x1;
    out[1] = v[1] * cx - z1 * sx;
    out[2] = v[1] * sx + z1 * cx;
    return out;
  }

  /** Draw one frame. Returns false when nothing is moving (caller may idle). */
  render(dt) {
    if (!this.w) return false;
    const k = Math.min(dt, 50) / 16.67;
    let moving = false;
    if (this.target) {
      const dy = wrapPi(this.target.y - this.rotY);
      const dx = this.target.x - this.rotX;
      if (Math.abs(dy) + Math.abs(dx) > 0.0008) {
        this.rotY += dy * 0.08 * k;
        this.rotX += dx * 0.08 * k;
        moving = true;
      }
    }
    for (const m of this.markers) {
      const want = this.filter(m) ? 0 : 1;
      if (Math.abs(want - m.dim) > 0.01) {
        m.dim += (want - m.dim) * 0.15 * k;
        moving = true;
      }
    }
    if (!moving && !this.dirty) return false;
    this.dirty = false;

    const { ctx: c, w: W, h: H, R } = this;
    const CX = W / 2, CY = H / 2;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.clearRect(0, 0, W, H);

    c.fillStyle = '#0e1411';
    c.beginPath();
    c.arc(CX, CY, R, 0, TAU);
    c.fill();

    const d = this.dots;
    const tmp = [0, 0, 0];
    const buckets = [[], [], [], []];
    for (let i = 0; i < d.length; i += 3) {
      tmp[0] = d[i];
      tmp[1] = d[i + 1];
      tmp[2] = d[i + 2];
      this.project(tmp, tmp);
      if (tmp[2] <= 0.04) continue;
      buckets[Math.min(3, Math.floor(tmp[2] * 4))].push(CX + tmp[0] * R, CY - tmp[1] * R);
    }
    const s = Math.max(0.6, R / 140);
    for (let b = 0; b < 4; b++) {
      c.fillStyle = `rgba(242,237,227,${0.16 + b * 0.16})`;
      c.beginPath();
      const arr = buckets[b];
      for (let i = 0; i < arr.length; i += 2) c.rect(arr[i] - s / 2, arr[i + 1] - s / 2, s, s);
      c.fill();
    }

    const P = this.markers.map((m) => ({ m, b: this.project(m.v, [0, 0, 0]) })).sort((a, b) => a.b[2] - b.b[2]);
    for (const { m, b } of P) {
      if (b[2] < 0) continue;
      const isActive = m.i === this.active;
      const h = m.h * (isActive ? 1.3 : 1);
      const tip = this.project([m.v[0] * (1 + h), m.v[1] * (1 + h), m.v[2] * (1 + h)], [0, 0, 0]);
      const bx = CX + b[0] * R, by = CY - b[1] * R;
      const tx = CX + tip[0] * R, ty = CY - tip[1] * R;
      c.globalAlpha = clamp(b[2] * 3, 0, 1) * (1 - m.dim * 0.85) * (isActive ? 1 : 0.75);
      c.strokeStyle = this.colors[m.kind];
      c.lineWidth = isActive ? 2 : 1.2;
      c.beginPath();
      c.moveTo(bx, by);
      c.lineTo(tx, ty);
      c.stroke();
      c.fillStyle = this.colors[m.kind];
      c.beginPath();
      c.arc(tx, ty, isActive ? 3 : 1.6, 0, TAU);
      c.fill();
      if (isActive) {
        c.strokeStyle = '#f2ede3';
        c.lineWidth = 1;
        c.beginPath();
        c.arc(tx, ty, 6, 0, TAU);
        c.stroke();
      }
    }
    c.globalAlpha = 1;
    return true;
  }
}
