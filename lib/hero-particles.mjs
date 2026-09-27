// The image remains intact outside the cursor's small particle brush. Each
// awakened pixel has velocity and a spring pulling it back to its source.
export const motionQuery = '(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
export const particleRadius = 76;
export const cellSize = 3;

export function pointerPosition(event, bounds) {
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
}

export function stepParticle(p, pointer, milliseconds, time) {
    // Bounded timesteps keep springs stable after a slow frame.
    const dt = Math.min(milliseconds, 32) / 16.667;
    const spring = .018 + .008 * (1 + Math.sin(p.seed * 3));
    let fx = (p.homeX - p.x) * spring;
    let fy = (p.homeY - p.y) * spring;
    if (pointer) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < particleRadius) {
            const angle = distance > .01 ? Math.atan2(dy, dx) : p.seed;
            const force = (1 - distance / particleRadius) ** 2;
            // Radial repulsion plus a little curl: separate pixels, fluid motion.
            const curl = Math.sin(time * .0015 + p.seed) * 1.7 + 1.3;
            const push = 4.5 + Math.sin(p.seed * 2 + time * .001) * 2;
            fx += (Math.cos(angle) * push - Math.sin(angle) * curl) * force;
            fy += (Math.sin(angle) * push + Math.cos(angle) * curl) * force;
        }
    }
    const drag = Math.pow(.84, dt);
    p.vx = (p.vx + fx * dt) * drag;
    p.vy = (p.vy + fy * dt) * drag;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    const displacement = Math.hypot(p.x - p.homeX, p.y - p.homeY);
    const speed = Math.hypot(p.vx, p.vy);
    return displacement > .15 || speed > .05;
}

export function createRenderer(canvas, image) {
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return null;
    let bounds, colors, cols, rows;
    const pixels = new Map();
    const sample = document.createElement('canvas');
    const sampleContext = sample.getContext('2d', { willReadFrequently: true });
    if (!sampleContext) return null;
    return {
        resize(nextBounds) {
            pixels.clear();
            bounds = nextBounds;
            cols = Math.ceil(bounds.width / cellSize);
            rows = Math.ceil(bounds.height / cellSize);
            sample.width = cols;
            sample.height = rows;
            sampleContext.drawImage(image, 0, 0, cols, rows);
            colors = sampleContext.getImageData(0, 0, cols, rows).data;
        },
        reset() { pixels.clear(); },
        dispose() { pixels.clear(); colors = null; sample.width = sample.height = 0; },
        draw(pointer, time, milliseconds) {
            if (!colors) return false;
            if (pointer) {
                const left = Math.max(Math.floor(cols / 2), Math.floor((pointer.x - particleRadius) / cellSize));
                const right = Math.min(cols - 1, Math.ceil((pointer.x + particleRadius) / cellSize));
                const top = Math.max(0, Math.floor((pointer.y - particleRadius) / cellSize));
                const bottom = Math.min(rows - 1, Math.ceil((pointer.y + particleRadius) / cellSize));
                for (let row = top; row <= bottom; row++) {
                    for (let col = left; col <= right; col++) {
                        const id = row * cols + col;
                        if (pixels.has(id)) continue;
                        const x = (col + .5) * cellSize;
                        const y = (row + .5) * cellSize;
                        if (Math.hypot(x - pointer.x, y - pointer.y) >= particleRadius) continue;
                        const i = id * 4;
                        const r = colors[i], g = colors[i + 1], b = colors[i + 2];
                        // Don't turn the nearly black background into a cloud.
                        if (Math.max(r, g, b) < 45) continue;
                        pixels.set(id, {
                            homeX: x, homeY: y, x, y, vx: 0, vy: 0,
                            seed: (id * 2.399963) % (Math.PI * 2),
                            color: `rgb(${Math.min(255, r * 1.3)},${Math.min(255, g * 1.3)},${Math.min(255, b * 1.3)})`,
                        });
                    }
                }
            }
            ctx.setTransform(canvas.width / bounds.width, 0, 0, canvas.height / bounds.height, 0, 0);
            ctx.globalAlpha = 1;
            ctx.drawImage(image, 0, 0, bounds.width, bounds.height);
            ctx.fillStyle = '#010518';
            for (const [id, pixel] of pixels) {
                if (!stepParticle(pixel, pointer, milliseconds, time)) {
                    pixels.delete(id);
                    continue;
                }
                pixel.amount = Math.min(1, Math.hypot(pixel.x - pixel.homeX, pixel.y - pixel.homeY) / 7);
                // Remove each moving pixel from the original, not just an overlay
                // of confetti on top of an otherwise unchanged logo.
                ctx.globalAlpha = pixel.amount;
                ctx.fillRect(pixel.homeX - cellSize / 2, pixel.homeY - cellSize / 2, cellSize, cellSize);
            }
            for (const pixel of pixels.values()) {
                ctx.globalAlpha = pixel.amount;
                ctx.fillStyle = pixel.color;
                const size = 2 + .5 * Math.sin(pixel.seed);
                ctx.fillRect(pixel.x - size / 2, pixel.y - size / 2, size, size);
            }
            ctx.globalAlpha = 1;
            return pixels.size > 0;
        },
    };
}

export function initHero(art) {
    const media = window.matchMedia(motionQuery);
    let cleanup;
    const configure = () => {
        cleanup?.();
        cleanup = null;
        if (!media.matches) return;
        let cancelled = false, frame = 0, active = false, last = 0;
        let point, bounds, renderer, observer;
        const canvas = document.createElement('canvas');
        canvas.className = 'web3t-hero__particles';
        const hit = document.createElement('span');
        hit.className = 'web3t-hero__art-hit';
        const hide = () => {
            active = false;
            cancelAnimationFrame(frame);
            frame = 0;
            renderer?.reset();
            art.classList.remove('is-particles-active');
        };
        const tick = time => {
            frame = 0;
            const moving = renderer.draw(active ? point : null, time, Math.min(time - last || 16, 32));
            last = time;
            if (!active && !moving) { hide(); return; }
            art.classList.add('is-particles-active');
            frame = requestAnimationFrame(tick);
        };
        const move = event => {
            if (!renderer || cancelled || !media.matches) return;
            bounds = art.getBoundingClientRect();
            point = pointerPosition(event, bounds);
            active = true;
            if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
        };
        const leave = () => { active = false; };
        const visibility = () => { if (document.hidden) hide(); };
        hit.addEventListener('pointerenter', move);
        hit.addEventListener('pointermove', move);
        hit.addEventListener('pointerleave', leave);
        hit.addEventListener('pointercancel', leave);
        window.addEventListener('blur', hide);
        document.addEventListener('visibilitychange', visibility);
        const image = new Image();
        image.onload = () => {
            if (cancelled) return;
            try {
                renderer = createRenderer(canvas, image);
                if (!renderer) return;
                const resize = () => {
                    hide();
                    bounds = art.getBoundingClientRect();
                    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
                    canvas.width = Math.round(bounds.width * ratio);
                    canvas.height = Math.round(bounds.height * ratio);
                    renderer.resize(bounds);
                };
                resize();
                art.append(canvas, hit);
                observer = new ResizeObserver(resize);
                observer.observe(art);
            } catch {
                // The original background remains visible if canvas is blocked.
                renderer?.dispose();
                renderer = null;
                canvas.remove();
                hit.remove();
            }
        };
        image.src = '/assets/hero-bg.png';
        cleanup = () => {
            cancelled = true;
            hide();
            observer?.disconnect();
            renderer?.dispose();
            canvas.remove();
            hit.remove();
            window.removeEventListener('blur', hide);
            document.removeEventListener('visibilitychange', visibility);
        };
    };
    media.addEventListener('change', configure);
    configure();
    return () => { cleanup?.(); media.removeEventListener('change', configure); };
}

