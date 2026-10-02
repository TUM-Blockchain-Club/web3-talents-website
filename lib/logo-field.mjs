import { pointerPosition, stepParticle } from "./hero-particles.mjs";

// Reuse the original blue/purple hero artwork, rather than the rainbow wordmark.
export const logoSource = "/assets/hero-bg.png";
export const symbolCrop = { x: 800, y: 20, width: 550, height: 760 };
export const driftQuery = "(prefers-reduced-motion: no-preference)";
export const hoverQuery = "(hover: hover) and (pointer: fine)";
export const logoTracks = [
  { phase: 0.06, row: 0.1, height: 115, speed: 48, opacity: 0.55 },
  { phase: 0.39, row: 0.12, height: 162, speed: 38, opacity: 0.75 },
  { phase: 0.77, row: 0.07, height: 129, speed: 54, opacity: 0.65 },
  { phase: 0.2, row: 0.42, height: 179, speed: 44, opacity: 0.78 },
  { phase: 0.56, row: 0.43, height: 120, speed: 62, opacity: 0.55 },
  { phase: 0.91, row: 0.38, height: 193, speed: 34, opacity: 0.85 },
  { phase: 0.03, row: 0.76, height: 157, speed: 40, opacity: 0.72 },
  { phase: 0.42, row: 0.78, height: 109, speed: 58, opacity: 0.5 },
  { phase: 0.75, row: 0.75, height: 154, speed: 46, opacity: 0.72 },
  { phase: 0.23, row: 0.05, height: 92, speed: 56, opacity: 0.5 },
  { phase: 0.58, row: 0.04, height: 104, speed: 42, opacity: 0.6 },
  { phase: 0.94, row: 0.08, height: 95, speed: 60, opacity: 0.52 },
  { phase: 0.04, row: 0.46, height: 112, speed: 52, opacity: 0.62 },
  { phase: 0.38, row: 0.43, height: 101, speed: 36, opacity: 0.56 },
  { phase: 0.73, row: 0.44, height: 126, speed: 50, opacity: 0.7 },
  { phase: 0.22, row: 0.85, height: 104, speed: 58, opacity: 0.58 },
  { phase: 0.59, row: 0.87, height: 123, speed: 44, opacity: 0.68 },
  { phase: 0.93, row: 0.84, height: 98, speed: 54, opacity: 0.55 },
  { phase: 0.13, row: 0.24, height: 126, speed: 46, opacity: 0.58 },
  { phase: 0.46, row: 0.26, height: 154, speed: 54, opacity: 0.68 },
  { phase: 0.83, row: 0.22, height: 112, speed: 40, opacity: 0.55 },
  { phase: 0.11, row: 0.62, height: 162, speed: 38, opacity: 0.7 },
  { phase: 0.48, row: 0.64, height: 104, speed: 60, opacity: 0.52 },
  { phase: 0.85, row: 0.6, height: 129, speed: 48, opacity: 0.62 },
  { phase: 0.31, row: 0.94, height: 115, speed: 52, opacity: 0.56 },
  { phase: 0.65, row: 0.96, height: 157, speed: 42, opacity: 0.66 },
  { phase: 0.98, row: 0.93, height: 109, speed: 56, opacity: 0.54 },
];
export const hoverRadius = 34;
const cell = 2.5;
const padding = 48;

// Composite away the dark photographic background without changing logo colors.
// This happens once per sprite size, never in the animation loop.
export function artworkAlpha(r, g, b) {
  return Math.max(0, Math.min(1, (Math.max(r, g, b) - 32) / 48));
}

export function logoPosition(track, width, height, elapsed) {
  const size = track.height * (width < 600 ? 0.65 : 1);
  const w = (size * symbolCrop.width) / symbolCrop.height;
  const travel = width + w + padding * 2;
  const distance = track.phase * travel + elapsed * track.speed;
  return {
    x: (distance % travel) - w - padding,
    y: track.row * Math.max(0, height - size),
    width: w,
    height: size,
    lap: Math.floor(distance / travel),
  };
}

export function localPointer(pointer, position) {
  if (!pointer) return null;
  const x = pointer.x - position.x,
    y = pointer.y - position.y;
  return x >= -hoverRadius &&
    x <= position.width + hoverRadius &&
    y >= -hoverRadius &&
    y <= position.height + hoverRadius
    ? { x, y }
    : null;
}

function makeSprite(image, position) {
  const tile = document.createElement("canvas");
  tile.width = Math.ceil(position.width);
  tile.height = Math.ceil(position.height);
  const ctx = tile.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(
    image,
    symbolCrop.x,
    symbolCrop.y,
    symbolCrop.width,
    symbolCrop.height,
    0,
    0,
    tile.width,
    tile.height,
  );
  const samples = [];
  const imageData = ctx.getImageData(0, 0, tile.width, tile.height);
  const colors = imageData.data;
  for (let i = 0; i < colors.length; i += 4) {
    colors[i + 3] = Math.round(
      colors[i + 3] * artworkAlpha(colors[i], colors[i + 1], colors[i + 2]),
    );
  }
  ctx.putImageData(imageData, 0, 0);
  for (let y = cell / 2; y < tile.height; y += cell) {
    for (let x = cell / 2; x < tile.width; x += cell) {
      const i = (Math.floor(y) * tile.width + Math.floor(x)) * 4;
      if (colors[i + 3] < 20) continue;
      samples.push({
        homeX: x,
        homeY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        seed: (i * 2.399963) % (Math.PI * 2),
        color: `rgba(${colors[i]},${colors[i + 1]},${colors[i + 2]},${colors[i + 3] / 255})`,
      });
    }
  }
  const patch = document.createElement("canvas");
  patch.width = tile.width + padding * 2;
  patch.height = tile.height + padding * 2;
  const patchContext = patch.getContext("2d");
  if (!patchContext) throw new Error("Canvas unavailable");
  return {
    tile,
    samples,
    pixels: new Map(),
    patch,
    patchContext,
    lap: position.lap,
  };
}

export function createLogoFieldRenderer(canvas, image) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let width = 0,
    height = 0,
    sprites = [];
  return {
    resize(w, h, ratio) {
      width = w;
      height = h;
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      sprites = logoTracks.map((track) =>
        makeSprite(image, logoPosition(track, w, h, 0)),
      );
    },
    draw(elapsed, pointer, milliseconds) {
      ctx.setTransform(
        canvas.width / width,
        0,
        0,
        canvas.height / height,
        0,
        0,
      );
      ctx.clearRect(0, 0, width, height);
      let activePixels = 0;
      sprites.forEach((sprite, index) => {
        const track = logoTracks[index];
        const position = logoPosition(track, width, height, elapsed);
        if (position.lap !== sprite.lap) sprite.pixels.clear();
        sprite.lap = position.lap;
        const local = localPointer(pointer, position);
        if (local)
          sprite.samples.forEach((sample, id) => {
            if (
              !sprite.pixels.has(id) &&
              Math.hypot(sample.x - local.x, sample.y - local.y) < hoverRadius
            ) {
              sprite.pixels.set(id, { ...sample });
            }
          });
        const patch = sprite.patchContext;
        if (sprite.pixels.size) {
          patch.clearRect(0, 0, sprite.patch.width, sprite.patch.height);
          patch.drawImage(sprite.tile, padding, padding);
          for (const [id, pixel] of sprite.pixels) {
            if (
              !stepParticle(
                pixel,
                local,
                milliseconds,
                elapsed * 1000,
                hoverRadius,
              )
            ) {
              sprite.pixels.delete(id);
              continue;
            }
            // Remove the source pixels, then draw them at their displaced positions.
            patch.clearRect(
              padding + pixel.homeX - cell / 2,
              padding + pixel.homeY - cell / 2,
              cell,
              cell,
            );
          }
          for (const pixel of sprite.pixels.values()) {
            patch.fillStyle = pixel.color;
            patch.fillRect(padding + pixel.x - 1, padding + pixel.y - 1, 2, 2);
          }
        }
        ctx.globalAlpha = track.opacity;
        if (sprite.pixels.size)
          ctx.drawImage(
            sprite.patch,
            position.x - padding,
            position.y - padding,
          );
        else ctx.drawImage(sprite.tile, position.x, position.y);
        activePixels += sprite.pixels.size;
      });
      ctx.globalAlpha = 1;
      return activePixels;
    },
    dispose() {
      sprites = [];
      canvas.width = canvas.height = 0;
    },
  };
}

export function initLogoField(art, onReady = () => {}) {
  const motion = matchMedia(driftQuery),
    hover = matchMedia(hoverQuery);
  const canvas = document.createElement("canvas");
  canvas.className = "web3t-hero__logo-canvas";
  const image = new Image();
  let disposed = false,
    renderer,
    frame = 0,
    last = 0,
    elapsed = 0,
    pointer = null;
  let visible = true,
    paused = false;
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    pointer = null;
  };
  const draw = (time) => {
    frame = 0;
    const dt = last ? Math.min(time - last, 32) : 0;
    last = time;
    if (!paused && motion.matches) elapsed += dt / 1000;
    const active = renderer.draw(
      elapsed,
      motion.matches ? pointer : null,
      dt || 16,
    );
    canvas.dataset.activePixels = String(active);
    if (
      !document.hidden &&
      visible &&
      motion.matches &&
      (!paused || pointer || active)
    )
      frame = requestAnimationFrame(draw);
  };
  const start = () => {
    if (renderer && !disposed && !document.hidden && visible && !frame)
      frame = requestAnimationFrame(draw);
  };
  const resize = () => {
    if (!renderer) return;
    stop();
    const bounds = art.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.resize(
      bounds.width,
      bounds.height,
      Math.min(devicePixelRatio || 1, 1.5),
    );
    start();
  };
  const move = (event) => {
    if (!hover.matches || !motion.matches || event.pointerType === "touch")
      return;
    pointer = pointerPosition(event, art.getBoundingClientRect());
    start();
  };
  const leave = () => {
    pointer = null;
  };
  const visibility = () => {
    if (document.hidden) stop();
    else start();
  };
  const preference = () => {
    stop();
    start();
  };
  const resizeObserver = new ResizeObserver(resize);
  const intersection = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) start();
    else stop();
  });
  image.onload = () => {
    if (disposed) return;
    try {
      renderer = createLogoFieldRenderer(canvas, image);
      if (!renderer) return;
      resize();
      art.append(canvas);
      art.classList.add("is-ready");
      resizeObserver.observe(art);
      intersection.observe(art);
      onReady();
    } catch {
      stop();
      renderer?.dispose();
      renderer = null;
      art.classList.remove("is-ready");
      canvas.remove();
    }
  };
  image.src = logoSource;
  art.addEventListener("pointermove", move);
  art.addEventListener("pointerleave", leave);
  art.addEventListener("pointercancel", leave);
  window.addEventListener("scroll", leave, { passive: true });
  window.addEventListener("blur", leave);
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", preference);
  hover.addEventListener("change", leave);
  const dispose = () => {
    disposed = true;
    stop();
    image.onload = null;
    resizeObserver.disconnect();
    intersection.disconnect();
    renderer?.dispose();
    art.classList.remove("is-ready");
    canvas.remove();
    art.removeEventListener("pointermove", move);
    art.removeEventListener("pointerleave", leave);
    art.removeEventListener("pointercancel", leave);
    window.removeEventListener("scroll", leave);
    window.removeEventListener("blur", leave);
    document.removeEventListener("visibilitychange", visibility);
    motion.removeEventListener("change", preference);
    hover.removeEventListener("change", leave);
  };
  return {
    dispose,
    setPaused(value) {
      paused = value;
      start();
    },
  };
}
