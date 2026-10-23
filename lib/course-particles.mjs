import {
  cellSize,
  motionQuery,
  particleRadius,
  pointerPosition,
  stepParticle,
} from "./hero-particles.mjs";

export const courseArtworkSource = "/assets/hero-blockchain-cubes.png";

// Match the original CSS background: right top / cover, including its crop.
export function coverPlacement(imageWidth, imageHeight, width, height) {
  const scale = Math.max(width / imageWidth, height / imageHeight);
  return {
    x: width - imageWidth * scale,
    y: 0,
    width: imageWidth * scale,
    height: imageHeight * scale,
  };
}

export function coursePointer(event, bounds) {
  if (event.pointerType === "touch") return null;
  const point = pointerPosition(event, bounds);
  return point.x >= bounds.width * 0.45 &&
    point.x <= bounds.width &&
    point.y >= 0 &&
    point.y <= bounds.height
    ? point
    : null;
}

export function createCourseRenderer(canvas, image) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const sample = document.createElement("canvas");
  const sampling = sample.getContext("2d", { willReadFrequently: true });
  if (!sampling) return null;
  let width = 0,
    height = 0,
    cols = 0,
    rows = 0,
    colors,
    placement;
  const pixels = new Map();
  return {
    resize(w, h, ratio = 1) {
      pixels.clear();
      width = w;
      height = h;
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      placement = coverPlacement(image.naturalWidth, image.naturalHeight, w, h);
      cols = Math.ceil(w / cellSize);
      rows = Math.ceil(h / cellSize);
      sample.width = cols;
      sample.height = rows;
      sampling.drawImage(
        image,
        placement.x / cellSize,
        0,
        placement.width / cellSize,
        placement.height / cellSize,
      );
      colors = sampling.getImageData(0, 0, cols, rows).data;
    },
    reset() {
      pixels.clear();
    },
    draw(pointer, time, milliseconds) {
      if (!colors) return 0;
      if (pointer) {
        const left = Math.max(
          Math.ceil((width * 0.45) / cellSize),
          Math.floor((pointer.x - particleRadius) / cellSize),
        );
        const right = Math.min(
          cols - 1,
          Math.ceil((pointer.x + particleRadius) / cellSize),
        );
        const top = Math.max(
          0,
          Math.floor((pointer.y - particleRadius) / cellSize),
        );
        const bottom = Math.min(
          rows - 1,
          Math.ceil((pointer.y + particleRadius) / cellSize),
        );
        for (let row = top; row <= bottom; row++) {
          for (let col = left; col <= right; col++) {
            const id = row * cols + col;
            if (pixels.has(id)) continue;
            const x = (col + 0.5) * cellSize,
              y = (row + 0.5) * cellSize;
            if (Math.hypot(x - pointer.x, y - pointer.y) >= particleRadius)
              continue;
            const i = id * 4;
            const r = colors[i],
              g = colors[i + 1],
              b = colors[i + 2];
            if (Math.max(r, g, b) < 35 || colors[i + 3] < 20) continue;
            pixels.set(id, {
              homeX: x,
              homeY: y,
              x,
              y,
              vx: 0,
              vy: 0,
              seed: (id * 2.399963) % (Math.PI * 2),
              color: `rgb(${r},${g},${b})`,
            });
          }
        }
      }
      ctx.setTransform(
        canvas.width / width,
        0,
        0,
        canvas.height / height,
        0,
        0,
      );
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.drawImage(
        image,
        placement.x,
        placement.y,
        placement.width,
        placement.height,
      );
      ctx.fillStyle = "#000";
      for (const [id, pixel] of pixels) {
        if (!stepParticle(pixel, pointer, milliseconds, time)) {
          pixels.delete(id);
          continue;
        }
        pixel.amount = Math.min(
          1,
          Math.hypot(pixel.x - pixel.homeX, pixel.y - pixel.homeY) / 7,
        );
        ctx.globalAlpha = pixel.amount;
        ctx.fillRect(
          pixel.homeX - cellSize / 2,
          pixel.homeY - cellSize / 2,
          cellSize,
          cellSize,
        );
      }
      for (const pixel of pixels.values()) {
        ctx.globalAlpha = pixel.amount;
        ctx.fillStyle = pixel.color;
        ctx.fillRect(pixel.x - 1, pixel.y - 1, 2, 2);
      }
      ctx.globalAlpha = 1;
      return pixels.size;
    },
    dispose() {
      pixels.clear();
      colors = null;
      sample.width = sample.height = 0;
      canvas.width = canvas.height = 0;
    },
  };
}

export function initCourseArtwork(art) {
  const surface = art.parentElement;
  if (!surface) return () => {};
  const media = window.matchMedia(motionQuery);
  let cleanup;
  const configure = () => {
    cleanup?.();
    cleanup = null;
    if (!media.matches) return;
    let disposed = false,
      frame = 0,
      last = 0,
      pointer = null,
      renderer;
    const canvas = document.createElement("canvas");
    canvas.className = "web3t-course__particles";
    const image = new Image();
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      pointer = null;
      renderer?.reset();
      canvas.dataset.activePixels = "0";
      art.classList.remove("is-displacing");
    };
    const tick = (time) => {
      frame = 0;
      if (disposed || !renderer || document.hidden) {
        reset();
        return;
      }
      const active = renderer.draw(
        pointer,
        time,
        Math.min(time - last || 16, 32),
      );
      last = time;
      canvas.dataset.activePixels = String(active);
      art.classList.toggle("is-displacing", active > 0);
      if (active) frame = requestAnimationFrame(tick);
      else last = 0; // No idle animation loop: the cubes never drift.
    };
    const leave = () => {
      pointer = null;
    };
    const move = (event) => {
      if (!renderer || disposed || !media.matches) return;
      // Observe the parent without putting a hit layer over its content.
      if (
        event.target?.closest?.(
          "a,button,input,textarea,select,nav,[role=tablist]",
        )
      ) {
        leave();
        return;
      }
      pointer = coursePointer(event, art.getBoundingClientRect());
      if (pointer && !frame) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      reset();
      const bounds = art.getBoundingClientRect();
      if (bounds.width && bounds.height)
        renderer.resize(
          bounds.width,
          bounds.height,
          Math.min(window.devicePixelRatio || 1, 1.5),
        );
    };
    const observer = new ResizeObserver(resize);
    const intersection = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) reset();
    });
    const visibility = () => {
      if (document.hidden) reset();
    };
    image.onload = () => {
      if (disposed) return;
      try {
        renderer = createCourseRenderer(canvas, image);
        if (!renderer) return;
        resize();
        art.append(canvas);
        observer.observe(art);
        intersection.observe(art);
      } catch {
        reset();
        renderer?.dispose();
        renderer = null;
        canvas.remove();
      }
    };
    image.src = courseArtworkSource;
    surface.addEventListener("pointermove", move, { passive: true });
    surface.addEventListener("pointerleave", leave);
    surface.addEventListener("pointercancel", leave);
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    cleanup = () => {
      disposed = true;
      reset();
      image.onload = null;
      observer.disconnect();
      intersection.disconnect();
      renderer?.dispose();
      canvas.remove();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", leave);
      surface.removeEventListener("pointercancel", leave);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
    };
  };
  media.addEventListener("change", configure);
  configure();
  return () => {
    cleanup?.();
    media.removeEventListener("change", configure);
  };
}
